import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvolutionTriggerDetail } from "../api/evolution_triggers";
import EvolutionDetails from "./EvolutionDetails";

interface SpeciesListProps {
  triggerName: string | null;
}

function SpeciesList({ triggerName }: SpeciesListProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  useEffect(() => {
    setSelectedSpecies(null);
  }, [triggerName]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["evolutionTrigger", triggerName],
    queryFn: () => fetchEvolutionTriggerDetail(triggerName!),
    enabled: !!triggerName,
  });

  if (!triggerName) return <p className="status-message">Select an evolution method to see a list of Pokémon.</p>;
  if (isLoading) return <p className="status-message">Loading species...</p>;
  if (isError) return <p className="status-message error">Error loading species.</p>;
  if (!data?.pokemon_species.length) return <p className="status-message">No Pokémon use this trigger.</p>;

  return (
    <div className="species-section">
      {selectedSpecies && <EvolutionDetails speciesName={selectedSpecies} />}
      <ul className="species-list">
        {data.pokemon_species.map((species) => (
          <li
            key={species.name}
            className={`species-item${selectedSpecies === species.name ? " selected" : ""}`}
            onClick={() => setSelectedSpecies(species.name)}
          >
            {species.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpeciesList;
