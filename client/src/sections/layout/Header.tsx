"use client";
import React from "react";
import Image from "next/image";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

import LogoWithName from "../../../public/logo/logo-with-name.png";

// ----------------------------------------------------------------------

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Header() {
  const theme = useTheme();
  const [subscribed, setSubscribed] = React.useState<boolean>(false);

  // register service worker
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Registration successful");
        })
        .catch((error) => {
          console.log("Service worker registration failed");
        });

      navigator.serviceWorker.ready.then(function (registration) {
        if (!registration.pushManager) {
          console.log("Push manager unavailable.");
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function (existedSubscription) {
            if (existedSubscription === null) setSubscribed(false);
            else setSubscribed(true);
          });
      });
    }
  }, []);

  const subscribeUser = async () => {
    if ("serviceWorker" in navigator) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => {
          navigator.serviceWorker.ready
            .then(function (registration) {
              if (!registration.pushManager) {
                console.log("Push manager unavailable.");
                return;
              }

              registration.pushManager
                .getSubscription()
                .then(function (existedSubscription) {
                  if (existedSubscription === null) {
                    console.log("No subscription detected, make a request.");

                    console.log("key", process.env.NEXT_PUBLIC_VAPID_KEY);

                    registration.pushManager
                      .subscribe({
                        applicationServerKey: urlBase64ToUint8Array(
                          process.env.NEXT_PUBLIC_VAPID_KEY as string
                        ),
                        userVisibleOnly: true,
                      })
                      .then(function (newSubscription) {
                        console.log("New subscription added.", newSubscription);

                        fetch(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/subscribe`,
                          {
                            method: "POST",
                            body: JSON.stringify({
                              device: JSON.stringify(newSubscription),
                            }),
                            headers: {
                              "content-type": "application/json",
                            },
                          }
                        ).then(() => {
                          setSubscribed(true);
                        });
                      })
                      .catch(function (e) {
                        if (Notification.permission !== "granted") {
                          console.log("Permission was not granted.");
                        } else {
                          console.error(
                            "An error ocurred during the subscription process.",
                            e
                          );
                        }
                      });
                  } else {
                    console.log("Existed subscription detected.");
                    setSubscribed(true);
                  }
                });
            })
            .catch(function (e) {
              console.error(
                "An error ocurred during Service Worker registration.",
                e
              );
            });
        }, () => {
          console.log("Unable to retrieve your location");
        });
      } else {
        console.log("Geolocation not supported");
      }
    }
  };

  const unsubscribeUser = async () => {
    if (subscribed) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration.pushManager
              .getSubscription()
              .then(function (existedSubscription) {
                if (existedSubscription) {
                  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/unsubscribe`, {
                    method: "POST",
                    body: JSON.stringify({
                      device: JSON.stringify(existedSubscription),
                    }),
                    headers: {
                      "content-type": "application/json",
                    },
                  }).then(() => {
                    registration.unregister();
                    setSubscribed(false);
                  });
                }
              });
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    }
  };

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          height: 70,
          zIndex: theme.zIndex.appBar + 1,
          backdropFilter: `blur(6px)`,
          WebkitBackdropFilter: `blur(6px)`,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          transition: theme.transitions.create(["height"], {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { lg: 5 },
          }}
        >
          <Image alt="logo" src={LogoWithName.src} width={170} height={40} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Typography
              component={Link}
              href="#forecast-section"
              variant="subtitle1"
              color="text.primary"
              sx={{
                textDecoration: "none",
                "&:hover": { borderBottom: "5px solid #212B36" },
              }}
            >
              Forecast
            </Typography>
            <Typography
              component={Link}
              href="#about-section"
              variant="subtitle1"
              color="text.primary"
              sx={{
                textDecoration: "none",
                "&:hover": { borderBottom: "5px solid #212B36" },
              }}
            >
              Mission
            </Typography>
            <Typography
              component={Link}
              href="#model-section"
              variant="subtitle1"
              color="text.primary"
              sx={{
                textDecoration: "none",
                "&:hover": { borderBottom: "5px solid #212B36" },
              }}
            >
              Model
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="outlined"
              size="large"
              sx={{ color: "#000000", borderColor: "#000000" }}
              onClick={subscribed ? unsubscribeUser : subscribeUser}
            >
              {subscribed ? "Unsubscribe" : "Subscribe"}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
