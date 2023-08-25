
import "./Pokemon.css"

function Pokemon (  {name ,image } )  {

    return (
        <div className="pokemon-wrapper-card" >
            <div className="pokemon-name" >{name}</div>
            <div><img src={image} alt="" /></div>
        </div>
        
    )

}

export default Pokemon 