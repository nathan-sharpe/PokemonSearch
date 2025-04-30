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
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemonMoves, setPokemonMoves] = useState([])

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
        const abilities = data.abilities
        setPokemonAbilities(abilities)
        const types = data.types
        setPokemonTypes(types)
        const moves = data.moves
        setPokemonMoves(moves)
        console.log(data)
    }

    return (
        <>
            <h1>Pokemon Search</h1>
            <input type="text"  placeholder='Enter Pokemon name' onChange={updatePokemonName} value={pokemonName}/>
            <button onClick={searchForPokemon}>Search</button><br />
            <p>*For Pokemon with multi-word names use a hypen between each word*</p>
            <img src={pokemonSprite}  alt="Pokemon Sprite"/><br />
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
        </>
    )
}

export default Homepage