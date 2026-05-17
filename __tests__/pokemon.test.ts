import { Pokemon } from '../src/types';

const mockBulbasaur: Partial<Pokemon> = {
  id: 'UG9rZW1vbjox',
  number: '001',
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
  image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg'
};

const mockCharmander: Partial<Pokemon> = {
  id: 'UG9rZW1vbjo0',
  number: '004',
  name: 'Charmander',
  types: ['Fire'],
  image: 'https://img.pokemondb.net/artwork/charmander.jpg'
};

const mockSquirtle: Partial<Pokemon> = {
  id: 'UG9rZW1vbjo3',
  number: '007',
  name: 'Squirtle',
  types: ['Water'],
  image: 'https://img.pokemondb.net/artwork/squirtle.jpg'
};

describe('Pokemon Type Tests', () => {
  it('Bulbasaur should have Grass type', () => {
    expect(mockBulbasaur.types).toContain('Grass');
  });

  it('Charmander should have Fire type', () => {
    expect(mockCharmander.types).toContain('Fire');
  });

  it('Squirtle should have Water type', () => {
    expect(mockSquirtle.types).toContain('Water');
  });
});
