import ApexChart from "react-apexcharts";
import { alpha, styled, useTheme } from "@mui/material/styles";

const Chart = styled(ApexChart)(({ theme }) => ({
  "& .apexcharts-canvas": {
    // Tooltip
    "& .apexcharts-tooltip": {
      backdropFilter: `blur(6px)`,
      WebkitBackdropFilter: `blur(6px)`,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      color: theme.palette.text.primary,
      boxShadow: `0 0 2px 0 ${alpha(
        theme.palette.grey[500],
        0.24
      )}, -20px 20px 40px -4px ${alpha(theme.palette.grey[500], 0.24)}`,
      borderRadius: theme.shape.borderRadius * 1.25,
      "&.apexcharts-theme-light": {
        borderColor: "transparent",
        backdropFilter: `blur(6px)`,
        WebkitBackdropFilter: `blur(6px)`,
        backgroundColor: alpha(theme.palette.background.default, 0.8),
      },
    },
    "& .apexcharts-xaxistooltip": {
      backdropFilter: `blur(6px)`,
      WebkitBackdropFilter: `blur(6px)`,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      borderColor: "transparent",
      color: theme.palette.text.primary,
      boxShadow: `0 0 2px 0 ${alpha(
        theme.palette.grey[500],
        0.24
      )}, -20px 20px 40px -4px ${alpha(theme.palette.grey[500], 0.24)}`,
      borderRadius: theme.shape.borderRadius * 1.25,
      "&:before": {
        borderBottomColor: alpha(theme.palette.grey[500], 0.24),
      },
      "&:after": {
        borderBottomColor: alpha(theme.palette.background.default, 0.8),
      },
    },
    "& .apexcharts-tooltip-title": {
      textAlign: "center",
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      color:
        theme.palette.text[
          theme.palette.mode === "light" ? "secondary" : "primary"
        ],
    },

    // LEGEND
    "& .apexcharts-legend-series": {
      display: "inline-flex !important",
      alignItems: "center",
    },
    "& .apexcharts-legend-marker": {
      marginRight: 8,
    },
    "& .apexcharts-legend-text": {
      lineHeight: "18px",
      textTransform: "capitalize",
    },
    height: 364,
    "& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject": {
      height: `100% !important`,
    },
    "& .apexcharts-legend": {
      padding: 0,
    },
  },
}));


const importance = [
  {
    id: 1,
    title: 'Precipitation',
    value: 48,
    color: '#0A8FDC',
  },
  {
    id: 3,
    title: 'Temperature',
    value: 31,
    color: '#ff3939',
  },
  {
    id: 4,
    title: 'Wind Speed',
    value: 16,
    color: '#F04F47',
  },
  {
    id: 2,
    title: 'Humidity',
    value: 5,
    color: '#54B435',
  },
];


export default function PieGraph() {
  const theme = useTheme();
  return (
    <Chart
        dir="ltr"
        type="pie"
        series={importance.map((i) => i.value)}
        options={{
          chart: {
            sparkline: {
              enabled: true,
            },
          },
          colors: importance.map(i => i.color),
          labels: importance.map((i) => i.title),
          stroke: {
            colors: [theme.palette.background.paper],
          },
          legend: {
            show: true,
            fontSize: '13rem',
            position: 'top',
            horizontalAlign: 'center',
            markers: {
              radius: 12,
            },
            fontWeight: 500,
            itemMargin: {
              horizontal: 8,
            },
            labels: {
              colors: theme.palette.text.secondary,
            },
          },
          dataLabels: {
            enabled: true,
            dropShadow: {
              enabled: false,
            },
          },
          tooltip: {
            fillSeriesColor: false,
            y: {
              formatter: (value) => `${value}%`,
              title: {
                formatter: (seriesName) => `${seriesName}`,
              },
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                },
              },
            },
          },
          states: {
            hover: {
              filter: {
                type: 'lighten',
                value: 0.04,
              },
            },
            active: {
              filter: {
                type: 'darken',
                value: 0.88,
              },
            },
          },
        }}
        width="100%"
        height={364}
    />
  );
}
