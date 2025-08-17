// src/Components/CoinInfo.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// local helper to avoid circular imports
const numberWithCommas = (x) =>
  x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    if (!coin?.id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin?.id, currency, days]);

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        color: "white",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2, sm: 3 },
      }}
    >
      {/* Header like "Price (Past X Days) in INR" */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: "#EEBC1D", // gold color
          fontWeight: "bold",
          textAlign: "center", // center aligned
          fontFamily: "Montserrat",
        }}
      >
        Price (Past {days} {days === 1 ? "Day" : "Days"}) in {currency}
      </Typography>

      {/* Chart area - Height matched to sidebar size */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 220, sm: 280, md: 350, lg: 380 }, // Increased to better match sidebar height
          backgroundColor: "transparent",
          borderRadius: 2,
        }}
      >
        {loading || !historicData ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress sx={{ color: "#EEBC1D" }} thickness={1.5} />
          </Box>
        ) : (
          <Line
            data={{
              labels: historicData.map(([t]) => {
                const d = new Date(t);
                return days === 1
                  ? d.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : d.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map(([, p]) => p),
                  borderColor: "#EEBC1D",
                  backgroundColor: "rgba(238,188,29,0.08)",
                  pointRadius: 0,
                  borderWidth: 2,
                  tension: 0.25,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: { mode: "index", intersect: false },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) =>
                      `${currency} ${numberWithCommas(
                        ctx.parsed.y?.toFixed
                          ? ctx.parsed.y.toFixed(2)
                          : ctx.parsed.y
                      )}`,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#BDBDBD",
                    maxRotation: 45,
                    autoSkip: true,
                    maxTicksLimit: 8, // Reduced for smaller chart
                  },
                  grid: { display: false },
                },
                y: {
                  ticks: {
                    color: "#BDBDBD",
                    callback: (val) => numberWithCommas(val),
                    maxTicksLimit: 6, // Reduced for smaller chart
                  },
                  grid: { color: "rgba(255,255,255,0.08)" },
                },
              },
            }}
          />
        )}
      </Box>

      {/* Range buttons - Centered under chart */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mt: 2,
          justifyContent: "center", // Always center the buttons
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => setDays(day.value)}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </Box>
    </Box>
  );
};

export default CoinInfo;