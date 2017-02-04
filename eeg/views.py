import eeg.middleware.db as db

from .app import app
from flask import abort, flash, jsonify, redirect, render_template, request, session, url_for

# -------------
# PUBLIC ROUTES
# -------------

@app.route('/')
def index():
    return redirect("results")

@app.route('/results')
def results():
    return render_template('main.html', active="live-data", subtab="results")

@app.route('/history')
def history():
    return render_template('history.html', active="history")

@app.route('/process')
def process():
    return render_template('main.html', active="live-data", subtab="process")

# ----------
# API ROUTES
# ----------

@app.route('/api/dataset/', methods=['GET'])
def get_datasets():
    datasets = db.get_datasets()

    return jsonify(**datasets)
