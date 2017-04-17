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
# eeg_path = './pyscripts/test.py'

# emotions = []
# Raw = []
# Theta = []

@socketio.on('test:server', namespace=namespace)
def test_conn(message):
    emit('test:ui', 'received message: ' + message)

@socketio.on('script:init', namespace=namespace)
def init_script(a):
    # print(a)

    global emotions, inlet1, mood_stream, inlet2, Raw, inlet3, Theta

    emotions = []
    for i in range(0,15):
        emotions.append(0)

    # inlet1, mood_stream, inlet2, Raw, inlet3, Theta = initialize_LSL()
    print("LSL initialized")
    socketio.emit('script:done', {'status':'start'}, namespace=namespace)

# Get Ethernet Cable to test
@socketio.on('script:run-test', namespace=namespace)
def run_testscript(a):
    # print(a)

    print('Run Test Script!')
    # emotions = []
    Raw = []
    Theta = []

    # for i in range(0,15):
    #     emotions.append(0)

    fullbuff = np.random.uniform(-1, 1, (8, 1920))  # create random full buffer
    fullsum = np.sum(fullbuff, axis=0) / 8 + 1  # collapse buffer channels to 1/ Take average and add 1 tell Heath
    psdTheta = np.random.uniform(0, 1, 257)  # each channel psd could be one band
    # emotions[len(emotions) - 1] = randint(0,2)
    Rnum = randint(0,2)
    del emotions[0]
    emotions.append(Rnum)

    for m in fullsum:
        Raw.append(m)

    for n in psdTheta:
        Theta.append(n)

    print("emotions:" + str(emotions))
    # print("Full Sum:" + str(Raw))
    # print("Theta Sum:" + str(Theta))
    socketio.emit(
    'script:done',
    {
        'status': 'run',
        'data' : emotions,
        'raw' : Raw,
        'theta' : Theta
    },
    namespace=namespace
    )
    time.sleep(1)

@socketio.on('script:run-live', namespace=namespace)
def run_livescript(a):
    # print(a)

    # Get new sample
    mood_stream, timestamp1 = inlet1.pull_sample()
    Raw, timestamp2 = inlet2.pull_sample()
    Theta, timestamp3 = inlet3.pull_sample()

    del emotions[0]
    # Reformat emotions Stressed = 0, Neutral = 1, Calm = 2
    # if(mood_stream[0] == 1)
    #     emotions.append(mood_stream[0])
    emotions.append(mood_stream[0])
    print("emotions:" + str(emotions))
    print("length:" + str(len(emotions)))
    # print("Theta:" + str(Theta)) # 257 x 1 - [-1, 1]
    # print("Raw:" + str(Raw))    # 1920 x 1

    socketio.emit(
    'script:done',
    {
        'status': 'mood-done',
        'data' : emotions,
        'raw' : Raw,
        'theta' : Theta
    },
    namespace=namespace
    )
    time.sleep(1)
