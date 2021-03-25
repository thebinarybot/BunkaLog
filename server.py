#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask

app = Flask(__name__)

data = [
		{'courseName': 'Game Theory',
		'courseCode': '15XT81',
		'classesAttended': 21,
		'totalClasses': 24},
		{'courseName': 'Parallel & Distributed Computing',
		'courseCode': '15XT82',
		'classesAttended': 13,
		'totalClasses': 14},
		{'courseName': 'Mathematical Modelling',
		'courseCode': '15XT83',
		'classesAttended': 20,
		'totalClasses': 28},
		{'courseName': 'ADBMS',
		'courseCode': '15XTE1',
		'classesAttended': 14,
		'totalClasses': 18},
		{'courseName': 'DV',
		'courseCode': '15XTOK',
		'classesAttended': 22,
		'totalClasses': 22}
	]

@app.route('/')
def index():
    return json.dumps(data)

app.run(host="192.168.86.129")
