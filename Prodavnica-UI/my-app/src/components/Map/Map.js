import React from 'react';
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar.js";
import { Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import Geocode from "react-geocode";
import { getSalesmanInProgressOrders } from '../../services/PorudzbinaService.js';

const Map = () => {
    const customIcon = new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
      iconSize: [35, 35]
    });
    const position = [45.25472833688446, 19.83317432993583];
    const [ordersPositions, setOrdersPositions] = useState([]);

    Geocode.setApiKey(process.env.REACT_APP_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("rs");

    const createClusterCustomIcon = function (cluster) {
        return new divIcon({
          html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
          className: "custom-marker-cluster",
          iconSize: point(33, 33, true)
        });
      };

      useEffect(() => {
        getOrders();
      }, []);

      const getOrders = async () => {
        const orders = await getSalesmanInProgressOrders();
 
        const markersData = [];
        for (const o of orders.data) {
          if(!o.approved)
          {try {
            const response = await Geocode.fromAddress(o.adresa);
            const { lat, lng } = response.results[0].geometry.location;
            markersData.push({lat: lat, lon: lng, price:o.cena.toFixed(2), address:o.adresa, comment: o.komentar, status: o.approved});
          } catch (error) {
            console.log(error);
          }}
        }

        setOrdersPositions(markersData);
      };

     return(
        <>
        <NavBar />
        <MapContainer  center={position}  scrollWheelZoom={true} zoom={12} style={{ width: "100vw", height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {ordersPositions.length !== 0 && ordersPositions.map((order) => (
          !order.approved && (
          <Marker position={[order.lat, order.lon]} icon={customIcon}>
            <Popup>
                <Typography>Adresa: {order.address}</Typography>
                <Typography>Komentar: {order.comment}</Typography>
                <Typography>Cena: {order.price}$</Typography>
                <Typography>Status: {order.status ? "ODOBRENA" : "U TOKU"}</Typography>
                </Popup>
          </Marker>)
        ))} 
              </MarkerClusterGroup>

    </MapContainer>
        </>
     );
}

export default Map;