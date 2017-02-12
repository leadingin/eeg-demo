from flask import Flask
from flask_socketio import SocketIO
import eventlet
from .settings import settings

# Setup eventlet
async_mode = 'eventlet'
eventlet.monkey_patch()

# create the application instance
app = Flask(__name__)

# load config
app.config.update(settings)

# setup SocketIO
socketio = SocketIO(app, async_mode=async_mode, debug=True)

# import dependencies
import eeg.db
import eeg.views
import eeg.middleware
import eeg.events
