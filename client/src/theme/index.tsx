"use client";
import { Public_Sans } from "next/font/google";
import { alpha, createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const publicSans = Public_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const theme = createTheme({
  palette: {
    mode: "light",
    grey: {
      50: "#FFFFFF",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
    },
    primary: {
      light: "#73BAFB",
      main: "#1877F2",
      dark: "#0C44AE",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#C684FF",
      main: "#8E33FF",
      dark: "#5119B7",
      contrastText: "#FFFFFF",
    },
    success: {
      light: "#5BE49B",
      main: "#00A76F",
      dark: "#007867",
      contrastText: "#FFFFFF",
    },
    error: {
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      contrastText: "#FFFFFF",
    },
    warning: {
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      contrastText: "#212B36",
    },
    info: {
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      contrastText: "#FFFFFF",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    action: {
      hover: alpha("#919EAB", 0.15),
      selected: alpha("#919EAB", 0.16),
      disabled: alpha("#919EAB", 0.8),
      disabledBackground: alpha("#919EAB", 0.24),
      focus: alpha("#919EAB", 0.24),
      hoverOpacity: 0.15,
      disabledOpacity: 0.48,
      active: "#637381",
    },
    divider: alpha("#919EAB", 0.2),
    text: {
      primary: "#212B36",
      secondary: "#637381",
      disabled: "#919EAB",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F4F6F8",
    },
  },
  typography: {
    fontFamily: publicSans.style.fontFamily,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontWeight: 800,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
      fontWeight: 700,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 700,
      lineHeight: 24 / 14,
      fontSize: pxToRem(14),
      textTransform: "unset",
    },
  },
  shadows: [
    'none',
    `0px 2px 1px -1px ${alpha("#919EAB", 0.2)},0px 1px 1px 0px ${alpha("#919EAB", 0.14)},0px 1px 3px 0px ${alpha("#919EAB", 0.12)}`,
    `0px 3px 1px -2px ${alpha("#919EAB", 0.2)},0px 2px 2px 0px ${alpha("#919EAB", 0.14)},0px 1px 5px 0px ${alpha("#919EAB", 0.12)}`,
    `0px 3px 3px -2px ${alpha("#919EAB", 0.2)},0px 3px 4px 0px ${alpha("#919EAB", 0.14)},0px 1px 8px 0px ${alpha("#919EAB", 0.12)}`,
    `0px 2px 4px -1px ${alpha("#919EAB", 0.2)},0px 4px 5px 0px ${alpha("#919EAB", 0.14)},0px 1px 10px 0px ${alpha("#919EAB", 0.12)}`,
    `0px 3px 5px -1px ${alpha("#919EAB", 0.2)},0px 5px 8px 0px ${alpha("#919EAB", 0.14)},0px 1px 14px 0px ${alpha("#919EAB", 0.12)}`,
    `0px 3px 5px -1px ${alpha("#919EAB", 0.2)},0px 6px 10px 0px ${alpha("#919EAB", 0.14)},0px 1px 18px 0px ${alpha("#919EAB", 0.12)}`,
    `0px 4px 5px -2px ${alpha("#919EAB", 0.2)},0px 7px 10px 1px ${alpha("#919EAB", 0.14)},0px 2px 16px 1px ${alpha("#919EAB", 0.12)}`,
    `0px 5px 5px -3px ${alpha("#919EAB", 0.2)},0px 8px 10px 1px ${alpha("#919EAB", 0.14)},0px 3px 14px 2px ${alpha("#919EAB", 0.12)}`,
    `0px 5px 6px -3px ${alpha("#919EAB", 0.2)},0px 9px 12px 1px ${alpha("#919EAB", 0.14)},0px 3px 16px 2px ${alpha("#919EAB", 0.12)}`,
    `0px 6px 6px -3px ${alpha("#919EAB", 0.2)},0px 10px 14px 1px ${alpha("#919EAB", 0.14)},0px 4px 18px 3px ${alpha("#919EAB", 0.12)}`,
    `0px 6px 7px -4px ${alpha("#919EAB", 0.2)},0px 11px 15px 1px ${alpha("#919EAB", 0.14)},0px 4px 20px 3px ${alpha("#919EAB", 0.12)}`,
    `0px 7px 8px -4px ${alpha("#919EAB", 0.2)},0px 12px 17px 2px ${alpha("#919EAB", 0.14)},0px 5px 22px 4px ${alpha("#919EAB", 0.12)}`,
    `0px 7px 8px -4px ${alpha("#919EAB", 0.2)},0px 13px 19px 2px ${alpha("#919EAB", 0.14)},0px 5px 24px 4px ${alpha("#919EAB", 0.12)}`,
    `0px 7px 9px -4px ${alpha("#919EAB", 0.2)},0px 14px 21px 2px ${alpha("#919EAB", 0.14)},0px 5px 26px 4px ${alpha("#919EAB", 0.12)}`,
    `0px 8px 9px -5px ${alpha("#919EAB", 0.2)},0px 15px 22px 2px ${alpha("#919EAB", 0.14)},0px 6px 28px 5px ${alpha("#919EAB", 0.12)}`,
    `0px 8px 10px -5px ${alpha("#919EAB", 0.2)},0px 16px 24px 2px ${alpha("#919EAB", 0.14)},0px 6px 30px 5px ${alpha("#919EAB", 0.12)}`,
    `0px 8px 11px -5px ${alpha("#919EAB", 0.2)},0px 17px 26px 2px ${alpha("#919EAB", 0.14)},0px 6px 32px 5px ${alpha("#919EAB", 0.12)}`,
    `0px 9px 11px -5px ${alpha("#919EAB", 0.2)},0px 18px 28px 2px ${alpha("#919EAB", 0.14)},0px 7px 34px 6px ${alpha("#919EAB", 0.12)}`,
    `0px 9px 12px -6px ${alpha("#919EAB", 0.2)},0px 19px 29px 2px ${alpha("#919EAB", 0.14)},0px 7px 36px 6px ${alpha("#919EAB", 0.12)}`,
    `0px 10px 13px -6px ${alpha("#919EAB", 0.2)},0px 20px 31px 3px ${alpha("#919EAB", 0.14)},0px 8px 38px 7px ${alpha("#919EAB", 0.12)}`,
    `0px 10px 13px -6px ${alpha("#919EAB", 0.2)},0px 21px 33px 3px ${alpha("#919EAB", 0.14)},0px 8px 40px 7px ${alpha("#919EAB", 0.12)}`,
    `0px 10px 14px -6px ${alpha("#919EAB", 0.2)},0px 22px 35px 3px ${alpha("#919EAB", 0.14)},0px 8px 42px 7px ${alpha("#919EAB", 0.12)}`,
    `0px 11px 14px -7px ${alpha("#919EAB", 0.2)},0px 23px 36px 3px ${alpha("#919EAB", 0.14)},0px 9px 44px 8px ${alpha("#919EAB", 0.12)}`,
    `0px 11px 15px -7px ${alpha("#919EAB", 0.2)},0px 24px 38px 3px ${alpha("#919EAB", 0.14)},0px 9px 46px 8px ${alpha("#919EAB", 0.12)}`,
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#161C24", 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          color: "#FFFFFF",
          backgroundColor: "#212B36",
          '&:hover': {
            color: "#FFFFFF",
            backgroundColor: "#212B36",
          },
        },
        sizeLarge: {
          minHeight: 48,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 0 2px 0 ${alpha("#454F5B", 0.15)}, 0 12px 24px -4px ${alpha("#454F5B", 0.15)}`,
          borderRadius: 16,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          pt: 3,
          px: 3,
          pb: 0
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha("#919EAB", 0.24),
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#637381",
          backgroundColor: "#DFE3E8",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#212B36",
        },
        arrow: {
          color: "#212B36",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: 3,
        },
        gutterBottom: {
          marginBottom: 2,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          lineHeight: 22 / 14,
          fontSize: pxToRem(14),
        },
      },
    },
  }
});

export default theme;