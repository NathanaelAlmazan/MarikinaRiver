"use client"
import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function GoogleMap() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <Map
        style={{ width: "100%", height: 350 }}
        defaultCenter={{ lat: 14.67379944299478, lng: 121.10952401738155 }}
        defaultZoom={16}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
}
