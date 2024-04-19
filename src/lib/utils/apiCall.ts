import axios from "axios";

export default async function getData(service: string, url: string) {
  try {
    const response = (await axios.get(url)).data;
    return response;
  } catch (e) {
    throw new Error(`Problem getting ${service} ${e}`);
  }
}
