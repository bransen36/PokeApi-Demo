import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvolutionTriggersList } from "./api/evolution_triggers";
import "./App.css";
import TriggerList from "./components/TriggerList";
import SpeciesList from "./components/SpeciesList";

function App() {
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["evolutionTriggerList"],
    queryFn: () => fetchEvolutionTriggersList(20, 0),
  });

  if (isLoading) return <p className="status-message">Loading...</p>;
  if (isError) return <p className="status-message error">Error loading data.</p>;

  return (
    <div className="app">
      <h1>Evolution Triggers</h1>
      <TriggerList
        triggers={data?.results}
        onTriggerSelect={setSelectedTrigger}
      />
      {selectedTrigger && (
        <section className="selected-trigger-section">
          <h2>Pokémon that evolve by: {selectedTrigger}</h2>
          {/* Next Step: Render your <SpeciesList triggerName={selectedTrigger} /> here */}
        </section>
      )}
      <SpeciesList triggerName={selectedTrigger} />
    </div>
  );
}

export default App;
