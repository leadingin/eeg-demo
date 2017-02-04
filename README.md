# UTSA Senior Design EEG
> Emotion Detection with EEG using Python

**Description:** This project is focused on detecting emotional states in a SUBJECT using EEG signals.

## Install

Install the following, if your computer doesn't have it currently:

* Python3 v3.5.x
* Node v6.9.x
* SQLite3 v3.14.x
* Bower v1.8.x

```bash
$ pip3 install virtualenv
$ virtualenv .venv
$ source .venv/bin/activate
$ source .env
$ pip3 install -e .
```

## Setup

Seed database.

```bash
$ flask initdb
```

## Build

Build the UI.

```bash
$ sh build.sh
```

## Run

```bash
$ flask run
```

### Current Routes

* /
* /login
* /api/dataset/

--

> The University of Texas at San Antonio
>
> Department of Electrical Engineering
>
> Fall 2016 - Spring 2017 Senior Design
