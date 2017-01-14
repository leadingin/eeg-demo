from flask import Flask
from .settings import settings

# create the application instance
app = Flask(__name__)

# load config
app.config.update(settings)

# import dependencies
import eeg.db
import eeg.views
import eeg.middleware
