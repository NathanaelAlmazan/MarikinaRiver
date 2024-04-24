"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Icon } from "@iconify/react";

import LogoWithName from "../../../public/logo/logo-with-name.png";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 280,
        mt: 16,
        bgcolor: (theme) => alpha(theme.palette.primary.light, 0.5),
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            <Image alt="logo" src={LogoWithName.src} width={170} height={40} />
            <Typography component="p" variant="body2" paddingTop={2}>
              {
                "The RiverCast Project uses machine learning to forecast the Marikina River level up to a week ahead. By combining IoT technology and machine learning, the project aims to reduce flood-related casualties by providing timely and precise forecasts, improving preparedness and response measures."
              }
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon
                    icon="mdi:address-marker"
                    style={{ width: 20, height: 20 }}
                  />
                </ListItemIcon>
                <ListItemText primary="PUP Main Building, Anonas, Santa Mesa, Manila, 1016 Metro Manila" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon
                    icon="ic:round-email"
                    style={{ width: 20, height: 20 }}
                  />
                </ListItemIcon>
                <ListItemText primary="rivercast.automos@gmail.com" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon
                    icon="carbon:phone-filled"
                    style={{ width: 20, height: 20 }}
                  />
                </ListItemIcon>
                <ListItemText primary="+639913083079" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography component="div" variant="h6" paddingBottom={2}>
              Get in Touch
            </Typography>
            <Stack direction="row" spacing={2}>
              <Icon
                icon="ic:baseline-facebook"
                style={{ width: 30, height: 30 }}
              />
              <Icon
                icon="ant-design:twitter-circle-filled"
                style={{ width: 30, height: 30 }}
              />
              <Icon
                icon="formkit:instagram"
                style={{ width: 30, height: 30 }}
              />
              <Icon icon="mage:youtube" style={{ width: 30, height: 30 }} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="div"
              align="center"
              variant="body1"
              paddingBottom={2}
            >
              © 2024 All Rights Reserved
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
