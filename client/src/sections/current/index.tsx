import { getCurrentData } from "@/actions";
import Carousel from "./Carousel";

export default async function CurrentWeatherSection() {
  const currentData = await getCurrentData();

  return (
    <Carousel data={currentData} />
  );
}
