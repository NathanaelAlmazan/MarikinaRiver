import React from "react";

import { getForecast } from "@/actions";
import ForecastForm from "./ForecastForm";


export default async function ForecastSection() {
  const forecasts = await getForecast();

  return <ForecastForm forecasts={forecasts} />;
}
