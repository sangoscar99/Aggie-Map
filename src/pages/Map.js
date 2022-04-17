import React, { useRef, useState, useCallback } from "react";
import { Settings, Calendar, Compass } from "react-feather";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
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
import { FaLocationArrow, FaTimes } from "react-icons/fa";

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

  const navigate = useNavigate();
  const handleOnClickCalender = useCallback(
    () => navigate("/calendar", { replace: true }),
    [navigate]
  );

  const handleOnClickSetting = useCallback(
    () => navigate("/setting", { replace: true }),
    [navigate]
  );

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
      console.log(center);
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
      travelMode: google.maps.TravelMode.WALKING,
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

  // navbar

  const Styles = {
    Wrapper: styled.main`
      display: flex;
      background-color: #eeeeee;
      height: 850px;
    `,
  };

  const Navbar = {
    Wrapper: styled.nav`
      flex: 1;
      padding: 1rem 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: LightGray;
      width: 450px;
      height: 15vh;
    `,
    Logo: styled.h1`
      border: 1px solid gray;
      padding: 0.5rem 1rem;
    `,
    Items: styled.ul`
      display: flex;
      list-style: none;
    `,
    Item: styled.li`
      padding: 0 1rem;
      cursor: pointer;
    `,
  };

  const MobileNavbar = {
    Wrapper: styled(Navbar.Wrapper)`
      bottom: 0;
      justify-content: center;
    `,
    Items: styled(Navbar.Items)`
      flex: 1;
      padding: 0 2rem;
      justify-content: space-around;
    `,
    Item: styled(Navbar.Item)`
      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 1.2rem;
    `,
    Icon: styled.span``,
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
          mapContainerStyle={{ width: "450px", height: "850px" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
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
        <HStack spacing={2} justifyContent="space-between">
          <Autocomplete restrictions={restrictCountry} bounds={bounds1}>
            <Input type="text" placeholder="Destination" ref={destiantionRef} />
          </Autocomplete>

          <ButtonGroup>
            <Button
              background="#2C3751"
              color="white"
              type="submit"
              onClick={calculateRoute}
            >
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
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
        position="absolute"
        bottom={0}
        p={2}
        width="450px"
        borderRadius="lg"
        bgColor="LightGray"
        shadow=" 0 0 10px #000000"
        zIndex="1"
        justifyContent="bottom"
      >
        <MobileNavbar.Items>
          <MobileNavbar.Item onClick={handleOnClickCalender}>
            <MobileNavbar.Icon>
              <Calendar size={18} />
            </MobileNavbar.Icon>
            Schedule
          </MobileNavbar.Item>
          <MobileNavbar.Item>
            <MobileNavbar.Icon>
              <Compass size={18} />
            </MobileNavbar.Icon>
            Navigation
          </MobileNavbar.Item>
          <MobileNavbar.Item onClick={handleOnClickSetting}>
            <MobileNavbar.Icon>
              <Settings size={18} />
            </MobileNavbar.Icon>
            Settings
          </MobileNavbar.Item>
        </MobileNavbar.Items>
      </Box>
    </Flex>
  );
};

export default Map;
