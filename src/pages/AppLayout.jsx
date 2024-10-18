import SideBar from "../components/SIdeBar";
import styles from "./modules/AppLayout.module.css";
import Map from "../components/Map";
import { useAuth } from "../components/contexts/FakeAuthContext";
import { Navigate } from "react-router-dom";
import User from "../components/User";

function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User/>
    </div>
  );
}

export default AppLayout;
