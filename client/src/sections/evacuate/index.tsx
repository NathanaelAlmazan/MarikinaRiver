"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import GoogleMap from "./components/map";

export default function EvacuateSection() {
    return (
        <Container id='evacuate-section' component="section" maxWidth="lg">
            {/* <GoogleMap /> */}
            <Box sx={{ width: "100%", height: 350, bgcolor: "grey" }} />
        </Container>
    );
}