import React, { Component } from 'react';
import { withRouter } from "react-router";
import qs from 'query-string';
import "./forms.css"
/*
var countries     = ['Greece', 'Spain', 'Hungary', 'United Kingdom', 'Ireland', 'Sweden'],
            MakeItem = function(X) {
                return <option>{X}</option>;
        };
var arrayOptions     = ['ActualDataLoad', 'DayAheadForecast', 'AggregateProductionByType'],
        MakeItem = function(X) {
            return <option>{X}</option>;
    };

    var resolutions     = ['15', '30', '60'],
        MakeItem = function(X) {
            return <option>{X}</option>;
    };
    */

const MakeItem = function(X) {
    return <option>{X}</option>;
};


class Text extends Component{    
    render(){
        return(
            <React.Fragment>
                <label>{this.props.label}</label>
                <input type="text" className="form-control" required = "required" placeholder={this.props.placeholder} name = {this.props.name}/>
            </React.Fragment>
        )}
}


class Select extends Component{    

    render(){

        return(
            <div className="input-grp">
            <label>{this.props.label}</label>
            <select className="custom-select" name ={this.props.name}>
                {this.props.options.map(MakeItem)}
            </select>
        </div>
        )}
}



class SearchView extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log(event)
        event.preventDefault()
        var form = event.target.elements
        var production
        if (form.type.value.length === 0){
            production = "AllTypes"
        } else{
            production = form.type.value
        }

        var query = { 
            country: form.country.value, 
            date : form.date.value,
            table : form.table.value,
            resolution : form.resolution.value,
            presentation : form.check.value,
            productionType: production,
            dmy: ""
        }

        var errorMsg = ""
        const len = query.date.length
        if(len === 4){
            // YYYY correct
            query.dmy = "year"
        }else if(len === 7){
            query.dmy = "month"
        }
        else if(len === 10){
            query.dmy = "date"
        }else {
            errorMsg = "Wrong Date format!"
            alert(errorMsg)
            return
        }

        const searchString = qs.stringify(query);
        this.props.history.push({
            pathname: '/res',
            search: searchString
          })



        console.log(`Country = ${query.country}  || Date = ${query.date}  ||    Table = ${query.table}  ||  
        Resolution = ${query.resolution}  ||  Presentation = ${query.presention}
        `)

    }




    handleSelect(event){
        console.log(event)
    }


    render(){
        return (
            
        <div className="booking-form-box">
        <form className="booking-form" onSubmit = {this.handleSubmit}>

        <Text label = "Country" placeholder="Select country" name = "country"/>
        
        <Text label = "Year/Month/Day" placeholder="YYYY-MM-DD" name = "date"/>
        
        <Select label = "Resolution" name = "resolution" options = {["15", "30", "60"]}/>
      
        <Select label = "Table" name = "table" options = {["ActualTotalLoad", "DayAheadTotalLoadForecast", "AggregatedGenerationPerType"]}/>
          
        <label>Production Type (Optional)</label>
        <input type="text" className="form-control"  placeholder="Production Type"  name ="type"/>

        <div className="radio-btn">
        <input type="radio" className="btn" name="check" value = "Table" checked onChange = {() => {}}/><span>Table</span>
        <input type="radio" className="btn" name="check" value = "Graph"/><span>Graph</span>
        
        </div>

        <div className="input-grp">
                <button type="submit" className="btn btn-primary flight">Show Results</button>
            </div>

            
        </form>
        </div>
        )
    }
}

export default withRouter(SearchView);
