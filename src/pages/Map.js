import React, { useRef, useState, useCallback } from "react";
import "./Home.css";
import Switch from "react-ios-switch";
import SettingButton from "./SettingButton";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes,FaWalking, FaBicycle } from "react-icons/fa";
import NavBar from "./Navbar"

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

// UCDavis Center
const center = { lat: 38.53455, lng: -121.75206 };

const Map = () => {
  // SettingButton 
  const [checked, setChecked] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  var position;

  navigator?.geolocation.getCurrentPosition(
    ({ coords: { latitude: lat, longitude: lng } }) => {
      const pos = { lat, lng };
      //this.setState({currentPosition: pos})

      position = pos;
      console.log(position);
    }
  );

  async function calculateRoute() {
    if (destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: position,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: checked? google.maps.TravelMode.BICYCLING : google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    destiantionRef.current.value = "";
  }

  const latLongBound = {
    north: 30,
    south: 31,
    east: 30,
    west: 31,
  };

  const bounds1 = new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng(38.5, 38.57),
    new window.google.maps.LatLng(-121.67, -121.81)
  );

  const restrictCountry = {
    country: "US",
  };



  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
    >
      <Box>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={14}
          mapContainerStyle={{ width: "390px", height: "844px" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        position="absolute"
        width="370px"
        top={7}
        p={2}
        borderRadius="lg"
        bgColor="rgb(224,224,224)"
        shadow=" 0 0 10px #000000"
        zIndex="1"
        justifyContent="bottom"
      >
        <HStack justifyContent="center" >
          <Autocomplete restrictions={restrictCountry} bounds={bounds1}>
            <Input type="text" placeholder="Destination" width="300px" ref={destiantionRef} />
          </Autocomplete> 
          <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
        </HStack>
        
        <HStack></HStack>
        <HStack mt={4}
          paddingLeft={4} spacing={2} justifyContent="space-around">
          <HStack> <p>Biking</p>
         <Switch
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
          /></HStack>
          

          <ButtonGroup>
            <Button
              background="#2C3751"
              color="white"
              type="submit"
              onClick={calculateRoute}
            >
              Calculate Route
            </Button>
            
          </ButtonGroup>
        </HStack>
        <HStack
          spacing={4}
          mt={4}
          paddingLeft={4}
          justifyContent="space-between"
        >
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(position);
              map.setZoom(20);
            }}
          />
        </HStack>
      </Box>
    
      <Box
        position= "absolute"
        bottom={0}
        paddingTop={2}
        paddingBottom={5}
        width="450px"
        borderRadius="lg"
        bgColor="LightGray"
        shadow=" 0 0 10px #000000"
        zIndex="1"
        justifyContent="bottom"
      >
        <NavBar></NavBar>
      </Box>
        </Flex>
  );
};

export default Map;
