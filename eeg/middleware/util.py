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

def initialize_LSL():
    """ Initialize the LSL stream
    buff is initialized as the first grab off of the LSL strea, this is n 8x1 array """
    # first resolve an EEG stream on the lab network
    print("looking for an EEG stream...")

    streams1 = resolve_stream('type', 'Output')
    print("Found Ouput...")

    streams2 = resolve_stream('type', 'Raw')
    print("Found Raw...")

    streams3 = resolve_stream('type', 'ThetaPSD')
    print("Found Theta...")



    # create a new inlet to read from the stream
    inlet1 = StreamInlet(streams1[0])
    print("Create inlet1...")

    inlet2 = StreamInlet(streams2[0])
    print("Create inlet2...")

    inlet3 = StreamInlet(streams3[0])
    print("Create inlet3...")



    buff1, timestamp1 = inlet1.pull_sample()
    print("Create buff1...")

    buff2, timestamp2 = inlet2.pull_sample()
    print("Create buff2...")

    buff3, timestamp3 = inlet3.pull_sample()
    print("Create buff3...")


    return inlet1, buff1, inlet2, buff2, inlet3, buff3
    # return inlet1, buff1
