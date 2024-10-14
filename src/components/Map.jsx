import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./modules/Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}>
      {lat} - {lng}
      <button
        onClick={(e) => {
          setSearchParams({ lat: 123, lng: 1223 });
          e.stopPropagation();
          e.preventDefault();
        }}>
        change
      </button>
    </div>
  );
}

export default Map;
