import eeg.middleware.db as db

from .app import app
from flask import abort, flash, jsonify, redirect, render_template, request, session, url_for

# -------------
# PUBLIC ROUTES
# -------------

@app.route('/')
def index():
    return render_template('index.html')

# ----------
# API ROUTES
# ----------

@app.route('/api/dataset/', methods=['GET'])
def get_datasets():
    datasets = db.get_datasets()

    return jsonify(**datasets)
