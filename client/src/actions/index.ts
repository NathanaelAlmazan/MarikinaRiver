import prisma from "@/db";
import {
  river_forecast,
  weather_forecast,
  river_history,
  weather_history,
} from "@prisma/client";

export interface CurrentData {
  station: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  riverLevel: number;
}

export interface StationForecast {
  station: string;
  forecasts: Forecast[];
}

export interface Forecast {
  timestamp: Date;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  windDirection: string;
  description: string | null;
  riverLevel: number;
}

export interface StationHistory {
  station: string;
  record: HistoricalRecord;
}

export interface HistoricalRecord {
  timestamp: Date[];
  forecast: number[];
  history: number[];
}

const stations: { [key: string]: string } = {
  Nangka: "Nangka",
  Sto_Nino: "Manalo",
  Marcos: "Marcos",
  Tumana: "Tumana",
  Rosario: "Rosario",
  Manalo: "Manalo",
  San_Mateo: "Wawa",
  Rodriguez: "Wawa",
};

export async function getCurrentData(): Promise<CurrentData[]> {
  const weather = await prisma.weather_history.findMany({
    orderBy: {
      recorded_at: "desc",
    },
    take: 6,
  });

  const weatherData: { [key: string]: weather_history } = {};
  weather.forEach((w) => {
    weatherData[w.station] = w;
  });

  const river = await prisma.river_history.findMany({
    orderBy: {
      recorded_at: "desc",
    },
    take: 8,
  });

  const riverData: { [key: string]: river_history } = {};
  river.forEach((r) => {
    riverData[r.station] = r;
  });

  return Object.keys(stations).map((station) => ({
    station: station,
    timestamp: new Date(riverData[station].recorded_at),
    temperature: weatherData[stations[station]].temperature,
    humidity: weatherData[stations[station]].humidity,
    precipitation: weatherData[stations[station]].precipitation,
    windSpeed: weatherData[stations[station]].wind_speed,
    riverLevel: riverData[station].water_level,
  }));
}

export async function getForecast(): Promise<StationForecast[]> {
  // get date today
  const today = new Date();
  today.setHours(today.getHours() + 8);
  const current = today.toISOString().split("T")[0];

  const river: river_forecast[] = await prisma.$queryRaw`
      SELECT station,
        DATE(forecast_at) AS forecast_at,
        AVG(water_level) AS water_level
      FROM public.river_forecast 
      WHERE forecast_at >= TO_DATE(${current}, 'YYYY-MM-DD')
      GROUP BY DATE(forecast_at), station
      ORDER BY DATE(forecast_at) ASC;
  `;

  const weather: weather_forecast[] = await prisma.$queryRaw`
      SELECT station,
        DATE(forecast_at) AS forecast_at,
        AVG(temperature) AS temperature,
        AVG(humidity) AS humidity,
        AVG(precipitation) AS precipitation,
        AVG(wind_speed) AS wind_speed,
        MAX(description) AS description,
        MAX(wind_direction) AS wind_direction
      FROM public.weather_forecast 
      WHERE forecast_at >= TO_DATE(${current}, 'YYYY-MM-DD')
      GROUP BY DATE(forecast_at), station
      ORDER BY DATE(forecast_at) ASC;
  `;

  return Object.keys(stations).map((station) => {
    const riverData = river.filter((data) => data.station === station);
    const weatherData = weather.filter(
      (data) => data.station === stations[station]
    );

    return {
      station,
      forecasts: weatherData.map((data, index) => ({
        timestamp: new Date(data.forecast_at),
        temperature: data.temperature,
        humidity: data.humidity,
        precipitation: data.precipitation,
        windSpeed: data.wind_speed,
        windDirection: data.wind_direction,
        description: data.description,
        riverLevel:
          weatherData[0].precipitation <= data.precipitation
            ? riverData[0].water_level
            : riverData[index].water_level,
      })),
    };
  });
}

export async function getHistoricalForecast(): Promise<StationHistory[]> {
  const history: river_history[] = await prisma.$queryRaw`
    SELECT station,
      DATE(recorded_at) AS recorded_at,
      MAX(water_level) AS water_level
    FROM public.river_history 
    WHERE recorded_at BETWEEN '2020-01-01' AND '2024-01-01'
    GROUP BY DATE(recorded_at), station
    ORDER BY DATE(recorded_at) ASC;
  `;

  const forecast: river_forecast[] = await prisma.$queryRaw`
    SELECT station,
      DATE(forecast_at) AS forecast_at,
      MAX(water_level) AS water_level
    FROM public.river_forecast 
    WHERE forecast_at BETWEEN '2020-01-01' AND '2024-01-01'
    GROUP BY DATE(forecast_at), station
    ORDER BY DATE(forecast_at) ASC;
  `;

  return Object.keys(stations).map((station) => {
    const forecastData = forecast.filter((data) => data.station === station);
    const historicalData = history.filter((data) => data.station === station);

    return {
      station,
      record: {
        timestamp: historicalData.map((data) => new Date(data.recorded_at)),
        forecast: forecastData.map((data) => data.water_level),
        history: historicalData.map((data) => data.water_level),
      },
    };
  });
}
