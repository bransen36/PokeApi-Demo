interface TriggerListProps {
  triggers?: { name: string; url: string }[];
  onTriggerSelect: (name: string) => void;
}

function TriggerList({ triggers, onTriggerSelect }: TriggerListProps) {
  return (
    <>
      <ul className="trigger-list">
        {triggers?.map((t) => (
          <li
            key={t.name}
            className="trigger-item"
            onClick={() => onTriggerSelect(t.name)}
          >
            {t.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TriggerList;
