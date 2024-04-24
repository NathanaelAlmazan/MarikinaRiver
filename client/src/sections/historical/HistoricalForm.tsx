"use client";
import React from "react";
import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { StationHistory } from "@/actions";

const LineGraph = dynamic(() => import("./LineGraph"), { ssr: false });

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

const accuracy: { [key: string]: number } = {
  Nangka: 0.14,
  Sto_Nino: 0.21,
  Marcos: 0.16,
  Tumana: 0.2,
  Rosario: 0.16,
  Manalo: 0.15,
  San_Mateo: 0.17,
  Rodriguez: 0.16,
};

export default function HistoricalForm({
  history,
}: {
  history: StationHistory[];
}) {
  const [station, setStation] = React.useState<string>("Nangka");

  const handleStationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStation(event.target.value);
  };

  return (
    <Container
      id="history-section"
      component="section"
      maxWidth="lg"
      sx={{ my: 8 }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Historical Data"
              subheader={options[station]}
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
              {history
                .filter((data) => data.station === station)
                .map((data) => (
                  <LineGraph key={data.station} history={data} />
                ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" component="h2">
            Model Performance
          </Typography>
          <Typography variant="body1" component="p">
            {`The RiverCast model simulated Marikina River levels from 2020 to 2023 with an average 98% accuracy across eight stations. It performed exceptionally well at Nangka and Manalo Bridge stations, and satisfactorily at Sto. Nino and Tumana stations. Although it exhibited a small error of ${accuracy[
              station
            ].toFixed(2)} meters at the ${
              options[station]
            } station, the variability in accuracy across locations indicates the need for topological variables to enhance the model further.`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
