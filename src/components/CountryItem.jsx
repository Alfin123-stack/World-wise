/* eslint-disable react/prop-types */
import styles from "./modules/CountryItem.module.css";

function CountryItem({ emoji, country }) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
