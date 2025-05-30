import { useState } from 'react'
import Header from './Header.jsx'

function Homepage() {

    const [pokemonName, setPokemonName] = useState("")
    const [pokedexName, setPokedexName] = useState("")
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
    const [isLoading, setIsLoading] = useState(false)

    function updatePokemonName(event) {
        setPokemonName(event.target.value)
    }

    async function fetchData(identifier) {
        try {
            setIsLoading(true)
            setApiCalled(true)
            const dataSource = `https://pokeapi.co/api/v2/pokemon/${identifier}`
            const response = await fetch(dataSource)
            const data = await response.json()
            setIsApiCallSuccessful(true)
            setPokemonSprite(data.sprites.front_default)
            setPokedexName(data.name)
            setPokedexNumber(data.id)
            setPokemonHP(data.stats[0].base_stat)
            setPokemonAttack(data.stats[1].base_stat)
            setPokemonDefense(data.stats[2].base_stat)
            setPokemonSpecialAttack(data.stats[3].base_stat)
            setPokemonSpecialDefense(data.stats[4].base_stat)
            setPokemonSpeed(data.stats[5].base_stat)
            setPokemonAbilities(data.abilities)
            setPokemonTypes(data.types)
            const moves = data.moves
            moves.sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at)
            setPokemonMoves(moves)
            console.log(data)
        }

        catch(error) {
            setIsApiCallSuccessful(false)
            console.error(error)
        }

        finally {
            setIsLoading(false)
        }
    }

    async function searchForPokemon() {
        await fetchData(pokemonName.toLowerCase())
    }

    async function handleNext() {
        if (pokedexNumber && pokedexNumber < 1025) {
            await fetchData(pokedexNumber + 1)
            setPokemonName("")
        }
    }

    async function handlePrevious() {
        if (pokedexNumber && pokedexNumber > 1) {
            await fetchData(pokedexNumber - 1)
            setPokemonName("")
        }
    }

    if (isApiCallSuccessful == true && apiCalled == true) {
        return (
            <div>
                <Header
                    pokemonName={pokemonName}
                    updatePokemonName={updatePokemonName}
                    searchForPokemon={searchForPokemon}
                    isLoading={isLoading}
                />
                <div className='resultsContainer'>
                    <h2>Pokemon Found!</h2>
                    <div className="navButtonContainer">
                        <button className="navButton" onClick={handlePrevious} disabled={isLoading}>Previous Pokemon</button>
                        <button className="navButton" onClick={handleNext} disabled={isLoading}>Next Pokemon</button>
                    </div>
                    <br />
                    <h2>Pokemon Name: {pokedexName.charAt(0).toUpperCase() + pokedexName.slice(1)}</h2>
                    <img src={pokemonSprite}  alt="Pokemon Sprite" className='spriteImg'/><br />
                    <h2>Pokedex Number: {pokedexNumber}</h2><br/>
                    <h2>Types: </h2>
                    <ul>
                            {
                                pokemonTypes.map((type) => {
                                    return (
                                        <li key= {type.type.name}>
                                            {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
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
                                    <li key= {ability.ability.name}>
                                        {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                                        {ability.is_hidden ? " (Hidden ability)" : null}
                                    </li>
                                )
                            })
                        }
                    </ol><br />
                    <h2>Moves Learned:</h2>
                    <ol>
                        {
                            pokemonMoves.map((move) => {
                                return (
                                    <li key= {move.move.name}>
                                        Move: {move.move.name.charAt(0).toUpperCase() +move.move.name.slice(1)},
                                        {move.version_group_details[0].move_learn_method.name == "machine" ? " Learned by machine" : null}
                                        {move.version_group_details[0].move_learn_method.name == "tutor" ? " Learned by move tutor" : null}
                                        {move.version_group_details[0].move_learn_method.name == "egg" ? " Egg move" : null}
                                        {move.version_group_details[0].move_learn_method.name == "level-up" ? ` Learned at level ${move.version_group_details[0].level_learned_at}` : null}
                                    </li>
                                )
                            })
                        }
                    </ol>
                    <br />
                    </div>
            </div>
        )
    }
    else if (isApiCallSuccessful == false && apiCalled == true) {
        return (
            <>
                <Header
                    pokemonName={pokemonName}
                    updatePokemonName={updatePokemonName}
                    searchForPokemon={searchForPokemon}
                    isLoading={isLoading}
                />
                <h2 className='notFound'>Pokemon not found, please double check spelling.</h2>
            </>
        )
    }
    else {
        return (
            <>
                <Header
                    pokemonName={pokemonName}
                    updatePokemonName={updatePokemonName}
                    searchForPokemon={searchForPokemon}
                    isLoading={isLoading}
                />
            </>
        )
    }
}

export default Homepage