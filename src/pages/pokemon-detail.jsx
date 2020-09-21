import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetail } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';
import Icon from '../components/Icon';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import ReactLoading from 'react-loading';

const PokemonDetail = () => {
  const { name } = useParams();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchPokemonDetail = useCallback(async () => {
    setLoading(true);
    const response = await getPokemonDetail(name);
    setTimeout(() => {
      setData(response);
    setLoading(false);
    }, 500);
  }, [name]);

  useEffect(() => {
    fetchPokemonDetail();
  }, [fetchPokemonDetail]);

  const handleHistoryBack = () => {
    window.history.back();
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <Button
            icon={{ name: 'arrow_back', size: 22, color: '#7435e8' }}
            onClick={handleHistoryBack}
            className="arrow-button"
          />
          <span className="text-center card__title pt-0 w-100">
            {data?.name}
          </span>
        </div>
        <div className="row">
          <div className={`col-12 col-md-6 ${loading && "general-loading"}`}>
            {loading ? (
              <ReactLoading
                type="spinningBubbles"
                width={50}
                height={50}
                color="#7044E7"
              />
            ) : (
              <PokemonCard
                imgSrc={data?.sprites?.other?.dream_world?.front_default}
              />
            )}
          </div>
          <div className="col-12 col-md-6">
            <h5 class="text-center">Abilities</h5>
            {data?.abilities.map((item, index) => (
              <div className="jumbotron__abilities lead" key={index + 1}>
                <Icon icon="star-empty" size="22" color="#7435E8" />
                <span>{item.ability?.name}</span>
                <span className="badge badge-pill badge-dark text-white">
                  {item.slot}
                </span>
              </div>
            ))}
            <h5 className="text-center">Profile</h5>
            <div className="row lead text-center">
              <div className="col">{`Height: ${data?.height}`} </div>
              <div className="col"> {`Weight: ${data?.weight}`} </div>
            </div>
            <h5 className="text-center mt-2">Stats</h5>
            {data?.stats.map((item) => (
              <div className="row lead mb-1 pb-2">
                <div className="col">{item.stat.name}</div>
                <div className="col">
                  <ProgressBar value={item.base_stat} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PokemonDetail;
