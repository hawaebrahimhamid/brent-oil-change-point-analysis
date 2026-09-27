import { useEffect, useState } from "react";
import axios from "axios";

function KPICards() {
  const [kpi, setKpi] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/kpis`).then((res) => {
      setKpi(res.data);
    });
  }, []);

  if (!kpi) return <p>Loading...</p>;

  return (
    <div className="kpi-container">
      <div className="card">
        <h3>Average Price</h3>

        <p>${kpi.average_price}</p>
      </div>

      <div className="card">
        <h3>Volatility</h3>

        <p>{kpi.volatility}</p>
      </div>
    </div>
  );
}

export default KPICards;
