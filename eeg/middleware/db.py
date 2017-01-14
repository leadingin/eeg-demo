from eeg.db import get_db

import eeg.middleware.util as util

def get_datasets():
    db = get_db()
    curr = db.execute('SELECT id, output, emotion, timestamp FROM datasets order by id asc')
    entries = curr.fetchall()
    return util.serialize_datasets(entries)
