/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./modules/CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "./contexts/CititesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  return (
    <ul className={styles.cityList}>
      {cities.length == 0 && (
        <Message message={"Add Your Cities by clicking the map"} />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        cities.map((city) => <CityItem key={city.id} {...city} />)
      )}
    </ul>
  );
}

export default CityList;
