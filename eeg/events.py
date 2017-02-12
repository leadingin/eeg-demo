# socket events
from flask_socketio import SocketIO, emit, disconnect
import os
import signal
from subprocess import Popen, PIPE
import datetime
import sys
from .app import socketio
from eeg.middleware.util import background_listener

#
# path = ''
# process_list = []
# threads = []
namespace = '/eeg'
eeg_path = './pyscripts/test.py'

@socketio.on('test:server', namespace=namespace)
def test_conn(message):
    emit('test:ui', 'received message: ' + message)

@socketio.on('script:run', namespace=namespace)
def run_script():
    # output = [1,2,3] # Dummy data
    # emit('data',
    #     {'data': output, 'status':'running'}) # JSON format
    p = Popen(
        ['python', eeg_path],
        stdout=PIPE,
        stderr=PIPE,
        bufsize=-1,
        universal_newlines=True
    )
    socketio.start_background_task(
        target=background_listener,
        socketio=socketio,
        process=p,
        namespace=namespace
    )
