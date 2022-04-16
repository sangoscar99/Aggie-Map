/*global google*/
import React from "react";

import { GoogleMap, StandaloneSearchBox, Marker } from "@react-google-maps/api";

let markerArray = [];
class Map2 extends React.Component {
  state = {
    currentLocation: { lat: 0, lng: 0 },
    markers: [],
    bounds: null,
  };

  onMapLoad = (map) => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        this.setState({ currentLocation: pos });
      }
    );
    google.maps.event.addListener(map, "bounds_changed", () => {
      console.log(map.getBounds());
      this.setState({ bounds: map.getBounds() });
    });
  };

  onSBLoad = (ref) => {
    this.searchBox = ref;
  };

  onPlacesChanged = () => {
    markerArray = [];
    let results = this.searchBox.getPlaces();
    for (let i = 0; i < results.length; i++) {
      let place = results[i].geometry.location;
      markerArray.push(place);
    }
    this.setState({ markers: markerArray });
    console.log(markerArray);
  };

  render() {
    return (
      <div>
        <div>
          <GoogleMap
            center={this.state.currentLocation}
            zoom={10}
            onLoad={(map) => this.onMapLoad(map)}
            mapContainerStyle={{ height: "400px", width: "800px" }}
          >
            {this.state.markers.map((mark, index) => (
              <Marker key={index} position={mark} />
            ))}
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default Map2;
