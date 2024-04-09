export enum COMPONENTS {
  GENERATOR,
  FILTERING,
  DOWNLOAD,
  MY_BUILDS
}

export type Field = {
  label: string | null;
  keywords: string[] | null;
  logical_operator: string | null;
};

export type PublicationTypes = { [publicationTypes: string]: boolean };

export type LibraryQuery = {
  acm: null | string;
  ieee: null | string;
  wos: null | string;
  scopus: null | string;
  ebsco: null | string;
};

// Convert this into a union type of DateRange and PageRange:
export type DateAndPageRange = {
  minPages: string | null;
  maxPages: string | null;
  startYear: string | null;
  endYear: string | null;
};

export type Library = 'acm' | 'ieee' | 'wos' | 'scopus' | 'ebsco'
