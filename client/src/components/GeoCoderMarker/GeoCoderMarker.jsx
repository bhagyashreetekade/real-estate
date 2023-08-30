import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder'
// Create a Leaflet icon instance
let DefaultIcon = L.icon({
  iconUrl: icon,          // Use "iconUrl" instead of "iconURL"
  shadowUrl: iconShadow,
});

// Set the default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

  // You can set the position based on the given address here
  // For example:
  // const [position, setPosition] = useState([latitude, longitude]);

  useEffect(()=>{
    //convert english address in map cordinates
    ELG.geocode().text(address).run((err,results,response)=> {
        if(results?.results?.length >0){
            const {lat,lng}=results?.results[0].latlng
            setPosition([lat,lng])
            map.flyTo([lat,lng],6)
        }
    })
    //here we write address in array because every time when address will change useEffect will run
  },[address])

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>
       
      </Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
