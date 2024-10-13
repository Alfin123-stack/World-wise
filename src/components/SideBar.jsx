import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>list of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          {" "}
          &copy; Copyright {new Date().getFullYear()}{" "}
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
