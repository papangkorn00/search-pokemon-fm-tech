"use client";

import { Pokemon } from "@/types";
import { useRouter } from "next/navigation";
import PokemonTypeBadge from "@/components/ui/PokemonTypeBadge";

export default function PokemonEvolutions({ evolutions }: { evolutions?: Pokemon[] }) {
  const router = useRouter();

  if (!evolutions || evolutions.length === 0) return null;

  return (
    <div className="bg-slate p-8 border border-image-frame rounded-card mt-4">
      <h3 className="font-display text-[40px] uppercase text-hazard-white mb-8 border-b border-purple pb-4">
        Evolutions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {evolutions.map(evo => (
          <button
            key={evo.id}
            onClick={() => router.push(`/?pokemonName=${evo.name}`)}
            className="cursor-pointer flex items-center gap-4 p-4 border border-image-frame bg-canvas rounded-card hover:border-yellow transition-colors text-left group focus:outline-none focus:ring-1 focus:ring-yellow"
          >
            <div className="bg-hazard-white rounded-image p-2 shrink-0">
              <img
                src={evo.image}
                alt={evo.name}
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest">Nº {evo.number}</span>
              <span className="font-sans font-bold text-[20px] text-hazard-white group-hover:text-yellow transition-colors">{evo.name}</span>
              <div className="flex gap-1 mt-1">
                {evo.types?.slice(0, 2).map(t => (
                  <PokemonTypeBadge key={t} type={t} size="sm" />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
