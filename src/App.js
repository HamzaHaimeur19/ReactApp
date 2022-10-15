import React from 'react';
import { useEffect } from 'react';
import MovieCard from './MovieCard';
import { useState } from 'react';
import './App.css';
import SearchIcon from './search.svg'; // importing search icon in svg format

// [] in useEffect hook DEPENDACY ARRAY IF WE WANT TO CALL IT FROM THE START 
// async function = takes some time to fetch a data used in searching
// const response = await fetch (`${API_URL}&s=${title}`); = response to fetch data by title on search from user
//searchMovies function allow us to search movies
//<img src = {movie1.Poster !== 'N/A' ? movie1.Poster : 'https://via.placeholder.com/400'} /> = check if the json data have the image or not
//onChange={(e) => setSearchTem(e.target.value ) = if the value of search of input is changed
//onClick={() => searchMovies(searchTerm)} /> = if we click on the searc icon we gett he result
//Search = search by string from the API used
//API key 66252fcb
const API_URL = 'https://www.omdbapi.com?apikey=66252fcb';

const App = () => {
    const [movies, setMovies] = useState([]); // for looping movies
    const [searchTerm, setSearchTem] = useState([]); // for searching movie

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('spiderman');
    }, [])

    return (
        <div className="app">
            <h1>HamzaMovies</h1>

            <div className="search">
                <input placeholder=" Chercher votre film" value={searchTerm} onChange={(e) => setSearchTem(e.target.value)}></input>
                <img src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} />
            </div>
            {
                movies?.length > 0 ? ( // if the movies are found render them
                    <div className="container">
                        {movies.map((movie) => ( //fetch props data from moviecard container or loop using map
                            <MovieCard movie={movie} />
                        ))}
                    </div>

                ) : ( // if not return a no movies found message
                    <div className="empty">
                        <h1>aucun film</h1>
                    </div>
                )
            }
        </div>
    );
}

export default App;