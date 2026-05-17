"use client";

import { useQuery } from "@apollo/client/react";
import { GET_POKEMONS } from "./PokemonList.query";
import { useTransition } from "react";
import { PokemonsData } from "@/types";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import { useRouter } from "next/navigation";
import PokemonTypeBadge from "@/components/ui/PokemonTypeBadge";

export default function PokemonList() {
  const router = useRouter();
  const { data, loading, error, fetchMore } = useQuery<PokemonsData>(GET_POKEMONS, {
    variables: { first: 10 },
  });

  const [isPending, startTransition] = useTransition();

  if (loading && !data) {
    return <LoadingState message="Loading Pokémon..." />;
  }

  if (error) {
    return <ErrorState message="Error Loading Data" />;
  }

  const pokemons = data?.pokemons || [];

  const handleLoadMorePokemon = () => {
    startTransition(() => {
      fetchMore({
        variables: {
          first: pokemons.length + 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    });
  };

  return (
    <div className="flex flex-col w-full gap-12 mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pokemons.map((pokemon) => {
          return (
            <button
              key={pokemon.id}
              onClick={() => router.push(`/?pokemonName=${pokemon.name}`)}
              className="flex flex-col rounded-card p-6 border bg-slate border-image-frame transition-colors hover:border-yellow group text-left focus:outline-none focus:ring-1 focus:ring-yellow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[1.1px] text-secondary">
                  Nº {pokemon.number}
                </span>
                <div className="flex flex-wrap gap-2 mt-4">
                  {pokemon.types.map((type) => (
                    <PokemonTypeBadge key={type} type={type} size="sm" />
                  ))}
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center py-4 relative group-hover:scale-105 transition-transform duration-300">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  loading="lazy"
                  className="w-32 h-32 object-contain filter drop-shadow-lg"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-image-frame">
                <h2 className="font-sans font-bold text-[24px] leading-none text-hazard-white group-hover:text-yellow transition-colors">
                  {pokemon.name}
                </h2>
              </div>
            </button>
          );
        })}
      </div>

      {/* Load more Pokemon button */}
      <div className="flex justify-center mt-4 border-t border-purple pt-12 pb-24">
        <button
          onClick={handleLoadMorePokemon}
          disabled={isPending}
          className="px-[24px] py-[10px] bg-yellow text-absolute-black font-mono text-[12px] font-semibold uppercase tracking-[1.5px] rounded-feature hover:bg-white/20 hover:shadow-[0_0_0_1px_#c2c2c2] disabled:opacity-50 transition-all duration-150"
        >
          {isPending ? "LOADING..." : "LOAD MORE POKÉMON"}
        </button>
      </div>
    </div>
  );
}
