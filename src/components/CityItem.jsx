/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./modules/CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function CityItem({ cityName, emoji, date, id, position }) {
  return (
    <NavLink
      className={styles.cityItem}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </NavLink>
  );
}

export default CityItem;
