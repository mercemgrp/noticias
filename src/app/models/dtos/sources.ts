

export interface SourcesDTO {
  sources: SourceDTO[];
  status: string;
}


export interface SourceDTO {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string,
  country: string;
}