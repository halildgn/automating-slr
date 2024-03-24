import gc
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

@app.route("/availablePublications",methods=['POST'])
def getAvailablePublications():
    bib_databases = []
    for _, data in request.files.items():
        bib_databases.append(bibtexparser.load(data))
    # cache it for next request
    global bib_files
    bib_files = bib_databases
    unique_publication_types = get_unique_publication_types(bib_databases)
    return jsonify(unique_publication_types)

@app.route("/filter",methods=['POST'])
def filter():
    global bib_files
    bib_to_csv(bib_files, request.json['minPages'], request.json['maxPages'], request.json['startYear'], request.json['endYear'], request.json['publicationTypes'])
    # clear the cache
    del bib_files
    gc.collect()
    return app.response_class(status=200)

if __name__ == '__main__':
    app.run(host="localhost", port=9998, debug=True)
