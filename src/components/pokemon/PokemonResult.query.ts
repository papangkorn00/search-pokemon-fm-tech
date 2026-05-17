import { gql } from "@apollo/client";

export const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      evolutionRequirements {
        amount
        name
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        image
        types
        classification
      }
    }
  }
`;
