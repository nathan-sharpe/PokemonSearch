import React from 'react';
import logo from "./assets/PokemonLogo.png"
import { useTheme } from "./ThemeContext"

function Header(props) {
    const {theme, toggleTheme} = useTheme()

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            props.searchForPokemon()
        }
    }

    return(
        <>
            <div className='headerContainer'>
                <img src={logo} className='headerImg' />
                <p className='headerSearch'>Search</p>
                <button onClick={toggleTheme} className="themeToggleButton">Activate {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
            </div>
            <hr />
            <div className='searchContainer'>
                <input
                    type="text"
                    placeholder="Enter a Pokemon's name or Pokedex number"
                    onChange={props.updatePokemonName}
                    value={props.pokemonName}
                    className='searchBar'
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={props.searchForPokemon}
                    className='searchButton'
                    disabled={props.isLoading}
                >
                    {props.isLoading ? "Loading..." : "Search!"}
                </button><br />
            </div>
            <p className='searchTip'>*For Pokemon with multi-word names and alternate forms please use a hyphen between each word. Eg. landorus-incarnate and great-tusk*</p>
        </>
    )
}

export default Header