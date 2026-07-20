// src/api/pokemon.ts
import {
  type EvoTriggerListResponse,
  type EvoTriggerDetail,
} from "../types/evolution_triggers";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchEvolutionTriggersList = async (
  limit = 20,
  offset = 0,
): Promise<EvoTriggerListResponse> => {
  const response = await fetch(
    `${BASE_URL}/evolution-trigger?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchEvolutionTriggerDetail = async (
  nameOrId: string | number,
): Promise<EvoTriggerDetail> => {
  const response = await fetch(`${BASE_URL}/evolution-trigger/${nameOrId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchSpeciesEvolutionChain = async (speciesName: string) => {
  const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${speciesName}`);
  if (!speciesRes.ok) throw new Error("Failed to fetch species");
  const speciesData = await speciesRes.json();

  const chainUrl = speciesData.evolution_chain.url;

  const chainRes = await fetch(chainUrl);
  if (!chainRes.ok) throw new Error("Failed to fetch evolution chain");
  const chainData = await chainRes.json();

  return chainData.chain;
};
