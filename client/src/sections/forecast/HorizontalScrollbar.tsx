"use client";
import React from "react";
import Stack from "@mui/material/Stack";

export default function HorizontalScrollbar({ children }: { children:  React.ReactNode }) {
    return (
        <Stack direction="row" spacing={3} sx={{ px: 3, py: 2, overflowX: 'auto' }}>
            {children}
        </Stack>
    );
}