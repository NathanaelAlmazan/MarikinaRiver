"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";

import { Forecast } from "@/actions";

export default function ForecastCard({ forecast }: { forecast: Forecast }) {
  return (
    <Card elevation={3} sx={{ minWidth: 300 }}>
      <CardHeader
        title={
          <Typography variant="body1">
            {forecast.timestamp.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h4" color="text.secondary">
              {`${forecast.riverLevel.toFixed(2)}M`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Normal River Level
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Icon
                icon="oui:temperature"
                style={{ width: 30, height: 30 }}
              />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  {`${forecast.temperature.toFixed(2)}°C`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Temperature
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Icon
                icon="uil:cloud-wind"
                style={{ width: 30, height: 30 }}
              />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  {`${forecast.windSpeed.toFixed(2)}m/s Southeast`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Wind Speed
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Icon
                icon="iwwa:humidity"
                style={{ width: 30, height: 30 }}
              />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  {`${forecast.humidity.toFixed(0)}%`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Humidity
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Icon
                icon="fluent:weather-rain-snow-20-filled"
                style={{ width: 30, height: 30 }}
              />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  {`${forecast.precipitation.toFixed(2)}mm/hr`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Precipitation
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
