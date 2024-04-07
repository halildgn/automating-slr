export enum COMPONENTS {
  GENERATOR,
  FILTERING,
  DOWNLOAD,
}

export type FieldMap = {
  label: string | null;
  keywords: string[] | null;
  logical_operator: string | null;
};

export type Queries = {
  acm: null | string;
  ieee: null | string;
  wos: null | string;
  scopus: null | string;
  ebsco: null | string;
};

export type PublicationTypes = { [publicationTypes: string]: boolean };

// Convert this into a union type of DateRange and PageRange:
export type DateAndPageRange = {
  minPages: string | null;
  maxPages: string | null;
  startYear: string | null;
  endYear: string | null;
};

export enum INFO {
  WOS = "wos info string",
  IEEE = "ieee info string",
  ACM = "acm info string",
  SCOPUS = "scopus info string",
  EBSCO = "ebsco info string",
}
