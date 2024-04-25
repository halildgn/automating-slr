from pathlib import Path
import csv
from modules.filter import *
import os
from typing import TypedDict

class FilteringFeedback(TypedDict):
    duplicate_count: int
    file_name: str

# If "file.csv" in save directory exists, save as "file1.csv", and so on.
def get_available_file_name():
    counter = 1
    filename = "filtered_results_{}.csv"
    while os.path.isfile(Path.home().joinpath('Downloads', filename.format(counter))):
        counter += 1
    filename = filename.format(counter)
    return filename

def bib_to_csv(bib_databases, min_pages = None, max_pages= None,
               start_date = None, end_date = None, publication_types = None) -> FilteringFeedback :
    unique_entries = set()  # Used to track items that have been processed
    unique_doi = set()
    duplicate_count = 0
    available_file_name = get_available_file_name() 
    csv_path = Path.home().joinpath('Downloads', available_file_name)
    if min_pages is not None:
        min_pages = int(min_pages)
    if max_pages is not None:
        max_pages = int(max_pages)
    if start_date is not None:
        start_date = int(start_date)
    if end_date is not None:
        end_date = int(end_date)

    # Open CSV file for writing
    with open(csv_path, 'w', encoding='utf-8-sig', newline='') as csv_file:
        # Create a CSV writer, specify the quotation mark rule as csv.QUOTE_MINIMAL, and set the escape character to
        # double quotation marks
        csv_writer = csv.writer(csv_file, quoting=csv.QUOTE_MINIMAL, escapechar='"')

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
    return {"duplicate_count": duplicate_count, "file_name": available_file_name}
