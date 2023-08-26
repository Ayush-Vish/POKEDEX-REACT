import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./PokemonDetails.css"
function PokemonDetails () {
   
    const {id } = useParams() 
  
    const [pokemon ,setPokemon] = useState({})
    async function getPokemonDetails () {
        const response  = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data= await response.data 
        console.log(data)
        setPokemon({
            name : data.name, 
            image : data.sprites.other.dream_world.front_default ,
            weight : data.weight, 
            height:  data.height,
            types : data.types.map((t)=> t.type.name )
        })
       

    }
   
    useEffect(()=>{
        getPokemonDetails()
    },[])
    pokemon &&  pokemon.types ? pokemon.types.map((t) => console.log(t) ) : console.log("loading ... ")
    console.log(pokemon)
    return (
        <div className="pokemon-details-wrapper" >   
            <div className="pokemon-name"  >Name : <span> {pokemon.name}</span> </div>
            <img src={pokemon.image} alt="" /> 
            <div  className="pokemon-name" > Weight :   {pokemon.weight} </div>
            <div  className="pokemon-name" >  Height :  {pokemon.height} </div>
            <div className="pokemon-types" >
                 {
                    pokemon &&  pokemon.types ? pokemon.types.map((t) =>  <div key={t} > {t}</div>  ) : <div> Loading ...  </div>
                }
            </div>
        </div>
    )

}
export default PokemonDetails 