"use client";

import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_DETAILS } from "./PokemonResult.query";
import { PokemonData } from "@/types";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import { useRouter } from "next/navigation";
import NotFoundState from "@/components/ui/NotFoundState";
import PokemonAttacks from "./PokemonAttacks";
import PokemonEvolutions from "./PokemonEvolutions";
import PokemonTypeBadge from "@/components/ui/PokemonTypeBadge";

export default function PokemonResult({ name }: { name: string }) {
  const router = useRouter();
  const { data, loading, error } = useQuery<PokemonData>(GET_POKEMON_DETAILS, {
    variables: { name },
  });

  if (loading) {
    return <LoadingState message={`SEARCHING FOR ${name}...`} />;
  }

  if (error) {
    return <ErrorState message="ERROR LOADING POKÉMON DATA" />;
  }

  const pokemon = data?.pokemon;

  if (!pokemon) {
    return <NotFoundState message={`DATA UNAVAILABLE FOR "${name}"`} />;
  }

  return (
    <div className="flex flex-col w-full mt-12 gap-8">
      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-start gap-4">
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-3 px-5 py-2 border border-secondary text-hazard-white bg-slate/50 backdrop-blur-md font-mono text-[12px] font-bold uppercase tracking-[1.5px] rounded-pill hover:border-yellow hover:text-yellow transition-all group focus:outline-none focus:ring-1 focus:ring-yellow"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          GO BACK
        </button>
        <button
          onClick={() => router.push('/')}
          className="cursor-pointer flex items-center gap-3 px-5 py-2 border border-image-frame text-secondary bg-transparent font-mono text-[12px] font-bold uppercase tracking-[1.5px] rounded-pill hover:text-hazard-white hover:border-hazard-white transition-all focus:outline-none focus:ring-1 focus:ring-hazard-white"
        >
          HOME
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 bg-slate p-8 border border-image-frame rounded-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3D23B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        {/* Image */}
        <div className="w-full md:w-1/3 flex items-center justify-center bg-canvas rounded-feature p-8 border border-secondary shrink-0 relative group">
          <span className="absolute top-4 left-4 font-mono text-[16px] font-bold text-yellow">
            Nº {pokemon.number}
          </span>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-48 h-48 object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="font-mono text-yellow text-[14px] uppercase tracking-[2px] mb-2">
            {pokemon.classification}
          </p>
          <h1 className="font-display text-[60px] sm:text-[80px] font-black leading-[0.8] tracking-tight text-hazard-white uppercase mb-6">
            {pokemon.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {pokemon.types.map(t => (
              <PokemonTypeBadge key={t} type={t} size="lg" />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 border-t border-purple pt-6">
            <StatBox label="MAX CP" value={pokemon.maxCP?.toString() || "-"} />
            <StatBox label="MAX HP" value={pokemon.maxHP?.toString() || "-"} />
            <StatBox label="FLEE RATE" value={pokemon.fleeRate != null ? pokemon.fleeRate.toString() : "-"} />
            <StatBox label="WEIGHT" value={pokemon.weight ? `${pokemon.weight.minimum} - ${pokemon.weight.maximum}` : "-"} />
            <StatBox label="HEIGHT" value={pokemon.height ? `${pokemon.height.minimum} - ${pokemon.height.maximum}` : "-"} />
          </div>

          {pokemon.evolutionRequirements && (
            <div className="mt-6 border-t border-[#3cffd0]/30 pt-6">
              <div className="inline-flex flex-col bg-[#3cffd0]/10 border border-[#3cffd0] px-4 py-2 rounded-badge shadow-[0_0_15px_rgba(60,255,208,0.15)]">
                <span className="font-mono text-[10px] text-[#3cffd0] uppercase tracking-[1.5px] mb-1">EVOLUTION REQUIREMENT</span>
                <span className="font-mono text-[16px] text-hazard-white font-bold">
                  {pokemon.evolutionRequirements.amount} × {pokemon.evolutionRequirements.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weaknesses & Resistances */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate p-6 border border-image-frame rounded-card">
            <h3 className="font-sans font-bold text-[24px] uppercase text-hazard-white mb-4 border-b border-secondary pb-2">
              Combat Effectiveness
            </h3>

            <div className="mb-6">
              <p className="font-mono text-secondary text-[12px] uppercase mb-2 tracking-[1px]">Weaknesses</p>
              <div className="flex flex-wrap gap-2">
                {pokemon.weaknesses?.map(w => (
                  <span key={w} className="px-3 py-1 bg-[#ff3333]/10 border border-[#ff3333] text-[#ff3333] font-mono text-[11px] uppercase rounded-badge">
                    {w}
                  </span>
                )) || <span className="text-secondary font-mono text-[11px]">None</span>}
              </div>
            </div>

            <div>
              <p className="font-mono text-secondary text-[12px] uppercase mb-2 tracking-[1px]">Resistant To</p>
              <div className="flex flex-wrap gap-2">
                {pokemon.resistant?.map(r => (
                  <span key={r} className="px-3 py-1 bg-mint/10 border border-mint text-mint font-mono text-[11px] uppercase rounded-badge">
                    {r}
                  </span>
                )) || <span className="text-secondary font-mono text-[11px]">None</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Attacks */}
        <PokemonAttacks attacks={pokemon.attacks} />
      </div>

      {/* Evolutions */}
      <PokemonEvolutions evolutions={pokemon.evolutions} />
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[10px] text-secondary uppercase tracking-[1.5px] mb-1">{label}</span>
      <span className="font-mono text-[18px] text-hazard-white font-bold">{value}</span>
    </div>
  );
}
