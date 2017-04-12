# socket events
from flask_socketio import SocketIO, emit, disconnect
import os
import signal
from subprocess import Popen, PIPE
import datetime
import sys
from .app import socketio
from eeg.middleware.util import background_listener

# Extra imports
from eeg.middleware.util import initialize_LSL
import time
import numpy as np
from random import randint

namespace = '/eeg'
# eeg_path = './pyscripts/test.py'
#eeg_path = './pyscripts/main.py'
#eeg_path = './pyscripts/LSL_test.py'


@socketio.on('test:server', namespace=namespace)
def test_conn(message):
    emit('test:ui', 'received message: ' + message)

@socketio.on('script:run', namespace=namespace)
def run_script(a):
    print(a)

    # p = Popen(
    #     ['python', eeg_path],
    #     stdout=PIPE,
    #     stderr=PIPE,
    #     bufsize=-1,
    #     universal_newlines=True
    # )
    # socketio.start_background_task(
    #     target=background_listener,
    #     socketio=socketio,
    #     process=p,
    #     namespace=namespace
    # )

    # inlet1, mood_stream, inlet2, Raw, inlet3, Theta = initialize_LSL()
    emotions = []
    Raw = []
    Theta = []

    for i in range(0,15):
        emotions.append(0)

    print("LSL initialized")

    fullbuff = np.random.uniform(-1, 1, (8, 1920))  # create random full buffer
    fullsum = np.sum(fullbuff, axis=0) / 8 + 1  # collapse buffer channels to 1/ Take average and add 1 tell Heath
    psdTheta = np.random.uniform(0, 1, 257)  # each channel psd could be one band
    emotions[len(emotions) - 1] = randint(0,2)

    for m in fullsum:
        Raw.append(m)

    for n in psdTheta:
        Theta.append(n)

    print("emotions:" + str(emotions))
    # print("Full Sum:" + str(Raw))
    #print("Theta Sum:" + str(Theta))
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

    # while True:
    #     # Rnum = randint(0,2)
    #     # print("emotion:" + str(Rnum))
    #
    #     del emotions[0]
    #     # emotions.append(mood_stream[0])
    #     # emotions.append(Rnum)
    #     print("emotions:" + str(emotions))
    #     print("length:" + str(len(emotions)))
    #     print("Theta:" + str(Theta)) # 257 x 1 - [-1, 1]
    #     print("Raw:" + str(Raw))    # 1920 x 1
    #
    #     # socketio.emit(
    #     # 'script:done',
    #     # {
    #     #     'status': 'mood-done',
    #     #     'data' : emotions
    #     # },
    #     # namespace=namespace
    #     # )
    #     time.sleep(1)
    #     # print("json:" + str(json))
    #     # json.clear()
    #
    #     # Get new sample
    #     mood_stream, timestamp1 = inlet1.pull_sample()
    #     Raw, timestamp2 = inlet2.pull_sample()
    #     Theta, timestamp3 = inlet3.pull_sample()
