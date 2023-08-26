import PokeMonList from "../PokemonList/PokenMonList"
import Search from "../Search/Search"
import "./Pokedex.css"
function Pokedex () {
    return (
        <div className="pokedex-wrapper" >
            
            <Search/>
            <PokeMonList/>
        
        </div>
    )
}

export default Pokedex 