import React, { Component } from 'react'
import './App.css'

export default class Weather extends Component {
    constructor() {
        super()
        this.state={
            city:undefined,
            country: undefined,
            temp:0,
            temp_max:0,
            temp_min:0,
            icon: undefined,
            description: undefined
        }
        this.getWeather()
    }

    getWeather = async() =>{
        const api = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=5a9f3d77f65a849f70e24fd83bd9d3b0')
        const response = await api.json()
        console.log(response)

        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.setState({
            city: response.name,
            country: response.sys.country,
            temp: this.calculateCel(response.main.temp),
            temp_max: this.calculateCel(response.main.temp_max),
            temp_min: this.calculateCel(response.main.temp_min),
            description: response.weather[0].description,
            icon: this.getIcon(response.weather[0].icon),
            currentDate: date,
            currentDay: this.getDay(today.getDay())
        })
      }

    getDay(day){
        let day1 = ''
        switch(true){
            case day === 0:
                day1 = 'Sunday'
                break
            case day === 1:
                day1 = 'Monday'
                break
            case day === 2:
                day1 = 'Tuesday'
                break
            case day === 3:
                day1 = 'Wednesday'
                break
            case day === 4:
                day1 = 'Thursday'
                break
            case day === 5:
                day1 = 'Friday'
                break
            case day === 6:
                day1 = 'Saturday'
                break
        }
        return day1
    }

    calculateCel(temp){
        let cel = Math.floor(temp-273.15)
        return cel
    }

    getIcon(icon){
        let url = `http://openweathermap.org/img/wn/${icon}@2x.png`
        return url
    }

    render() {
        return (
            <div style={{textAlign:'center', backgroundColor:'#87CEEB'}}>
                <h1 style={{color:'blue'}}>Weather APP</h1>
                <div style={{fontSize:32, fontWeight:'bolder'}}>{this.state.city}, {this.state.country}</div>
                
                <img src={this.state.icon} alt=''/>
                <div style={{fontSize:22}}>{this.state.description}</div>
                <br/>
                <div>{this.state.currentDate}</div>
                <div>{this.state.currentDay}</div>
                <br/>
                <div>Average Degree: {this.state.temp} Degree</div>
                <div>Max Degree: {this.state.temp_max} Degree</div>
                <div>Minimum Degree: {this.state.temp_max} Degree</div>
            </div>
        )
    }
}
