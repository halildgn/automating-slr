from typing import List
import gc
import socket
import webview
import multiprocessing
import sys
import os
import bibtexparser
from modules.query import *
from modules.bib_to_csv import *
from flask import Flask, request, jsonify 
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
bib_files = None

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
    min_pages: str = request.json['minPages'] 
    max_pages: str =  request.json['maxPages']
    start_year: str =  request.json['startYear']
    end_year: str = request.json['endYear']
    publication_types: List[str] = request.json['publicationTypes']
    bib_to_csv(bib_files, min_pages,max_pages, start_year, end_year, publication_types)
    # clear the cache
    del bib_files
    gc.collect()
    return app.response_class(status=200)

def resource_path(relative_path):
    #macos&py2app
    if os.path.exists(os.path.join(os.path.dirname(__file__), '/Resources/index.html')):
        return '/Resources/index.html'
    #linux&windows
    if hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, relative_path)
    return os.path.join(os.path.abspath("."), relative_path)


def is_port_in_use(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def spin_up_server():
     if(not is_port_in_use(9998)):
        app.run(host="localhost", port=9998, debug=False) 

if __name__ == '__main__':
    multiprocessing.freeze_support()
    frontend = resource_path("index.html")
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
    webview.create_window('Automating SLR', frontend, resizable=True)
    webview.start()
    server_process.terminate()
