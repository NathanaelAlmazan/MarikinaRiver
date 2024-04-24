"use client";
import ApexChart from "react-apexcharts";
import { alpha, styled, useTheme } from '@mui/material/styles';

import { StationHistory } from "@/actions";

const Chart = styled(ApexChart)(({ theme }) => ({
  '& .apexcharts-canvas': {
    // Tooltip
    '& .apexcharts-tooltip': {
      backdropFilter: `blur(6px)`,
      WebkitBackdropFilter: `blur(6px)`,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      color: theme.palette.text.primary,
      boxShadow: `0 0 2px 0 ${alpha(theme.palette.grey[500], 0.24)}, -20px 20px 40px -4px ${alpha(theme.palette.grey[500], 0.24)}`,
      borderRadius: theme.shape.borderRadius * 1.25,
      '&.apexcharts-theme-light': {
        borderColor: 'transparent',
        backdropFilter: `blur(6px)`,
        WebkitBackdropFilter: `blur(6px)`,
        backgroundColor: alpha(theme.palette.background.default, 0.8)
      },
    },
    '& .apexcharts-xaxistooltip': {
      backdropFilter: `blur(6px)`,
      WebkitBackdropFilter: `blur(6px)`,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      borderColor: 'transparent',
      color: theme.palette.text.primary,
      boxShadow: `0 0 2px 0 ${alpha(theme.palette.grey[500], 0.24)}, -20px 20px 40px -4px ${alpha(theme.palette.grey[500], 0.24)}`,
      borderRadius: theme.shape.borderRadius * 1.25,
      '&:before': {
        borderBottomColor: alpha(theme.palette.grey[500], 0.24),
      },
      '&:after': {
        borderBottomColor: alpha(theme.palette.background.default, 0.8),
      },
    },
    '& .apexcharts-tooltip-title': {
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      color: theme.palette.text[theme.palette.mode === 'light' ? 'secondary' : 'primary'],
    },

    // LEGEND
    '& .apexcharts-legend': {
      padding: 0,
    },
    '& .apexcharts-legend-series': {
      display: 'inline-flex !important',
      alignItems: 'center',
    },
    '& .apexcharts-legend-marker': {
      marginRight: 8,
    },
    '& .apexcharts-legend-text': {
      lineHeight: '18px',
      textTransform: 'capitalize',
    },
  },
}));

export default function LineGraph({ history }: { history: StationHistory }) {
  const theme = useTheme();

  return (
    <Chart
      dir="ltr"
      type="line"
      series={[
        {
          name: "Forecast",
          type: "line",
          data: history.record.forecast,
        },
        {
          name: "Historical Data",
          type: "line",
          data: history.record.history,
        },
      ]}
      width="100%"
      options={{
        chart: {
          stacked: false,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          strokeColors: theme.palette.background.paper,
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return `${val.toFixed(0)}M`;
            },
          },
          title: {
            text: "River Level",
          },
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return `${val.toFixed(0)} meters`;
            },
          },
        },
        labels: history.record.timestamp.map(
          (date) => date.toISOString().split("T")[0]
        ),
        title: {
          text: 'River Level',
          align: 'left'
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
        stroke: {
          width: 3,
          curve: 'smooth',
          lineCap: 'round',
        },
        legend: {
          show: true,
          fontSize: '13rem',
          position: 'top',
          horizontalAlign: 'right',
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
        colors: [
          theme.palette.primary.main,
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.error.main,
          theme.palette.success.main,
          theme.palette.warning.dark,
          theme.palette.success.dark,
          theme.palette.info.dark
        ],
      }}
      height={364}
    />
  );
}
