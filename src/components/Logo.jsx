import { Link } from "react-router-dom";
import styles from "./modules/Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
