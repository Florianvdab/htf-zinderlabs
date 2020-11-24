import "./App.css";
//import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import { Icon } from "leaflet";

class Datacenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      errors: [],
    };
  }

  componentDidMount = () => this.fetchData();

  fetchData = async () => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization:
        "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9odGYyMDIwLnppbmRlcmxhYnMuY29tXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjA2MjA5ODYwLCJleHAiOjE2MDYzODk4NjAsIm5iZiI6MTYwNjIwOTg2MCwianRpIjoieXFRVDNlTDl4MGJ2cElUSiIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9._Jl6Vi7Hl3mq5OBV_XJxEuYBqrm7q_GBsTL0tOzEKhI",
    };

    try {
      const datacenters = await fetch(
        `https://htf2020.zinderlabs.com/api/datacenters`,
        { headers }
      ).then((res) => res.json().then((res) => res.data));

      datacenters.forEach(async (el) => {
        el.errors = await fetch(
          `https://htf2020.zinderlabs.com/api/datacenters/${el.id}/errors`,
          { headers }
        ).then((res) => res.json());
      });

      this.setState({
        isLoaded: true,
        items: datacenters,
      });

      console.log(datacenters);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}

          {items.map((item) => (
            <Marker
              key={item.id}
              position={[item.location.lat, item.location.lng]}
            >
              <Popup>
                Id: {item.id} - Name: {item.name} <br />
                Longtitude: {item.location.lng}
                <br />
                Latitude: {item.location.lat}
                <br />
                Provider: {item.provider}
                <br />
                In isolation: {item.inIsolation ? "true" : "false"}
                <br />
                {item.errors !== undefined ? item.errors.length : "No errors"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      );
    }
  }
}
export { Datacenter };
