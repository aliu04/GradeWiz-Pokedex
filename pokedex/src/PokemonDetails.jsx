import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function PokemonDetails() {
  let navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [showMoves, setShowMoves] = useState(false);
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');

  function handleBack() {
    navigate('/');
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('http error');
        }
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
        return fetch(data.species.url);
      })
      .then(response => response.json())
      .then(speciesData => {
        const englishFlavorText = speciesData.flavor_text_entries.find(flavorText => flavorText.language.name === 'en');
        setDescription(englishFlavorText ? englishFlavorText.flavor_text : 'No description available.');
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch error:', error);
        setLoading(false);

      })

  }, [name]);
  if (loading) {
    return <div>Loading...</div>;
  }

  let displayedMoves;
  if (showMoves) {
    displayedMoves = pokemon.moves; // Show all moves if showAllMoves is true
  } else {
    displayedMoves = pokemon.moves.slice(0, 5); // Otherwise, show only the first five moves
  }

  let movesText;
  if (showMoves) {
    movesText = 'Show Less';
  } else {
    movesText = 'Show More';
  }

  return (
    <>
      <h1>{pokemon.name}</h1>
      <button
        onClick={() => handleBack()}
        type="button" >
        Back
      </button>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{description}</p>
      <h2>Stats</h2>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map(ability => (
          <li key={ability.ability.name}>
            {ability.ability.name}
          </li>
        ))}
      </ul>
      <h2>Moves</h2>
      <ul>
        {displayedMoves.map(move => (
          <li key={move.move.name}>
            {move.move.name}
          </li>
        ))}
      </ul>
      {pokemon.moves.length > 5 && (
        <button onClick={() => setShowMoves(!showMoves)}>
          {movesText}
        </button>
      )}
      <h2>Forms</h2>
      <ul>
        {pokemon.forms.map(form => (
          <li key={form.name}>
            {form.name}
          </li>
        ))}
      </ul>
      <h2>Types</h2>
      <ul>
        {pokemon.types.map(type => (
          <li key={type.type.name}>
            {type.type.name}
          </li>
        ))}
      </ul>
    </>
  );
}