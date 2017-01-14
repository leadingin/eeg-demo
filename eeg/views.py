import eeg.middleware.db as db

from .app import app
from flask import abort, flash, jsonify, redirect, render_template, request, session, url_for

# -------------
# PUBLIC ROUTES
# -------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

# ----------
# API ROUTES
# ----------

@app.route('/api/dataset/', methods=['GET'])
def get_datasets():
    datasets = db.get_datasets()

    return jsonify(**datasets)

# @app.route('/')
# def show_entries():
#     db = get_db()
#     curr = db.execute('SELECT id, output, emotion, timestamp FROM datasets order by id asc')
#     entries = curr.fetchall()
#     return render_template('show_entries.html', entries=entries)
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     error = None
#     if request.method == 'POST':
#         if request.form['username'] != app.config['USERNAME']:
#             error = 'Invalid username'
#         elif request.form['password'] != app.config['PASSWORD']:
#             error = 'Invalid password'
#         else:
#             session['logged_in'] = True
#             flash('You were logged in')
#             return redirect(url_for('show_entries'))
#     return render_template('login.html', error=error)
#
# @app.route('/logout')
# def logout():
#     session.pop('logged_in', None)
#     flash('You were logged out')
#     return redirect(url_for('show_entries'))

# @app.route('/api/add', methods=['POST'])
# def add_entry():
#     if not session.get('logged_in'):
#         abort(401)
#     db = get_db()
#     db.execute('INSERT INTO datasets (output, emotion) VALUES (?,?)', [ request.form['output'], request.form['text'] ])
#     db.commit()
#     flash('New entry was successfully posted!')
#     return redirect(url_for('show_entries'))
