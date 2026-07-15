export const findEvolutionDetails = (
  chainNode: any,
  targetSpecies: string,
): any[] | null => {
  if (chainNode.species.name === targetSpecies) {
    return chainNode.evolution_details;
  }

  if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
    for (const nextEvolution of chainNode.evolves_to) {
      const foundDetails = findEvolutionDetails(nextEvolution, targetSpecies);
      if (foundDetails) return foundDetails;
    }
  }

  return null;
};
