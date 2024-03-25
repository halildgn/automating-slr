def get_boundaries(bib_databases):
    unique_types = set()
    unique_years = set()
    unique_page_numbers = set()
    for bib_database in bib_databases: 
        for entry in bib_database.entries:
            publication_type =  extract_publication_type(entry)
            if isinstance(publication_type, str):
                if not publication_type:
                   continue 
            unique_years.add(publication_type)    
            year =  extract_publication_date(entry)
            if year is None: 
                   continue
            unique_years.add(year)
            page_number = extract_page_number(entry) 
            if page_number is None: 
                   continue
            unique_types.add(page_number) 

    return {"available_publication_types": list(unique_types), "earliest_date": str(min(unique_years)), "latest_date": str(max(unique_years)), "min_page": str(min(unique_page_numbers)), "max_page": str(max(unique_page_numbers))}

def extract_publication_type(entry):
    entry_type = entry.get('ENTRYTYPE', '').lower()
    return entry_type

def extract_page_number(entry):
    # Try to get the number of pages from the 'numpages' field
    numpages = entry.get('numpages', '')
    if numpages.isdigit():
        return int(numpages)

    # Try to extract the page number range from the 'pages' field and calculate the number of pages, if '-' is not
    # present, the number of pages is 1
    pages = entry.get('pages', '')

    # Check if the string is valid before trying to split
    if '-' in pages:
        start, end = map(str.strip, pages.split('-'))
        if start.isdigit() and end.isdigit():
            return int(end) - int(start) + 1

    return None


def extract_publication_date(entry):
    # Extract publication date from the 'year' field
    year = entry.get('year', '')
    if year.isdigit():
        return int(year)
    return None
