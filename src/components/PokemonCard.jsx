import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';

const PokemonCard = ({
  handleFavorites,
  favorite,
  pokemon,
  name = '',
  imgSrc = '',
}) => {
  const isFavoriteColor = favorite ?  '#E85382' : '#AAB8C2';
  return (
    <>
      <div className="col-12 card__title text-center">
        <Button
          onClick={() => handleFavorites(pokemon)}
          icon={{ name: 'favorite', size: 35, color: isFavoriteColor }}
          text={name}
          className="card-button"
        />
      </div>
      <div className="card__body col-12 align-self-center">
        <img src={imgSrc} className="card-img-top" alt="pokemon" />
        {name && (
          <Link to={`pokemon-detail/${name}`}>
            <Button className="btn-detail" text=" Goto detail" />
          </Link>
        )}
      </div>
    </>
  );
};
PokemonCard.defaultProps = {
  name: '',
};

PokemonCard.prototype = {
  name: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  handleFavorites: PropTypes.func.isRequired,
  pokemon: PropTypes.shape({}).isRequired,
};

export default PokemonCard;
