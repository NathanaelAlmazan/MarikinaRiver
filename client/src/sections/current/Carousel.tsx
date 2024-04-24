"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
import { Icon } from "@iconify/react";

import { CurrentData } from "@/actions";

import riverBg from "../../../public/images/weather_bg.jpg";

const stations: { [key: string]: string } = {
  Nangka: "Nangka",
  Sto_Nino: "Sto. Nino",
  Marcos: "Marcos Highway",
  Tumana: "Tumana Bridge",
  Rosario: "Rosario Bridge",
  Manalo: "Marikina Bridge",
  San_Mateo: "San Mateo, Rizal",
  Rodriguez: "Rodriguez, Rizal",
};

export function CarouselItem({ data }: { data: CurrentData }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 600,
        width: "100%",
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${riverBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: 8
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 600 }}
      >
        <Grid item xs={12}>
          <Stack spacing={0}>
            <Typography variant="body1" color="white" align="center">
              {`${stations[data.station]} | ${new Date().toLocaleDateString(
                undefined,
                {
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  timeZone: "Asia/Shanghai",
                }
              )}`}
            </Typography>
            <Typography variant="h1" color="white" align="center">
              {`${data.riverLevel.toFixed(2)}M`}
            </Typography>
            <Typography variant="h6" color="white" align="center">
              {"Normal River Level"}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Icon
              icon="oui:temperature"
              style={{ color: "#FFFFFF", width: 50, height: 50 }}
            />
            <Box>
              <Typography variant="h6" color="white">
                {`${data.temperature.toFixed(2)}°C`}
              </Typography>
              <Typography variant="body2" color="white">
                Temperature
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Icon
              icon="uil:cloud-wind"
              style={{ color: "#FFFFFF", width: 50, height: 50 }}
            />
            <Box>
              <Typography variant="h6" color="white">
                {`${data.windSpeed.toFixed(2)}m/s Southeast`}
              </Typography>
              <Typography variant="body2" color="white">
                Wind Speed
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Icon
              icon="iwwa:humidity"
              style={{ color: "#FFFFFF", width: 50, height: 50 }}
            />
            <Box>
              <Typography variant="h6" color="white">
                {`${data.humidity.toFixed(0)}%`}
              </Typography>
              <Typography variant="body2" color="white">
                Humidity
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Icon
              icon="fluent:weather-rain-snow-20-filled"
              style={{ color: "#FFFFFF", width: 50, height: 50 }}
            />
            <Box>
              <Typography variant="h6" color="white">
                {`${data.precipitation.toFixed(2)}mm/hr`}
              </Typography>
              <Typography variant="body2" color="white">
                Precipitation
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function CustomCarousel({ data }: { data: CurrentData[] }) {
  return (
    <Carousel sx={{ width: "100%" }}>
      {data.map((item) => (
        <CarouselItem key={item.station} data={item} />
      ))}
    </Carousel>
  );
}
