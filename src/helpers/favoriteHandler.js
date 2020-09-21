const favoriteHandler = (pokemon) => {
  let mypokemons = JSON.parse(localStorage.getItem('mypokemons'));

  if (!mypokemons) {
    localStorage.setItem('mypokemons', JSON.stringify([pokemon]));
    return;
  }

  const hasPokemon = mypokemons?.some((item) => item.id === pokemon.id);
  if (hasPokemon) {
    const filteredPokemons = mypokemons.filter(
      (item) => item.id !== pokemon.id
    );
    localStorage.setItem('mypokemons', JSON.stringify(filteredPokemons));
    return;
  }

  mypokemons.push(pokemon);
  localStorage.setItem('mypokemons', JSON.stringify(mypokemons));

  return;
};

export const getPokemons = () => {
  return new Promise((resolve) => {
    const pokemons = JSON.parse(localStorage.getItem('mypokemons'));
    resolve(pokemons);
  });
};

export default favoriteHandler;
