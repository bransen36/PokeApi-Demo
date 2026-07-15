import { useQuery } from "@tanstack/react-query";
import { fetchSpeciesEvolutionChain } from "../api/evolution_triggers";
import { findEvolutionDetails } from "../utility/EvolutionDetails";

interface EvolutionDetailsProps {
  speciesName: string;
}

export default function EvolutionDetails({
  speciesName,
}: EvolutionDetailsProps) {
  const { data: chainRoot, isLoading } = useQuery({
    queryKey: ["evolutionChain", speciesName],
    queryFn: () => fetchSpeciesEvolutionChain(speciesName),
  });

  if (isLoading) return <p className="status-message">Loading evolution details...</p>;
  if (!chainRoot) return null;

  const details = findEvolutionDetails(chainRoot, speciesName);

  if (!details || details.length === 0) {
    return <p className="status-message">{speciesName} is a base stage Pokémon.</p>;
  }

  return (
    <div className="evolution-details">
      <h3>Evolution Requirements for {speciesName}</h3>
      <ul className="evolution-list">
        {details.map((detail, index) => (
          <li key={index} className="evolution-item">
            {detail.item ? (
              <span>
                Requires Item: <strong>{detail.item.name}</strong>
              </span>
            ) : (
              <span>Evolves via: {detail.trigger.name}</span>
            )}
            {detail.min_level && <span> (at Level {detail.min_level})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
