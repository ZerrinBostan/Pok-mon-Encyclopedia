import React, { useEffect, useState, useCallback } from 'react';
import PokemonCard from '../components/PokemonCard';
import Button from '../components/Button';
import favoriteHandler, { getPokemons } from '../helpers/favoriteHandler';
import ReactLoading from 'react-loading';

const MyPokemons = () => {
  const [favoritePokemons, setFavouritePokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavoritePokemons = useCallback(async () => {
    const pokemons = await getPokemons();
    setFavouritePokemons(pokemons);
  }, []);

  const handleFavorites = async (pokemon) => {
    setLoading(true);
    favoriteHandler(pokemon);
    await getFavoritePokemons();
    setLoading(false);
  };

  const handleHistoryBack = () => {
    window.history.back();
  };

  useEffect(() => {
    getFavoritePokemons();
  }, [getFavoritePokemons]);


  return (
    <div className="my-pokemons container">
      <Button
        icon={{ name: 'arrow_back', size: 22, color: 'white' }}
        onClick={handleHistoryBack}
        className="arrow-button px-0"
      />
      <div className="row pokemon-cards">
        {favoritePokemons.map((pokemon) => {
          const favoriteMatch = favoritePokemons.some(
            (item) => item.id === pokemon.id
          );
          return (
            <div className="card col-12 col-md-4 col-lg-3 mb-5">
              {loading ? (
                <ReactLoading
                  type="spinningBubbles"
                  width={50}
                  height={50}
                  color="white"
                />
              ) : (
                <PokemonCard
                  name={pokemon.name}
                  imgSrc={pokemon.imageUrl}
                  favorite={favoriteMatch}
                  handleFavorites={() => handleFavorites(pokemon)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyPokemons;
