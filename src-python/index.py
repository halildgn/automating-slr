from modules.query import *
from modules.bib_to_csv import *
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    unique_publication_types = get_unique_publication_types(bib_databases)
    return jsonify(unique_publication_types)

@app.route("/filter",methods=['POST'])
def filter():
    publication_types = request.json
    result = bib_to_csv(bib_files, output_csv, publication_types)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host="localhost", port=9999, debug=True)
