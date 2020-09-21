import axios from 'axios';

const http = axios.create({ 
    baseURL: 'https://pokeapi.co/api/v2/',

 });

export const getAllPokemon = async () => {
    const response = await http.get('pokemon');
    return response.data;
}

export const getPokemonDetail = async (name) => {
    const response = await http.get(`pokemon/${name}`);
    return response.data;
}