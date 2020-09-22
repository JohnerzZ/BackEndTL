import React from "react"
import MapComp from "./MapComp.js"
import SearchView from "./SearchView.js"

class Home extends React.Component{
    render(){
        return (
            <div className = "grid_container">
                    <SearchView/>
                    <MapComp/>
                  
            </div>
        )
    }
}

export default Home;