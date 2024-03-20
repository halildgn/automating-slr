import bibtexparser
import csv
from modules.filter import *
from io import StringIO
import base64

def get_unique_publication_types(bib_databases):
    unique_types = set()
    for bib_database in bib_databases: 
        for entry in bib_database.entries:
            entry_type = entry.get('ENTRYTYPE', '').lower()
            unique_types.add(entry_type)

    return list(unique_types)

def bib_to_csv(bib_databases, min_pages=None, max_pages=None,
               start_date=None, end_date=None, publication_types=None):
    unique_entries = set()  # Used to track items that have been processed
    unique_doi = set()
    duplicate_count = 0


    # Open CSV file for writing
    f = StringIO()
    # Create a CSV writer, specify the quotation mark rule as csv.QUOTE_MINIMAL, and set the escape character to
    # double quotation marks
    csv_writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL, escapechar='"')

    # Write the header row of the CSV file
    csv_writer.writerow(['Type', 'Title', 'Abstract', 'Authors', 'Keywords', 'DOI', 'Publication Date', 'Pages'])

    # Process each BibTeX file
    for bib_database in bib_databases:

        # Use filter_entries function to filter
        filtered_entries = filter_entries(bib_database.entries, min_pages, max_pages, publication_types)
        # Use the new filter_by_publication_date function
        filtered_entries = filter_by_publication_date(filtered_entries, start_date, end_date)

        # Traverse each filtered item and write the required fields to the CSV file
        for entry in filtered_entries:
            # Get the value of the required field, or 'No data' if the field does not exist
            title = entry.get('title', 'No data').replace('\n', ' ')
            abstract = entry.get('abstract', 'No data').replace('\n', ' ')
            authors = entry.get('author', 'No data').replace('\n', ' ')
            keywords = entry.get('keywords', 'No data').replace('\n', ' ')
            doi = entry.get('doi', 'No data')
            pub_date = entry.get('year', 'No data')
            pages = entry.get('pages', 'No data')
            entry_type = entry.get('entry_type', 'No data')

            # Use title and author information to determine whether the entry has been processed to prevent
            # duplication
            entry_doi = f"{doi.lower()}"
            entry_identifier = f"{title.lower()}_{authors.lower()}"
            if entry_doi == 'no data':
                if entry_identifier not in unique_entries:
                    # Write to CSV file
                    csv_writer.writerow([entry_type, title, abstract, authors, keywords, doi, pub_date, pages])
                    unique_entries.add(entry_identifier)
                else:
                    duplicate_count += 1
            elif entry_doi not in unique_doi:
                # Write to CSV file
                csv_writer.writerow([entry_type, title, abstract, authors, keywords, doi, pub_date, pages])
                unique_doi.add(entry_doi)
            else:
                duplicate_count += 1
    return base64.b64encode(f.getvalue().encode('utf-8'))
