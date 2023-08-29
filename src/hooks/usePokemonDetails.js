import axios from "axios"
import { useEffect, useState } from "react"
import usePokemonList from "./usePokemonList"

function usePokemonDetails( id  ){ 

    const [pokemon ,setPokemon] = useState({})


    async function getPokemonDetails () {
        const response  = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data.types[0])
        const pokemonsOfSameType=   axios.get(`https://pokeapi.co/api/v2/type/${response?.data?.types[0]?.type.name}`)

        const data= await response.data 
        setPokemon( state => ( {
            ...state,
            name : data.name, 
            image : data.sprites.other.dream_world.front_default ,
            weight : data.weight, 
            height:  data.height,
            types : data.types.map((t)=> t.type.name ),
           
        }))
        pokemonsOfSameType.then((response) => {
            setPokemon(state  => ({
                ...state ,
                similarPokemons: response.data.pokemon
            }))
        })
        setPokemonListState({...pokemonListState, type: data.types ?data.types[0].type.name : ""   })
    }
    const {pokemonListState ,setPokemonListState} = usePokemonList(  )
    useEffect(()=>{
        getPokemonDetails()
        console.log("List =>" , pokemonListState)
    },[ ])
    return [pokemon]
}



export default usePokemonDetails 