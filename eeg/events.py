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

    # inlet, mood_stream = initialize_LSL()
    emotions = []
    for i in range(0,15):
        emotions.append(0)

    print("LSL initialized")
    socketio.emit(
    'script:done',
    {
        'status': 'mood-done',
        'data' : emotions
    },
    namespace=namespace
    )
    # while True:
    #     # print("emotion:" + str(mood_stream))
    #
    #     Rnum = randint(0,2)
    #     print("emotion:" + str(Rnum))
    #
    #     del emotions[0]
    #     # emotions.append(mood_stream[0])
    #     emotions.append(Rnum)
    #     print("emotions:" + str(emotions))
    #     print("length:" + str(len(emotions)))
    #
    #     socketio.emit(
    #     'script:done',
    #     {
    #         'status': 'mood-done',
    #         'data' : emotions
    #     },
    #     namespace=namespace
    #     )
    #     time.sleep(1)
        # print("json:" + str(json))
        # json.clear()

        # Get new sample
        # mood_stream, timestamp = inlet.pull_sample()
