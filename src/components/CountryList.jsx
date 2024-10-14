/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import styles from "./modules/CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ countries, isLoading }) {
  return (
    <ul className={styles.countryList}>
      {countries.length == 0 && (
        <Message message={"Add Your countries by clicking the map"} />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        countries.map((country) => (
          <CountryItem key={country.id} {...country} />
        ))
      )}
    </ul>
  );
}

export default CountryList;
