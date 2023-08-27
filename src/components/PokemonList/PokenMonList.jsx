import { useEffect, useState } from "react"
import axios from "axios"
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon"
const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"
function PokeMonList( )  {

    // Use effect callBack will firstly execute when components will render for the First time 
    // If we wiil Not pass the dependencies array then Whenever the Components will render it will Execute the callback function 
    // When the varaibles in the Array will change then useEffect callBack will Execute 
    // const [pokemonList ,setPokemonList] = useState([])
    // const [isLoading ,setIsLoading] = useState(true )

    // const [nextUrl , setNextUrl] = useState("")
    // const [prevUrl , setPrevUrl] = useState("")

    // const [pokedexUrl ,setPokedexUrl] = useState()

    // Making a object of useState 
    const [pokemonListState ,setPokemonListState] =useState({
        pokemonList :[], 
        isLoading : true , 
        nextUrl : "",
        prevUrl : "", 
        pokedexUrl :POKEDEX_URL

    })


    async function downloadPokemons ( )  {
        // setIsLoading(true)

        // Now we have to do like this 
        setPokemonListState(  (state)=>(  {
            ...pokemonListState,  
            isLoading : true 
        }))

        // Url of pokeapi 
        const response = await axios.get(pokemonListState.pokedexUrl) // fetched via axios  
        // response.data contains the urls of previous 20 and next 20 pokemons 
        setPokemonListState( (state)=>( {
            ...state, 
            nextUrl : response.data.next , 
            prevUrl : response.data.previous
        }))
        // setNextUrl(response.data.next)
        // setPrevUrl(response.data.previous)

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
        } )
        setPokemonListState ( (state) =>(  {
            ...state,
            pokemonList : res , 
            isLoading : false 

        }))


        // setPokemonList(res) 
        // setIsLoading(false)
    }
    useEffect(  ()=>{
        downloadPokemons()
    } ,[pokemonListState.pokedexUrl])
    
    return (
        <div className="pokemon-list-wrapper">
                <div className="pokemon-wrapper" >{ (pokemonListState.isLoading ) ?  "Loading Data "  : 
                    pokemonListState.pokemonList.map((pokemon) => <Pokemon  name={pokemon.name} image={pokemon.image} key={pokemon.id} id={pokemon.id} /> )
                } </div>
                <div className="button-wrapper" >
                    <button disabled={pokemonListState.prevUrl===null} onClick={()=> {
                        setPokemonListState({
                            ...pokemonListState,
                            pokedexUrl : pokemonListState.prevUrl
                        })
                    } } >Prev</button>
                    <button  disabled={pokemonListState.nextUrl === null}
                        onClick={()=> {
                            setPokemonListState({
                                ...pokemonListState,
                                pokedexUrl : pokemonListState.nextUrl
                            })
                        } } 
                    >Next</button>
                </div>
            
        </div>
    )
}
export default PokeMonList