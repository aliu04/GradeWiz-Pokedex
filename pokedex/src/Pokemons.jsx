import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Pokemons() {
  let navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, isLoading } = useKindeAuth()

  function handleClick() {
    navigate('/login');
  }
  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        if (!response.ok) {
          throw new Error('http error');
        }
        return response.json();
      })
      .then((data) => {
        setPokemons(data.results);
        setFiltered(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch error:', error);
      })

  }, []);
  useEffect(() => {
    const filteredPokes = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()));
    setFiltered(filteredPokes);
  }, [searchPokemon, pokemons]);
  if (loading || isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a Pokemon"
          value={searchPokemon}
          onChange={(e) => setSearchPokemon(e.target.value)}
        />

      </div>
      <h1>All Pokemon List</h1>
      <ul className='poke-list'>
        {filtered.map(pokemon => (
          <li key={pokemon.name} className='poke-list-elt'>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => logout()}
        type="button" >
        Log out
      </button>
      <button
        onClick={() => handleClick()}
        type="button" >
        Account Information
      </button>


    </div>
  );
}

