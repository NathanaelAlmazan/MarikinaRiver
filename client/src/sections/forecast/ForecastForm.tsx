"use client";
import React from "react";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ForecastCard from "./ForecastCard";
import { StationForecast } from "@/actions";
import HorizontalScrollbar from "./HorizontalScrollbar";

const options: { [key: string]: string } = {
  Nangka: "Nangka",
  Sto_Nino: "Sto. Nino",
  Marcos: "Marcos Highway",
  Tumana: "Tumana Bridge",
  Rosario: "Rosario Bridge",
  Manalo: "Marikina Bridge",
  San_Mateo: "San Mateo, Rizal",
  Rodriguez: "Rodriguez, Rizal",
};

export default function ForecastForm({
  forecasts,
}: {
  forecasts: StationForecast[];
}) {
  const [station, setStation] = React.useState<string>("Nangka");

  const handleStationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStation(event.target.value);
  };

  return (
    <Container component="section" id='forecast-section' maxWidth="lg" sx={{ my: 8 }}>
      <CardHeader
        title={
          <Typography component="div" variant="h4">
            Weekly Forecast
          </Typography>
        }
        subheader={
          <Typography component="div" variant="body1">
            {options[station]}
          </Typography>
        }
        action={
          <TextField
            select
            variant="standard"
            name="station"
            label="Station"
            value={station}
            onChange={handleStationChange}
            sx={{ minWidth: 120 }}
          >
            {Object.entries(options).map((option) => (
              <MenuItem key={option[0]} value={option[0]}>
                {option[1]}
              </MenuItem>
            ))}
          </TextField>
        }
      />
      <CardContent>
        {forecasts
          .filter((data) => data.station === station)
          .map((data) => (
            <HorizontalScrollbar key={data.station}>
              {data.forecasts.map((forecast) => (
                <ForecastCard
                  key={forecast.timestamp.toISOString()}
                  forecast={forecast}
                />
              ))}
            </HorizontalScrollbar>
          ))}
      </CardContent>
    </Container>
  );
}
