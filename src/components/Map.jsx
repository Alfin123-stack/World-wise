/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./modules/Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "./contexts/CititesContext";
import { useGeolocation } from "./hooks/useGeoLocation";
import { useUrlPosition } from "./hooks/useUrlPosition";
import Button from "./Button";

function Map() {
  const [mapPosition, setMapPositon] = useState([51.505, -0.09]);

  const { cities } = useCities();

  const {
    isLoading: isLoadingGeoLocation,
    position: positionGeoLocation,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) {
        setMapPositon([parseFloat(lat), parseFloat(lng)]);
      }
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (positionGeoLocation) {
        setMapPositon([positionGeoLocation.lat, positionGeoLocation.lng]);
      }
    },
    [positionGeoLocation]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingGeoLocation ? "Loading...." : "Use Your Location"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city, index) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id || index}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.flyTo(position, 13);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
