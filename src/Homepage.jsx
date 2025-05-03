import { useState, useEffect } from 'react'
import logo from "./assets/PokemonLogo.png"

function Homepage() {

    const [pokemonName, setPokemonName] = useState("")
    const [pokemonSprite, setPokemonSprite] = useState()
    const [pokemonHP, setPokemonHP] = useState(0)
    const [pokemonAttack, setPokemonAttack] = useState(0)
    const [pokemonSpecialAttack, setPokemonSpecialAttack] = useState(0)
    const [pokemonDefense, setPokemonDefense] = useState(0)
    const [pokemonSpecialDefense, setPokemonSpecialDefense] = useState(0)
    const [pokemonSpeed, setPokemonSpeed] = useState(0)
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemonMoves, setPokemonMoves] = useState([])
    const [pokedexNumber, setPokedexNumber] = useState()
    const [isApiCallSuccessful, setIsApiCallSuccessful] = useState(null)
    const [apiCalled, setApiCalled] = useState(false)

    function updatePokemonName(event) {
        setPokemonName(event.target.value)
    }

    async function searchForPokemon() {
        try {
            setApiCalled(true)
            const dataSource = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            const response = await fetch(dataSource)
            setIsApiCallSuccessful(true)
            const data = await response.json()
            const sprite = data.sprites.front_default
            setPokemonSprite(sprite)
            const dexNum = data.id
            setPokedexNumber(dexNum)
            const hp = data.stats[0].base_stat
            setPokemonHP(hp)
            const attack = data.stats[1].base_stat
            setPokemonAttack(attack)
            const defense = data.stats[2].base_stat
            setPokemonDefense(defense)
            const specialAttack = data.stats[3].base_stat
            setPokemonSpecialAttack(specialAttack)
            const specialDefense = data.stats[4].base_stat
            setPokemonSpecialDefense(specialDefense)
            const speed = data.stats[5].base_stat
            setPokemonSpeed(speed)
            const abilities = data.abilities
            setPokemonAbilities(abilities)
            const types = data.types
            setPokemonTypes(types)
            const moves = data.moves
            moves.sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at)
            setPokemonMoves(moves)
            console.log(data)
            console.log(abilities)
        }
        catch(error) {
            setIsApiCallSuccessful(false)
            console.error(error)
        }
    }

    if (isApiCallSuccessful == true && apiCalled == true) {
        return (
            <div>
            <div className='headerContainer'>
                    <img src={logo} className='headerImg' />
                    <p className='headerSearch'>Search</p>
                </div>
            <hr />
            <div className='searchContainer'>
                <input type="text"  placeholder='Enter Pokemon name' onChange={updatePokemonName} value={pokemonName} className='searchBar'/>
                <button onClick={searchForPokemon} className='searchButton'>Search!</button><br />
            </div>
            <p className='searchTip'>*For Pokemon with multi-word names and alternate forms please use a hyphen between each word. Eg. landorus-incarnate and great-tusk*</p>
            <div className='resultsContainer'>
                <h2>Pokemon Found!</h2>
                <img src={pokemonSprite}  alt="Pokemon Sprite" className='spriteImg'/><br />
                <h2>Pokedex Number: {pokedexNumber}</h2><br/>
                <h2>Types: </h2>
                <ul>
                        {
                            pokemonTypes.map((type) => {
                                return (
                                    <li key= {type.type['name']}>
                                        {type.type['name']}
                                    </li>
                                )
                            })
                        }
                </ul>
                <br />
                <h2>Stat Distribution:</h2>
                <ul>
                    <li>HP: {pokemonHP}</li>
                    <li>Attack: {pokemonAttack}</li>
                    <li>Defense: {pokemonDefense}</li>
                    <li>Special Attack: {pokemonSpecialAttack}</li>
                    <li>Special Defense: {pokemonSpecialDefense}</li>
                    <li>Speed: {pokemonSpeed}</li>
                </ul>
                <br />
                <h2>Abilities:</h2>
                <ol>
                {
                        pokemonAbilities.map((ability) => {
                            return (
                                <li key= {ability.ability['name']}>
                                    {ability.ability['name']}
                                    {ability['is_hidden'] ? " (Hidden ability)" : null}
                                </li>
                            )
                        })
                    }
                </ol><br />
                <h2>Learnset:</h2>
                <ol>
                    {
                        pokemonMoves.map((move) => {
                            return (
                                <li key= {move.move['name']}>
                                    Move: {move.move['name']},
                                    Learned at Level: {move.version_group_details[0].level_learned_at}
                                </li>
                            )
                        })
                    }
                </ol>
                </div>
            </div>
        )
    }
    else if (isApiCallSuccessful == false && apiCalled == true) {
        return (
            <>
                <div className='headerContainer'>
                    <img src={logo} className='headerImg' />
                    <p className='headerSearch'>Search</p>
                </div>
                <hr />
                <div className='searchContainer'>
                    <input type="text"  placeholder='Enter Pokemon name' onChange={updatePokemonName} value={pokemonName} className='searchBar'/>
                    <button onClick={searchForPokemon} className='searchButton'>Search!</button><br />
                </div>
                <p className='searchTip'>*For Pokemon with multi-word names and alternate forms please use a hyphen between each word. Eg. landorus-incarnate and great-tusk*</p>
                <h2 className='notFound'>Pokemon not found, please double check spelling.</h2>
            </>
        )
    }
    else {
        return (
            <>
                <div className='headerContainer'>
                    <img src={logo} className='headerImg' />
                    <p className='headerSearch'>Search</p>
                </div>
                <hr />
                <div className='searchContainer'>
                    <input type="text"  placeholder='Enter Pokemon name' onChange={updatePokemonName} value={pokemonName} className='searchBar'/>
                    <button onClick={searchForPokemon} className='searchButton'>Search!</button><br />
                </div>
                <p className='searchTip'>*For Pokemon with multi-word names and alternate forms please use a hyphen between each word. Eg. landorus-incarnate and great-tusk*</p>
            </>
        )
    }
}

export default Homepage