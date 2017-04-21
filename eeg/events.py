# socket events
from flask_socketio import SocketIO, emit, disconnect
import os
import signal
# from subprocess import Popen, PIPE
import datetime
import sys
from .app import socketio
# from eeg.middleware.util import background_listener

# Extra imports
from eeg.middleware.util import initialize_LSL
import time
import numpy as np
from random import randint

namespace = '/eeg'

@socketio.on('test:server', namespace=namespace)
def test_conn(message):
    emit('test:ui', 'received message: ' + message)

@socketio.on('script:init', namespace=namespace)
def init_script(a):
    # print(a)

    global emotions, inlet1, mood_stream, inlet2, Raw, inlet3, Theta, inlet4, PSD

    emotions = []
    for i in range(0,15):
        emotions.append(0)

    # Comment out below line to test with random data
    # inlet1, PSD, inlet2, Theta, inlet3, mood_stream, inlet4, Raw = initialize_LSL()
    # inlet1, PSD, inlet2, Theta, inlet3, mood_stream = initialize_LSL()

    print("LSL initialized")
    socketio.emit('script:done', {'status':'start'}, namespace=namespace)

@socketio.on('script:run-test', namespace=namespace)
def run_testscript(a):
    # print(a)
    Raw = []
    psd = []
    PSD = []

    fullbuff = np.random.uniform(-1, 1, (8, 1920))  # create random full buffer
    fullsum = np.sum(fullbuff, axis=0) / 8 + 1  # collapse buffer channels to 1/ Take average and add 1 tell Heath
    fullpsd = np.random.uniform(0, .5, 257)  # each channel psd could be one band
    Rnum = randint(0,2)    # Random Output
    for m in fullsum:
        Raw.append(m)
    for n in fullpsd:
        psd.append(n)

    # Generate PSD Data
    j = 12
    k = 232
    PSD = [0 for i in range(j)] + psd[j:k] + [0 for i in range(257-k)]

    # Generate Theta Band Data
    j = 16
    k = 40
    Theta = [0 for i in range(j)] + psd[j:k] + [0 for i in range(257-k)]

    # Generate formatted Output Data
    del emotions[0]
    emotions.append(Rnum)

    print('Run Test Script!')
    print("emotions:" + str(emotions))
    print("Raw Sum:" + str(len(Raw)))
    print("PSD Sum:" + str(len(psd)))
    print("Theta Sum:" + str(len(Theta)))

    # Send Data to webserver
    socketio.emit(
    'script:done',
    {
        'status': 'run',
        'data' : emotions,
        'raw' : Raw,
        'theta' : Theta,
        'psd' : PSD
    },
    namespace=namespace
    )
    time.sleep(1)

@socketio.on('script:run-live', namespace=namespace)
def run_livescript(a):
    # print(a)
    # Get new sample
    PSD, timestamp1 = inlet1.pull_sample()
    Theta, timestamp2 = inlet2.pull_sample()
    mood_stream, timestamp3 = inlet3.pull_sample()
    # Raw, timestamp4 = inlet4.pull_sample()

    # Generate Raw Signal
    fullbuff = np.random.uniform(-1, 1, (8, 1920))  # create random full buffer
    fullsum = np.sum(fullbuff, axis=0) / 8 + 1  # collapse buffer channels to 1/ Take average and add 1 tell Heath
    for m in fullsum:
        Raw.append(m)


    del emotions[0]

    # Reformat emotions Stressed = 0, Neutral = 1, Calm = 2
    if(mood_stream[0] == 1): # Stressed
        emotions.append(0)
    elif(mood_stream[0] == 0): # Neutral
        emotions.append(1)
    else:
        emotions.append(int(mood_stream[0]))

    print('Run Live Script!')
    print("emotions:" + str(emotions))
    print("length:" + str(len(emotions)))
    # print("Theta:" + str(len(Theta))) # 257 x 1 - [-1, 1]
    # print("Raw:" + str(len(Raw)))    # 1920 x 1

    socketio.emit(
    'script:done',
    {
        'status': 'run',
        'data' : emotions,
        'raw' : Raw,
        'theta' : Theta,
        'psd' : PSD
    },
    namespace=namespace
    )
    time.sleep(0.5)
