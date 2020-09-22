import React, { Component } from 'react';
import "./Home.css"
import qs from 'query-string'
import { Table } from "react-bootstrap"
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Graph extends Component {	
    render(props) {
      const options = {
        title: {
          text: this.props.title
        },
        data: [{				
                  type: "column",
                  dataPoints: this.props.data
         }]
     }
          
     return (
        <div className="box-about">
          <CanvasJSChart options = {options}
              /* onRef = {ref => this.chart = ref} */
          />
        </div>
      );
    }
  }

class Results extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          options: {},
          results: [],
          type: [],
          title: ""
        }
        
        this.renderTableData.bind(this)
      }

    
    componentDidMount(){
        const params = qs.parse(this.props.location.search)
        console.log(params)
        var query

        if(params.table === "AggregatedGenerationPerType"){
            query = `http://localhost:8765/energy/api/${params.table}/${params.country}/${params.productionType}/PT${params.resolution}M/${params.dmy}/${params.date}`
        }else{

            
            query = `http://localhost:8765/energy/api/${params.table}/${params.country}/PT${params.resolution}M/${params.dmy}/${params.date}`
        }

        // Perform an AjAX Call

        console.log(query)

        fetch(query,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'X-OBSERVATORY-AUTH': localStorage.token,
            }
        }).then((response) => response.json())
        .then(json => {   

            
            
            var returnedValues = []
            var type = []
            var title
            if(params.table === "ActualTotalLoad"){
                for (var i in json.result){
                    const obj = {
                        label: json.result[i].DateTimeUTC,
                        y: json.result[i].ActualTotalLoadValue
                    }
                    returnedValues.push(obj)
                    type.push("")
                }
                title = `Actual Total Load for ${params.country}`
            }else if (params.table === "DayAheadTotalLoadForecast"){
                    
                if(params.dmy === "date"){
                    for (var i in json.result){
                        const obj = {
                            label: i,
                            y: json.result[i].DayAheadTotalLoadForecastByDayValue
                        }
                        returnedValues.push(obj)
                        type.push("")
                    }
                    title = `Day Ahead Forecast for ${params.country}`
                }else{

                for (var i in json.result){
                    const obj = {
                        label: i,
                        y: json.result[i].DayAheadTotalLoadForecastByMonthValue
                    }
                    returnedValues.push(obj)
                    type.push("")
                }
                title = `Day Ahead Forecast for ${params.country}`
                }
            }else{
                for (var i in json.result){
                    const obj = {
                        label: json.result[i].DateTimeUTC,
                        y: json.result[i].ActualGenerationOutputValue
                    }
                    returnedValues.push(obj)
                    type.push(json.result[i].ProductionType)
                }
                title = `Generation for ${params.productionType} for ${params.country}`
            }
                
            this.setState({results: returnedValues })
            this.setState({options: params })
            this.setState({type: type})
            this.setState({title: title})
        });
    }

    renderTableData() {
        return this.state.results.map((elem, index) => {
           var {label, y} = elem //destructuring
           if(this.state.options.productionType === "AllTypes" && this.state.options.table === "AggregatedGenerationPerType"){
               y = y + "    ("+this.state.type[index]+")"
           }
           return (
              <tr>
                  <td>{label}</td>
                  <td>{y}</td>
              </tr>
           )
        })
     }


    render(){
        
        
        if(this.state.results.length === 0){
            return (
                <div className="box-about">
                    <h1>Something went wrong :(</h1>
                </div>    
                )
        } else if(this.state.options.presentation === 'Table'){return (
        <div className="box-about">
            <h1>{this.state.title}</h1>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Timestamp</th>
                <th>Total Load</th>
                </tr>
            </thead>
            <tbody>
                {this.renderTableData()}
            </tbody>
            </Table>
        </div>
        )}else{
            return(
                <Graph title = {this.state.title} data= {this.state.results} />
            )
        }
    }
}

export default Results;