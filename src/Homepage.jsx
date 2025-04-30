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
    const [pokemonAbility1, setPokemonAbility1] = useState("")
    const [pokemonAbility2, setPokemonAbility2] = useState("")
    const [pokemonType1, setPokemonType1] = useState("")
    const [pokemonType2, setPokemonType2] = useState("")

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
        const ability1 = data.abilities[0].ability.name
        setPokemonAbility1(ability1)
        const ability2 =  data.abilities[1].ability.name
        setPokemonAbility2(ability2)
        const type1 = data.types[0].type.name
        setPokemonType1(type1)
        const type2 = data.types[1].type.name
        setPokemonType2(type2)
        console.log(data)
    }

    return (
        <>
            <h1>Pokemon Search</h1>
            <input type="text"  placeholder='Enter Pokemon name' onChange={updatePokemonName} value={pokemonName}/>
            <button onClick={searchForPokemon}>Search</button><br />
            <img src={pokemonSprite}  alt="Pokemon Sprite"/><br />
            <h2>Types: </h2>
            <ul>
                <li>Type 1: {pokemonType1}</li>
                <li>Type 2: {pokemonType2}</li>
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
            <ul>
                <li>Ability 1: {pokemonAbility1}</li>
                <li>Ability 2: {pokemonAbility2}</li>
            </ul><br />
            <h2>Learnset:</h2>
            <ul>
                <li>Move: Learned at level: </li>
            </ul>
        </>
    )
}

export default Homepage