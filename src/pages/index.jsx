import React, { useState, useCallback, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import SearchContent from '../components/Search';
import { Link } from 'react-router-dom';
import { getAllPokemon, getPokemonDetail } from '../services/pokemonService';
import favoriteHandler, { getPokemons } from '../helpers/favoriteHandler';
import ReactLoading from 'react-loading';

const Home = () => {
  const [favoritePokemons, setFavouritePokemons] = useState();
  const [pokemonData, setPokemonData] = useState();
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchTerm) => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = pokemonData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemonList(filteredData);
      setLoading(false);
    }, 1000);
  };

  const fetchPokemon = useCallback(async () => {
    const { results } = await getAllPokemon();
    const promises = results.map(async (item) => {
      const response = await getPokemonDetail(item.name);
      const { id, sprites } = response;
      return new Promise((resolve) => {
        resolve({
          id,
          name: item.name,
          imageUrl: sprites?.other?.dream_world?.front_default,
        });
      });
    });

    const response = await Promise.all(promises);
    setPokemonData(response);
  }, []);

  const getFavoritePokemons = useCallback(async () => {
    const pokemons = await getPokemons();
    setFavouritePokemons(pokemons);
  }, []);

  const handleFavorites = async (pokemon) => {
    favoriteHandler(pokemon);
    await getFavoritePokemons();
  };

  const pokemonList =
    filteredPokemonList.length > 0 ? filteredPokemonList : pokemonData;

  useEffect(() => {
    fetchPokemon();
    getFavoritePokemons();
  }, [fetchPokemon, getFavoritePokemons]);

  return (
    <>
      <div className="pokemon-header">
        <div className="pokemon-header-wrapper">
          <span className="pokemon-header__title">POKEDOX</span>
          <Link to="my-pokemons">
            <span className="pokemon-header__title text-light">
              My Pokémons
            </span>
          </Link>
        </div>
        <SearchContent handleSearch={handleSearch} />
      </div>
      <div className="row pokemon-container">
        <div className="col-12">
          <div className="pokemon-cards row">
            {loading ? (
              <ReactLoading
                type="spinningBubbles"
                width={50}
                height={50}
                color="white"
              />
            ) : (
              pokemonList?.map((pokemon) => {
                const favoriteMatch = favoritePokemons?.some(
                  (item) => item.id === pokemon.id
                );
                const { name, imageUrl } = pokemon;
                return (
                  <div
                    className="col-12 col-md-4 col-lg-3 mb-5"
                    key={name}
                  >
                    <div className="card">
                      <PokemonCard
                        name={name}
                        imgSrc={imageUrl}
                        pokemon={pokemon}
                        handleFavorites={handleFavorites}
                        favorite={favoriteMatch}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
