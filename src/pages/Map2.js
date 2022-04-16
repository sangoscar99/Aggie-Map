import React, { Component } from "react";

export default class Map2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: "DRIVING",
      origin: "",
      destination: "",
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.checkDriving = this.checkDriving.bind(this);
    this.checkBicycling = this.checkBicycling.bind(this);
    this.checkTransit = this.checkTransit.bind(this);
    this.checkWalking = this.checkWalking.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  directionsCallback(response) {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  }

  checkDriving({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "DRIVING",
      }));
  }

  checkBicycling({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "BICYCLING",
      }));
  }

  checkTransit({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "TRANSIT",
      }));
  }

  checkWalking({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "WALKING",
      }));
  }

  getOrigin(ref) {
    this.origin = ref;
  }

  getDestination(ref) {
    this.destination = ref;
  }

  onClick() {
    if (this.origin.value !== "" && this.destination.value !== "") {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  }

  onMapClick(...args) {
    console.log("onClick args: ", args);
  }

  render() {
    return;
    <div>
     
    </div>;
  }
}
