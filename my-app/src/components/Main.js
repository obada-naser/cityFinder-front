import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FindCity from './FindCity';
import axios from 'axios';
// import LatLon from './LatLon';
import Map from './Map';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayError: false,
      showMap: false,

      lat: '',
      location: '',
      lon: '',

    
      errorMessage: '',
      searchQuery: '',

    };
  }

  updateCity = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  showLocation = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=pk.5c33925fee3b7f3c0a9ad67546f754a2&q=${this.state.searchQuery}&format=json`;
    let location;

    try {
      location = await axios.get(url);
      this.setState({
        location: location.data[0].display_name,
        lat: location.data[0].lat,
        lon: location.data[0].lon,

        showMap: true,
        displayError: false,
      });
  
    } catch (error) {
      this.setState({
        showMap: false,
        displayError: true,
        errorMessage: 'ERROR',
      });
    }
  };

  
  

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <FindCity
              updateCity={this.updateCity}
              showLocation={this.showLocation}
           
            />
          </Col>
        </Row>
        {this.state.showMap && (
          <>
     
            <Row>
              <Col>
                <Map
                  imgaeurl={`https://maps.locationiq.com/v3/staticmap?key=pk.5c33925fee3b7f3c0a9ad67546f754a2&center=${this.state.lat},${this.state.lon}&format=jpg`}
                  city={this.state.location}
                />
              </Col>
            </Row>
           
          </>
        )}
      </Container>
    );
  }
}

export default Main;