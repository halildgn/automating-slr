import gc
import bibtexparser
from modules.query import *
from modules.bib_to_csv import *
from flask import Flask, request, jsonify 
from flask_cors import CORS
from io import StringIO
app = Flask(__name__)
CORS(app)
bib_n_csv_files = None


@app.route("/query",methods=['POST'])
def getQueries():
    payload = request.json
    generatedQueries = generate_query(payload)
    return jsonify(generatedQueries)

@app.route("/availablePublications",methods=['POST'])
def getAvailablePublications():
    databases = []
    for filename, data in request.files.items():
        if(filename.endswith(".bib")):
            databases.append(bibtexparser.load(data))
        elif (filename.endswith(".csv")):
            f = StringIO(request.files[filename].read().decode('utf-8'))
            reader = csv.DictReader(f, delimiter=',', skipinitialspace=True)
            # a = [{k: int(v) for k, v in row.items()}
            # for row in csv.DictReader(f, delimiter=',', skipinitialspace=True)]
            a = list(reader)
            databases.append({"entries": a})
    # cache it for next request
    global bib_n_csv_files
    bib_n_csv_files = databases
    unique_publication_types = get_unique_publication_types(databases)
    return jsonify(unique_publication_types)

@app.route("/filter",methods=['POST'])
def filter():
    global bib_n_csv_files
    filter_and_save_as_csv(bib_n_csv_files, request.json['minPages'], request.json['maxPages'], request.json['startYear'], request.json['endYear'], request.json['publicationTypes'])
    # clear the cache
    del bib_n_csv_files
    gc.collect()
    return app.response_class(status=200)

if __name__ == '__main__':
    app.run(host="localhost", port=9997, debug=True)
