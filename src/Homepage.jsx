import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

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

            // Concurrent API call for ability descriptions
            const abilitiesWithDescriptions = await Promise.all(
                data.abilities.map(async (abilityData) => {
                    const abilityResponse = await fetch(abilityData.ability.url)
                    const abilityDetails = await abilityResponse.json()
                    const englishDescription = abilityDetails.effect_entries.find(
                        (entry) => entry.language.name === 'en'
                    )
                    return {
                        ...abilityData,
                        description: englishDescription ? englishDescription.short_effect : 'No description available.',
                    }
                })
            )
            setPokemonAbilities(abilitiesWithDescriptions)

            setPokemonTypes(data.types)

            // Concurrent API call to fetch additional information on moves
            const movesWithDetails = await Promise.all(
                data.moves.map(async (moveData) => {
                    const moveResponse = await fetch(moveData.move.url)
                    const moveDetails = await moveResponse.json()

                    const damageClassEnglish = moveDetails.damage_class?.name || 'N/A';

                    const moveTypeEnglish = moveDetails.type?.name?.charAt(0).toUpperCase() + moveDetails.type?.name?.slice(1) || 'N/A'


                    return {
                        ...moveData,
                        power: moveDetails.power || '-', // Power can be null for status moves
                        accuracy: moveDetails.accuracy || '-', // Accuracy can be null for status moves
                        damageType: damageClassEnglish,
                        type: moveTypeEnglish,
                    }
                })
            )

            movesWithDetails.sort((a, b) => {
                const levelA = a.version_group_details[0]?.level_learned_at ?? 0;
                const levelB = b.version_group_details[0]?.level_learned_at ?? 0;
                return levelA - levelB;
            });
            setPokemonMoves(movesWithDetails)

            console.log(data)
            console.log(movesWithDetails)
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

       return (
        <>
            <Header
                pokemonName={pokemonName}
                updatePokemonName={updatePokemonName}
                searchForPokemon={searchForPokemon}
                isLoading={isLoading}
            />

            <div className="mainContentArea">
                {isApiCallSuccessful === true && apiCalled === true ? (
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
                                            {ability.description && `: ${ability.description}`}
                                        </li>
                                    )
                                })
                            }
                        </ol><br />
                        <h2>Moves Learned:</h2>
                        <div className="movesTableContainer">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Learn Method</th>
                                        <th>Type</th>
                                        <th>Power</th>
                                        <th>Accuracy</th>
                                        <th>Damage Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pokemonMoves.map((move) => {
                                            const learnMethod = move.version_group_details[0]?.move_learn_method?.name;
                                            let displayLearnMethod = "";
                                            if (learnMethod === "machine") {
                                                displayLearnMethod = "Machine";
                                            } else if (learnMethod === "tutor") {
                                                displayLearnMethod = "Move Tutor";
                                            } else if (learnMethod === "egg") {
                                                displayLearnMethod = "Egg Move";
                                            } else if (learnMethod === "level-up") {
                                                displayLearnMethod = `Level ${move.version_group_details[0]?.level_learned_at}`;
                                            } else {
                                                displayLearnMethod = learnMethod || 'N/A';
                                            }

                                            return (
                                                <tr key={move.move.name}>
                                                    <td>{move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)}</td>
                                                    <td>{displayLearnMethod}</td>
                                                    <td>{move.type}</td>
                                                    <td>{move.power}</td>
                                                    <td>{move.accuracy}</td>
                                                    <td>{move.damageType.charAt(0).toUpperCase() + move.damageType.slice(1)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <br />
                    </div>
                ) : isApiCallSuccessful === false && apiCalled === true ? (
                    <h2 className='notFound'>Pokemon not found, please double check spelling.</h2>
                ) : (
                    <p className='initialPrompt'>Enter a Pokemon's name or Pokedex number to get started!</p>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Homepage