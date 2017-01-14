import os

settings = dict(
    SECRET_KEY=os.environ['EEG_SECRET_KEY'],
    DATABASE=os.path.join(os.getcwd(), 'eeg', os.environ['EEG_DB_FILE']),
    USERNAME=os.environ['EEG_USERNAME'],
    PASSWORD=os.environ['EEG_PASSWORD']
)
