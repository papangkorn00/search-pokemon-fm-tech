export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface PokemonEvolutionRequirement {
  amount: number;
  name: string;
}

export interface PokemonAttack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonAttacks {
  fast: PokemonAttack[];
  special: PokemonAttack[];
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight?: PokemonDimension;
  height?: PokemonDimension;
  classification?: string;
  types: string[];
  resistant?: string[];
  weaknesses?: string[];
  fleeRate?: number;
  maxCP?: number;
  evolutionRequirements?: PokemonEvolutionRequirement;
  maxHP?: number;
  image: string;
  attacks?: PokemonAttacks;
  evolutions?: Pokemon[];
}

export interface PokemonData {
  pokemon: Pokemon | null;
}

export interface PokemonsData {
  pokemons: Pokemon[];
}
