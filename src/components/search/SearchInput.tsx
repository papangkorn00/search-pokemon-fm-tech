"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recentPokemonSearches");
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch (e) { }
  }, []);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowRecent(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync with URL search
  useEffect(() => {
    const pokemonName = searchParams.get("pokemonName");
    if (pokemonName !== null) {
      setSearchValue(pokemonName);
    } else {
      setSearchValue("");
    }
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent, term?: string) => {
    if (e) e.preventDefault();
    const valueToSearch = term || searchValue.trim().toLowerCase();

    if (!valueToSearch) return;

    // Save to recent
    const newRecent = [valueToSearch, ...recentSearches.filter(s => s !== valueToSearch)].slice(0, 5);
    setRecentSearches(newRecent);
    try {
      localStorage.setItem("recentPokemonSearches", JSON.stringify(newRecent));
    } catch (e) { }
    setShowRecent(false);

    const params = new URLSearchParams(searchParams);
    params.set("pokemonName", valueToSearch);
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full gap-4 items-center">
      <div ref={containerRef} className="relative flex-1">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowRecent(true)}
          placeholder="SEARCH POKÉMON..."
          className="w-full px-4 py-[10px] border border-secondary rounded-badge bg-canvas text-hazard-white text-[15px] font-sans placeholder:text-secondary focus:outline-none focus:border-yellow transition-colors duration-150 relative z-10"
        />

        {/* Recent Searches Dropdown */}
        {showRecent && recentSearches.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate border border-image-frame rounded-badge shadow-2xl z-50 overflow-hidden">
            <div className="px-4 py-2 bg-image-frame/50 border-b border-image-frame flex justify-between items-center">
              <span className="font-mono text-[10px] text-secondary uppercase tracking-[1.5px]">Recent</span>
              <button
                type="button"
                onClick={() => {
                  setRecentSearches([]);
                  localStorage.removeItem("recentPokemonSearches");
                  setShowRecent(false);
                }}
                className="font-mono text-[10px] text-secondary hover:text-hazard-white uppercase tracking-[1px] focus:outline-none"
              >
                Clear
              </button>
            </div>
            <ul className="flex flex-col">
              {recentSearches.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchValue(term);
                      handleSearch(undefined, term);
                    }}
                    className="w-full text-left px-4 py-3 font-sans text-[15px] text-hazard-white hover:bg-yellow hover:text-absolute-black hover:font-bold transition-colors capitalize focus:outline-none focus:bg-yellow focus:text-absolute-black border-b border-image-frame last:border-0"
                  >
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="cursor-pointer px-[24px] py-[10px] bg-yellow text-absolute-black font-mono text-[12px] font-semibold uppercase tracking-[1.5px] rounded-feature hover:bg-white/20 hover:shadow-[0_0_0_1px_#c2c2c2] transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-yellow focus:border-yellow z-10"
      >
        Search
      </button>
    </form>
  );
}
