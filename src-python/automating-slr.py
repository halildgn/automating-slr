from typing import cast
from typing import Union
from typing import Dict, List
from sys import platform
import gc
import socket
import pickledb
import multiprocessing
import sys
import os
import bibtexparser
from modules.query import *
from modules.bib_to_csv import *
from modules.scraper import *
from flask import Flask, request, jsonify 
from flask_cors import CORS
# For linux use compiled version with glibc-2.31 since remote package requires glibc-2.33 which legacy linux distros don't have :
if platform == 'linux':
    import webui_linux as webui 
else:
    from webui import webui
app = Flask(__name__)
CORS(app)
bib_files = None

@app.route("/config", methods=['GET'])
def getConfiguration():
    config_missing = not config_exists() 
    db = pickledb.load(config_path(),auto_dump=True, sig=False) 
    if(config_missing):
        db.set('theme','light')
        db.set('builds', [])
    theme = db.get('theme')
    builds = db.get('builds')
    return jsonify({"theme": theme, "builds": builds})

@app.route('/setThemeConfig', methods=['POST'])
def setThemeConfig():
     data = cast(Dict,request.json)  
     db = pickledb.load(config_path(),auto_dump=True, sig=False)
     db.set('theme', data['theme'])
     return app.response_class(status=200)

@app.route('/setBuildsConfig', methods=['POST'])
def setBuildsConfig():
     data = cast(Dict,request.json)  
     db = pickledb.load(config_path(),auto_dump=True, sig=False)
     db.set('builds', data['builds'])
     return app.response_class(status=200)

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
    data = cast(Dict,request.json)
    global bib_files
    min_pages: str = data['minPages'] 
    max_pages: str = data['maxPages']
    start_year: str =  data['startYear']
    end_year: str = data['endYear']
    publication_types: List[str] = data['publicationTypes']
    removed_duplicate_count: int = bib_to_csv(bib_files, min_pages,max_pages, start_year, end_year, publication_types)
    # clear the cache
    del bib_files
    gc.collect()
    return jsonify({"duplicateCount": removed_duplicate_count}) 

@app.route("/download",methods=['POST'])
async def download():
    data = cast(Dict,request.json)
    library: str = data['library']
    query: str = data['query']
    if(not library or not query):
        return app.response_class(status=400)
    downloaded_file_name: str = cast(str,await download_data(library, query))
    if downloaded_file_name is None:
        return app.response_class(status=500)
    return jsonify({"fileName": downloaded_file_name}) 

def resource_path(relative_path) -> Union[str,None]:
    # macos frozen(executable) -> via "py2app-macos-setup.py"(by making use of py2app)
    if os.path.exists(os.path.join(os.path.dirname(__file__), '/Resources/index.html')):
        return '/Resources/index.html'
    # linux&windows frozen -> via pyinstaller
    if hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, relative_path)
   # unfrozen (when executed by python interpreter directly) 
    if os.path.exists(os.path.join(os.path.dirname(__file__), relative_path)):
        return relative_path 

def config_exists() -> bool:
   return os.path.exists(os.path.join(os.path.dirname(__file__), 'config.db'))

def config_path() -> str:
    return os.path.join(os.path.dirname(__file__), 'config.db')

def is_port_in_use(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def spin_up_server() -> None:
     if(not is_port_in_use(9998)):
        app.run(host="localhost", port=9998, debug=False) 

if __name__ == '__main__':
#   needed when freezing the app:
#   multiprocessing.freeze_support()
    frontend = cast(str,resource_path("index.html"))
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
    app_window = webui.window()
    app_window.show(frontend)
