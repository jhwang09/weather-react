import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      zipCode: 94040,

      weatherData: {
        locationName: '',
        weatherMain: 0,
        weatherDesc: 0,

        mainTemp: 0,
        mainFeelsLike: 0,
        mainTempMin: 0,
        mainTempMax: 0
      }
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch(e) {
    this.setState({error: null})

    let zipCode = this.state.zipCode
    if (zipCode.length !== 5) {
      this.setState({
        error: "invalid zip code!"
      })
      return
    }

    let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=284027b5cfc736b902b27754a7064f44`
    fetch(endpoint)
    .then(res => res.json())
    .then((res) => {
      let locationName = res.name
      let weather = res.weather[0]
      let main = res.main
      this.setState({
        weatherData: {
          locationName,
          weatherMain: weather.main,
          weatherDesc: weather.description,
          mainTemp: main.temp,
          mainFeelsLike: main.feels_like,
          mainTempMin: main.temp_min,
          mainTempMax: main.temp_max
        }
      })
    })
  }

  handleChange(e) {
    this.setState({zipCode: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" onChange={this.handleChange} />
          <button onClick={this.handleSearch}>
            Lookup Zip Code
          </button>
          {this.state.error && <div className="error-message">{this.state.error}</div>}
        </header>
        <div className="App-body">
          <h2>{this.state.weatherData.locationName}</h2>
          <h3>{this.state.weatherData.weatherMain} / {this.state.weatherData.weatherDesc}</h3>
          <ul className="body-list">
            <li>Temp: {this.state.weatherData.mainTemp}</li>
            <li>Feels like: {this.state.weatherData.mainFeelsLike}</li>
            <li>Temp Min: {this.state.weatherData.mainTempMin}</li>
            <li>Temp Max: {this.state.weatherData.mainTempMax}</li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
