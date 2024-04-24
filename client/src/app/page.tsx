import React from "react";
// modules
import CurrentWeatherSection from "@/sections/current";
import ForecastSection from "@/sections/forecast";
import TriviaSection from "@/sections/trivia";
import VariableSection from "@/sections/variables";
import AboutSection from "@/sections/about";
import HistorySection from "@/sections/historical";
import FaqSection from "@/sections/faq";

export default function Home() {
  return (
    <>
      <CurrentWeatherSection />
      <ForecastSection />
      <AboutSection />
      <TriviaSection />
      <VariableSection />
      <HistorySection />
      <FaqSection />
    </>
  );
}