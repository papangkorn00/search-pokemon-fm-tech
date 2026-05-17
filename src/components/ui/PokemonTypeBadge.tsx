import React from 'react';

export function getTypeColor(type: string): string {
  const colours: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  return colours[type.toLowerCase()] || '#777777';
}

export default function PokemonTypeBadge({ type, size = "md" }: { type: string, size?: "sm" | "md" | "lg" }) {
  const color = getTypeColor(type);
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[9px] rounded",
    md: "px-2 py-0.5 text-[10px] rounded-badge",
    lg: "px-4 py-1 text-[12px] rounded-badge",
  };

  return (
    <span
      className={`font-mono uppercase tracking-[1px] font-bold border ${sizeClasses[size]}`}
      style={{
        color: color,
        borderColor: color,
        backgroundColor: `${color}15`
      }}
    >
      {type}
    </span>
  );
}
