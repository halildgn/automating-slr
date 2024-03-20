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

    # If the 'pages' field does not exist or cannot be parsed, return "No data"
    return "No data"


def extract_publication_date(entry):
    # Extract publication date from the 'year' field
    year = entry.get('year', '')
    if year.isdigit():
        return int(year)
    return None
