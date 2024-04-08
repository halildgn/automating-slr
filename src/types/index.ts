export enum COMPONENTS {
  GENERATOR,
  FILTERING,
  DOWNLOAD,
}

export type Field = {
  label: string | null;
  keywords: string[] | null;
  logical_operator: string | null;
};

export type PublicationTypes = { [publicationTypes: string]: boolean };

export type LibraryQuery = {
  ACM: null | string;
  IEEE: null | string;
  WOS: null | string;
  SCOPUS: null | string;
  EBSCO: null | string;
};

// Convert this into a union type of DateRange and PageRange:
export type DateAndPageRange = {
  minPages: string | null;
  maxPages: string | null;
  startYear: string | null;
  endYear: string | null;
};

export type Library = 'ACM' | 'IEEE' | 'WOS' | 'SCOPUS' | 'EBSCO'
