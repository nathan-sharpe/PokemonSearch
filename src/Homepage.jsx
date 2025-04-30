import { useState, useEffect } from 'react'

function Homepage() {

    const [pokemonName, setPokemonName] = useState("")
    const [pokemonSprite, setPokemonSprite] = useState()
    const [pokemonHP, setPokemonHP] = useState(0)
    const [pokemonAttack, setPokemonAttack] = useState(0)
    const [pokemonSpecialAttack, setPokemonSpecialAttack] = useState(0)
    const [pokemonDefense, setPokemonDefense] = useState(0)
    const [pokemonSpecialDefense, setPokemonSpecialDefense] = useState(0)
    const [pokemonSpeed, setPokemonSpeed] = useState(0)

    function updatePokemonName(event) {
        setPokemonName(event.target.value)
    }

    async function searchForPokemon() {
        const dataSource = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        const response = await fetch(dataSource)
        const data = await response.json()
        const sprite = data.sprites.front_default
        setPokemonSprite(sprite)
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
    }

    return (
        <>
            <h1>Pokemon Database</h1>
            <input type="text"  placeholder='Enter Pokemon name' onChange={updatePokemonName} value={pokemonName}/>
            <button onClick={searchForPokemon}>Search</button><br />
            <img src={pokemonSprite}  alt="Pokemon Sprite"/>
            <h2>Stat Distribution:</h2>
            <ul>
                <li>HP: {pokemonHP}</li>
                <li>Attack: {pokemonAttack}</li>
                <li>Defense: {pokemonDefense}</li>
                <li>Special Attack: {pokemonSpecialAttack}</li>
                <li>Special Defense: {pokemonSpecialDefense}</li>
                <li>Speed: {pokemonSpeed}</li>
            </ul>
        </>
    )
}

export default Homepage