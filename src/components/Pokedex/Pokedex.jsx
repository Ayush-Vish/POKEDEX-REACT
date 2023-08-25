import PokeMonList from "../PokemonList/PokenMonList"
import Search from "../Search/Search"
import "./Pokedex.css"
function Pokedex () {
    return (
        <div className="pokedex-wrapper" >
            <h1 id="pokedex-hadding" >Pokedex</h1>
            <Search/>
            <PokeMonList/>
        
        </div>
    )
}

export default Pokedex 