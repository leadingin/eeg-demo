def serialize_datasets(entries):
    results = [ ]

    for entry in entries:
        results.append({
            'id': entry['id'],
            'output': entry['output'],
            'emotion': entry['emotion'],
            'timestamp': entry['timestamp']
        })

    return { 'results': results }

def background_listener(socketio, process, namespace):
    while process.poll() is None:
        output = process.stdout.readline().strip()
        print('output: ' + output)
        if 'done writing copy' in output:
            socketio.emit('script:done', {'status': 'done'}, namespace=namespace)

        process.poll()
        r = process.returncode
        if (r is not None) and (r != 0):
            print('r:', r)
            err = process.stderr.readlines()
            for e in err:
                print('error:', e.strip())
            return

    #Read leftovers
    output = process.stdout.read().strip()
    #print('leftover output: ' + output)
