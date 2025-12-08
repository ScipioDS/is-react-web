import './App.css';
import TurretShooter from './NetworkDefenseGame';
import {Routes, Route} from "react-router-dom";
import TowerDefenseGame from "@/components/TowerDefense/TowerDefense.tsx";


function App() {
  return (
      <Routes>
        <Route path="/" element={<TurretShooter />} />
        <Route path="/tr" element={<TowerDefenseGame />} />
      </Routes>
  );
}

export default App;