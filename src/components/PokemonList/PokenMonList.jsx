import { useEffect, useState } from "react"
import axios from "axios"
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon"
function PokeMonList( )  {

    // Use effect callBack will firstly execute when components will render for the First time 
    // If we wiil Not pass the dependencies array then Whenever the Components will render it will Execute the callback function 
    // When the varaibles in the Array will change then useEffect callBack will Execute 
    const [pokemonList ,setPokemonList] = useState([])
    const [isLoading ,setIsLoading] = useState(true )
    async function downloadPokemons ( )  {

        // Url of pokeapi 
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon") // fetched via axios   
        const pokemonResults = response.data.results // we will get the array of arrays from this result
        //  iterating over the array of pokemons and using their urls to create an array of promises  
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url)) 
        // Array of 20 pokemon detailed Data 
        const pokemonData =  await axios.all(pokemonResultPromise) // passing that promise array to axios.all
        
        // now iterate on the data on 
        const res = pokemonData.map((pokeData) =>  {
            const pokemon = pokeData.data 
            return {
                    id : pokemon.id ,
                    name :  pokemon.name , 
                    image: (pokemon.sprites.other) ?pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny , 
                    types : pokemon.types 
                }

        })
        setPokemonList(res) 
        setIsLoading(false)
    }
    useEffect(  ()=>{
        downloadPokemons()
    } ,[])
    
    return (
        <div className="pokemon-list-wrapper">
                <div className="pokemon-wrapper" >{ (isLoading ) ?  "Loading Data "  : 
                    pokemonList.map((pokemon) => <Pokemon  name={pokemon.name} image={pokemon.image} key={pokemon.id} /> )
                
                } </div>
                <div className="button-wrapper" >
                    <button>Prev</button>
                    <button>Next</button>
                </div>
            
        </div>
    )
}
export default PokeMonList