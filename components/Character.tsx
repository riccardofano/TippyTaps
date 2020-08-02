interface CharacterProps {
  value: string;
}

export default function Character({ value }: CharacterProps) {
  return <span>{value}</span>;
}
