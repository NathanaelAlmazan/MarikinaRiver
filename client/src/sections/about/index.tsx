"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";

import riverBg from "../../../public/images/bridge_river.jpg";

export default function AboutSection() {
  return (
    <Box
      id='about-section'
      component='section'
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 500,
        width: "100%",
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${riverBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        my: 8,
        py: 5,
        color: "#FFFFFF",
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: "80%" }}
      >
        <Grid item xs={12}>
          <Typography
            component="div"
            variant="h4"
            align="center"
            paddingBottom={2}
          >
            About RiverCast
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Icon
              icon="mage:goals"
              style={{
                width: 80,
                height: 80,
                color: "#FFFFFF",
                marginBottom: 12,
              }}
            />
            <Typography component="div" variant="subtitle1" align="center">
              Objective
            </Typography>
            <Typography component="p" variant="body1" align="center">
              {"RiverCast developed a forecasting model that utilizes satellite-based meteorological data to simulate the behavior of the Marikina River. This project aims to enhance flood response and preparedness."}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Icon
              icon="codicon:symbol-method"
              style={{
                width: 80,
                height: 80,
                color: "#FFFFFF",
                marginBottom: 12,
              }}
            />
            <Typography component="div" variant="subtitle1" align="center">
              Method
            </Typography>
            <Typography component="p" variant="body1" align="center">
              {"RiverCast collected precipitation, humidity, temperature, wind speed, and river level data from eight distinct locations along the Marikina River spanning from 2012 to 2023. Subsequently, a Transformer-based model was employed to simulate river behavior."}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Icon
              icon="mdi:graph-areaspline"
              style={{
                width: 80,
                height: 80,
                color: "#FFFFFF",
                marginBottom: 12,
              }}
            />
            <Typography component="div" variant="subtitle1" align="center">
              Result
            </Typography>
            <Typography component="p" variant="body1" align="center">
              {"RiverCast tested the model using recorded meteorological and river level data from 2020 to 2023, achieving a commendable accuracy rate of 98%. The team is dedicated to continuously enhancing the reliability of the model."}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
