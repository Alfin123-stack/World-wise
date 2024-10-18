/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./modules/CityItem.module.css";
import { useCities } from "./contexts/CititesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function CityItem({ cityName, emoji, date, id, position }) {
  const { currentCity, deleteCity } = useCities();
  const isSelected = currentCity.id === id;

  return (
    <NavLink
      className={`${styles.cityItem} ${
        isSelected ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteCity(id);
        }}
        className={styles.deleteBtn}>
        &times;
      </button>
    </NavLink>
  );
}

export default CityItem;
