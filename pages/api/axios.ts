import { BASE_URL } from "constants/path";
import axios from "axios";

export const instance = axios.create({
  baseURL: BASE_URL,
});
