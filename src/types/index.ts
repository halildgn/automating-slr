export enum COMPONENTS {
  GENERATOR,
  MY_BUILDS,
  FILTERING,
  DOWNLOAD
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

export type DateAndPageRange = {
  minPages: string | null;
  maxPages: string | null;
  startYear: string | null;
  endYear: string | null;
};

export type Build = {
  id: string,
  name: string,
  fields: Array<Field>
}

export type Library = 'acm' | 'ieee' | 'wos' | 'scopus' | 'ebsco'
