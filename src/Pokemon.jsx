import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadMore,setLoadMore]=useState(null)
  

//   useEffect(() => {
//     axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
//       .then((result) => {
//         setPokemonList(result.data.results);
//       })
//   }, []);


useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const results = response.data.results;
      setLoadMore(response.data.next);

     
          const detail = [];
    
          for (const pokemon of results) {
            const pokemonDetail = await axios.get(pokemon.url);
            detail.push(pokemonDetail.data);
          }

      setPokemonList(detail);
    };

    fetchData();
  }, []);

  
    const loadMorePokemons = async () => {
      if (loadMore) {
        const response = await axios.get(loadMore);
        const newResults = response.data.results;
        setLoadMore(response.data.next);
    
        let newDetail = [];
    
        for (const pokemon of newResults) {
          const pokemonDetail = await axios.get(pokemon.url);
          newDetail.push(pokemonDetail.data);
        }
    
        setPokemonList((prevList) => [...prevList, ...newDetail]);
}
};



  return (
    <>
      <div className='container'>
      <h1>POKEMONS</h1>
        <div>
          <div className="product-list">
            {
              pokemonList.map((pokemon, index) => {
                const pokemonIndex = index + 1;
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

               


                return (
                  <div className='product' key={index}>
                     <p>#{pokemonIndex}</p>
                    <img src={imageUrl} alt={pokemon.name} />
                    <h2>{pokemon.name}</h2>
                 
                    
                     <button className='know-more'>Know more</button>

                  </div>
                );
              })
            }
          </div>
        </div>
        <button className='more-pokemon' onClick={loadMorePokemons}>More Pokemons</button>
      </div>
    </>
  );
}

export default Pokemon;

