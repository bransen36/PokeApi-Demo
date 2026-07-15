export interface EvoTriggerListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EvoTriggerListItem[];
}

export interface EvoTriggerListItem {
  name: string;
  url: string;
}

export interface EvoTriggerDetail {
  id: number;
  name: string;
  pokemon_species: {
    name: string;
    url: string;
  }[];
}
