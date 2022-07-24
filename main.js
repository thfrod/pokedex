const urlPokemon = pokemon_id => `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;
const generatePokemonPromise = () => Array(150).fill().map((_, index) => fetch(urlPokemon(index + 1)).then(response => { return response.json() }));

const getPokemon = () => {
    const pokemonPromisses = generatePokemonPromise();
    Promise.all(pokemonPromisses).then(pokemons => {

        return pokemons.reduce((acummulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            acummulator +=
                `
                <li class="pokemon-card ${types[0]}">
                    <span class="pokemon-id">#${pokemon.id}</span>
                    <h2 class="card-title">${pokemon.name}</h2>
                    <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Imagem frontal do pokemon ${pokemon.name}"/>
                    <p class="card-subtitle">${types.join(' | ')}</p>
                </li>
            `;
            return acummulator;
        }, '')

    }).then(pokemons =>{
        const ul = document.querySelector('[data-js="pokedex"]');
        ul.innerHTML = pokemons
        
    })
}
getPokemon();
