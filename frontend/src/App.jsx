import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Estadisticas from "./pages/Estadisticas";
import Predictor from "./pages/Predictor";
import Zonas from "./pages/Zonas";
import Sidebar from "./components/Sidebar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const pages = {
    dashboard: <Dashboard />,
    estadisticas: <Estadisticas />,
    predictor: <Predictor />,
    zonas: <Zonas />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F5F9" }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={() => setIsLoggedIn(false)}
      />
      <div style={{ flex: 1, marginLeft: 240, padding: 24 }}>
        {pages[activePage]}
      </div>
    </div>
  );
}

export default App;