import gc
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

def spin_up_server():
     if(not is_port_in_use(9998)):
        app.run(host="localhost", port=9998, debug=False) 

class Api:
    def toggleFullscreen(self):
        webview.windows[0].toggle_fullscreen()

if __name__ == '__main__':
    multiprocessing.freeze_support()
    frontend = resource_path("index.html")
    api = Api()
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
    webview.create_window('Automating SLR', frontend, js_api=api, fullscreen=True, resizable=True)
    webview.start()
    server_process.terminate()
    server_process.close()

   
