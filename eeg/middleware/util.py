from pylsl import StreamInlet, resolve_stream
import numpy as np

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
            testCopy(socketio, namespace)

        if 'done writing buffer' in output:
            buffy = []

            with open('data/buffer.json') as buff:
                data = buff.read()
                buffy = data.split(" ")

            del buffy[-1]

            socketio.emit(
            'script:done',
            {
                'status': 'buffer-done',
                'data' : buffy
            },
            namespace=namespace
            )

        # if 'done writing psd' in output:
        #     psdy = []
        #
        #     with open('data/psd.json') as psd:
        #         data = psd.read()
        #         psdy = data.split(" ")
        #
        #     del psdy[-1]
        #
        #     socketio.emit(
        #     'script:done',
        #     {
        #         'status': 'psd-done',
        #         'data-psdy' : psdy
        #     },
        #     namespace=namespace
        #     )

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

def testCopy(socketio, namespace):
    uff1 = { "blah": [1,2,3,4]}
    buff2 = [1,2,3,4]
    buff3 = []
    buff4 = []
    with open('eeg/static/data/buffer_r.json') as buff:
        data = buff.read()
        print('Data Received:' + data[0:10])
        #numbers = data.split(" ")
        buff3 = data.split(" ")
        #print('Numbers:' + str(number))
        # for line in data:
        #     #print('line = ' + line)
        #     number = line.split(" ")
        #     print('n:' + str(number))
        #     #buff3.extend(float(n))
    del buff3[-1] # Remove last element from array - " "

    with open('data/buffer.json') as buff:
        data = buff.read()
        buff4 = data.split(" ")

    del buff4[-1]
    #buff3 = float(buff3)
    #print('buff3:' + str(buff3))

    socketio.emit(
    'script:done',
    {
        'status': 'done',
        'data' : buff3,
        'data1': buff4
    },
    namespace=namespace
    )

def initialize_LSL():
    """ Initialize the LSL stream
    buff is initialized as the first grab off of the LSL strea, this is n 8x1 array """
    # first resolve an EEG stream on the lab network
    print("looking for an EEG stream...")
    streams = resolve_stream('type', 'Output')
    # create a new inlet to read from the stream
    inlet = StreamInlet(streams[0])

    buff, timestamp =inlet.pull_sample()
    return inlet, buff
