"use client";
import React from "react";
import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const PieGraph = dynamic(() => import("./PieGraph"), { ssr: false });

export default function VariableSection() {
  return (
    <Container component="section" maxWidth="lg" sx={{ my: 8 }}>
      <Grid container spacing={3} justifyContent="flex-end" alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h6" component="h2" align="right">
            Data Analysis
          </Typography>
          <Typography variant="body1" component="p" align="right">
            {"Analysis of the collected data using the RiverCast model revealed that precipitation, temperature, and the time of the year had the most significant impact on predicting the river level. The model demonstrated that heavy rainfall and lower temperatures correlate with increased river levels. Furthermore, the time of year also plays a crucial role, with the river exhibiting different behaviors across different seasons."}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Feature Importance" />
            <CardContent>
              <PieGraph />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
