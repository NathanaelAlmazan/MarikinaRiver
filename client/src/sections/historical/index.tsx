import HistoricalForm from "./HistoricalForm";
import { getHistoricalForecast } from "@/actions";

export default async function HistorySection() {
  const historicalData = await getHistoricalForecast();

  return <HistoricalForm history={historicalData} />;
}
