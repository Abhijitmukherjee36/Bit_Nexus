import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../Components/CoinInfo";
import { Typography, Box } from "@mui/material";
import HTMLReactParser from "html-react-parser";

// ✅ Helper function for commas
export function numberWithCommas(x) {
  if (!x) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  if (!coin) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // ✅ responsive
        alignItems: { xs: "center", md: "flex-start" },
        color: "white",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
          borderRight: { md: "2px solid grey" },
          padding: { xs: 2, md: 3 },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            textAlign: "justify",
            mb: 2,
          }}
        >
          {coin?.description?.en
            ? HTMLReactParser(coin.description.en.split(". ")[0]) + "."
            : ""}
        </Typography>

        {/* ✅ Market Data */}
        <Box sx={{ alignSelf: "flex-start", width: "100%", mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Montserrat", mb: 1, color: "gold" }}
          >
            Rank:{" "}
            <span style={{ color: "white" }}>{coin?.market_cap_rank}</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Montserrat", mb: 1, color: "gold" }}
          >
            Current Price:{" "}
            <span style={{ color: "white" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </span>
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Montserrat", mb: 1, color: "gold" }}
          >
            Market Cap:{" "}
            <span style={{ color: "white" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </span>
          </Typography>
        </Box>
      </Box>

      {/* Chart Section */}
      <Box
        sx={{
          flex: 1,
          width: { xs: "100%", md: "70%" },
          p: { xs: 2, md: 4 },
        }}
      >
        <CoinInfo coin={coin} />
      </Box>
    </Box>
  );
};

export default CoinPage;
