import gc
import psutil
import sys
import os
import webbrowser
import bibtexparser
from modules.query import *
from modules.bib_to_csv import *
from flask import Flask, request, jsonify 
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
bib_files = None

# TYPE ANNOTATE EVERYTHING IN THE CODE!

@app.route("/query",methods=['POST'])
def getQueries():
    payload = request.json
    generatedQueries = generate_query(payload)
    return jsonify(generatedQueries)

@app.route("/boundariesForFilterParameters",methods=['POST'])
def getBoundaries():
    bib_databases = []
    global bib_files
    bib_files = None
    for _, data in request.files.items():
        bib_databases.append(bibtexparser.load(data))
    # cache it for next request
    bib_files = bib_databases
    boundaries = get_boundaries(bib_databases)
    return jsonify(boundaries)

@app.route("/filter",methods=['POST'])
def filter():
    global bib_files
    bib_to_csv(bib_files, request.json['minPages'], request.json['maxPages'], request.json['startYear'], request.json['endYear'], request.json['publicationTypes'])
    # clear the cache
    del bib_files
    gc.collect()
    return app.response_class(status=200)

def resource_path(relative_path):
    if hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, relative_path)
    return os.path.join(os.path.abspath("."), relative_path)

def is_port_in_use(port: int) -> bool:
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

   
if __name__ == '__main__':
    # kill_other_instance_if_in_use()
    frontend = resource_path("index.html")
    webbrowser.open_new(frontend)
    if(not is_port_in_use(9998)):
        app.run(host="localhost", port=9998, debug=False) 
# find way to run infinite loop most efficiently , sleep, block , etc. not to terminate the program
    elif(not is_port_in_use(9997)):
        app.run(host="localhost", port=9997, debug=False) 
