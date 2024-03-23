label_options = ['All field', 'Title', 'Author', 'Abstract', 'Keyword']

def generate_acm_query(synonym_batches):
    """
    Process user-inputted synonym batches and generate a query based on ACM Digital Library syntax.
    """
    acm_labels = ['AllField', 'Title', 'ContribAuthor', 'Abstract', 'Keyword']
    query_parts = []

    for i, batch in enumerate(synonym_batches):
        label = batch['label']
        keywords = batch['keywords']

        # Process keywords, wrap phrases in double quotes
        processed_keywords = []
        for keyword in keywords:
            if ' ' in keyword:  # Check if the keyword is a phrase
                processed_keywords.append(f'"{keyword}"')
            else:
                processed_keywords.append(keyword)

        # Combine keywords using ACM Digital Library syntax
        keyword_str = f' OR '.join(processed_keywords)

        # Get the logical operator for connecting groups, default to 'AND' if not present
        logical_operator = batch.get('logical_operator', 'AND')

        # Create a query part for the current batch
        query_part = f"{acm_labels[label_options.index(label)]}:({keyword_str})"

        # Add the logical operator before each group except for the first one
        if i > 0:
            query_parts.append(f' {logical_operator} ')

        query_parts.append(query_part)

    # Combine query parts using ACM Digital Library syntax
    final_query = ''.join(query_parts)

    return final_query


def generate_ieee_query(synonym_batches):
    """
    Process user-inputted synonym batches and generate a query based on IEEE Xplore syntax.
    """
    ieee_labels = ['All Metadata', 'Document Title', 'Authors', 'Abstract', 'Author Keywords']
    query_parts = []

    for i, batch in enumerate(synonym_batches):
        label = batch['label']
        keywords = batch['keywords']

        # Process keywords, wrap phrases in double quotes and add labels
        processed_keywords = []
        for keyword in keywords:
            if ' ' in keyword:  # Check if the keyword is a phrase
                processed_keywords.append(f'"{ieee_labels[label_options.index(label)]}":"{keyword}"')
            else:
                processed_keywords.append(f'"{ieee_labels[label_options.index(label)]}":{keyword}')

        # Combine keywords using IEEE Xplore syntax
        keyword_str = f' OR '.join(processed_keywords)

        # Get the logical operator for connecting groups, default to 'AND' if not present
        logical_operator = batch.get('logical_operator', 'AND')

        # Create a query part for the current batch
        query_parts.append(f' {logical_operator} ({keyword_str})' if i > 0 else f'({keyword_str})')

    # Combine query parts using IEEE Xplore syntax
    final_query = ''.join(query_parts)

    return final_query


def generate_wos_query(synonym_batches):
    """
    Process user-inputted synonym batches and generate a query based on Web of Science syntax.
    """
    wos_labels = ['ALL', 'TI', 'AU', 'AB', 'AK']
    query_parts = []

    for i, batch in enumerate(synonym_batches):
        label = batch['label']
        keywords = batch['keywords']

        # Process keywords, wrap phrases in double quotes
        processed_keywords = []
        for keyword in keywords:
            if ' ' in keyword:  # Check if the keyword is a phrase
                processed_keywords.append(f'"{keyword}"')
            else:
                processed_keywords.append(keyword)

        # Combine keywords using Web Of Science syntax
        keyword_str = f' OR '.join(processed_keywords)

        # Get the logical operator for connecting groups, default to 'AND' if not present
        logical_operator = batch.get('logical_operator', 'AND')

        # Create a query part for the current batch
        query_part = f"{wos_labels[label_options.index(label)]}=({keyword_str})"
        query_parts.append(f' {logical_operator} {query_part}' if i > 0 else f'{query_part}')

    # Combine query parts using Web Of Science syntax
    final_query = ''.join(query_parts)

    return final_query

def generate_scopus_query(synonym_batches):
    """
    Process user-inputted synonym batches and generate a query based on Scopus syntax.
    """
    scopus_labels = ['ALL', 'TITLE', 'AUTH', 'ABS', 'AUTHKEY']
    query_parts = []

    for i, batch in enumerate(synonym_batches):
        label = batch['label']
        keywords = batch['keywords']

        # Process keywords, wrap phrases in double quotes
        processed_keywords = []
        for keyword in keywords:
            if ' ' in keyword:  # Check if the keyword is a phrase
                processed_keywords.append(f'"{keyword}"')
            else:
                processed_keywords.append(keyword)

        # Combine keywords using Web Of Science syntax
        keyword_str = f' OR '.join(processed_keywords)

        # Get the logical operator for connecting groups, default to 'AND' if not present
        logical_operator = batch.get('logical_operator', 'AND')

        # Create a query part for the current batch
        query_part = f"{scopus_labels[label_options.index(label)]}({keyword_str})"
        query_parts.append(f' {logical_operator} {query_part}' if i > 0 else f'{query_part}')

    # Combine query parts using Web Of Science syntax
    final_query = ''.join(query_parts)

    return final_query

def generate_query(synonym_batches):
    if synonym_batches:
        acm_query = generate_acm_query(synonym_batches)
        ieee_query = generate_ieee_query(synonym_batches)
        wos_query = generate_wos_query(synonym_batches)
        scopus_query = generate_scopus_query(synonym_batches)
        ebsco_query = generate_ebsco_query(synonym_batches)
        science_direct_query = generate_science_direct_query(synonym_batches)
        return ({'acm': acm_query, 'ieee': ieee_query, 'wos': wos_query, 'scopus': scopus_query, 'ebsco_query': ebsco_query, 'science_direct': science_direct_query}) 
    else:
       return {} 
