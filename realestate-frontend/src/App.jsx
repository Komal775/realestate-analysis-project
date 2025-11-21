import { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/analyze/", {
        query,
      });

      const data = response.data;
      setSummary(data.summary);
      setTableData(data.table);

      // Prepare chart data (Flat Rate vs Year)
      const years = data.table.map((item) => item.year);
      const flatRates = data.table.map((item) => Number(item.flat_rate));

      setChartData({
        labels: years,
        datasets: [
          {
            label: "Flat Rate",
            data: flatRates,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      });
    } catch (error) {
      alert("Error fetching data");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto", color: "white" }}>
      <h1>Real Estate Analysis Chatbot</h1>

      <input
        type="text"
        placeholder="Analyze locality..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "60%", marginRight: "10px" }}
      />
      <button onClick={handleAnalyze} style={{ padding: "10px 20px" }}>
        Analyze
      </button>

      {/* Summary Section */}
      {summary && (
        <div style={{ marginTop: "30px" }}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* Chart Section */}
      {chartData && (
        <div style={{ marginTop: "40px", background: "#222", padding: "20px", borderRadius: "10px" }}>
          <h2>Flat Rate Trend</h2>
          <Line data={chartData} />
        </div>
      )}

      {/* Table Section */}
      {tableData.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>Filtered Data</h2>
          <table
            border="1"
            cellPadding="10"
            style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}
          >
            <thead>
              <tr>
                <th>Location</th>
                <th>Year</th>
                <th>City</th>
                <th>Flat Rate</th>
                <th>Demand</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.final_location}</td>
                  <td>{row.year}</td>
                  <td>{row.city}</td>
                  <td>{row.flat_rate}</td>
                  <td>{row.demand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
