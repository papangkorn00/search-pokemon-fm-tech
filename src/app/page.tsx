import { Suspense } from "react";
import SearchInput from "@/components/search/SearchInput";
import PokemonList from "@/components/pokemon/PokemonList";
import PokemonResult from "@/components/pokemon/PokemonResult";
import LoadingState from "@/components/ui/LoadingState";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const pokemonName = typeof params.pokemonName === "string" ? params.pokemonName : "";

  return (
    <div className="flex flex-col flex-1 items-center font-sans min-h-screen pt-20">
      <main className="flex w-full max-w-[1280px] flex-col py-10 px-6 sm:px-12">
        <div className="mb-16 bg-absolute-black/60 backdrop-blur-md p-8 sm:p-12 border border-purple rounded-card shadow-2xl relative overflow-hidden">

          <h1 className="font-display font-black text-[40px] sm:text-[70px] tracking-tight text-hazard-white mb-4 leading-none flex flex-col xl:flex-row xl:items-baseline gap-2 xl:gap-4">
            <span className="uppercase">POKÉMON <span className="text-yellow">EXPLORER</span></span>
            <span className="font-mono text-[30px] text-blue-500 tracking-[1px] lowercase font-semibold">(search-pokemon-fm-tech)</span>
          </h1>

          <p className="text-[16px] font-mono text-secondary max-w-2xl uppercase tracking-[1.5px]">
            Search for your favorite Pokémon to see their details and evolutions.
          </p>
        </div>

        <div className="w-full max-w-3xl pt-8">
          <Suspense fallback={<div className="h-12 w-full max-w-md bg-slate animate-pulse rounded-badge"></div>}>
            <SearchInput />
          </Suspense>
        </div>

        <div className="w-full">
          {pokemonName ? (
            <PokemonResult name={pokemonName} />
          ) : (
            <Suspense fallback={<LoadingState message="LOADING POKÉMON..." />}>
              <PokemonList />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
}
