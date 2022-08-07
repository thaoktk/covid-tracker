import axios from "axios";
import { REACT_COVID_TRACKER_BASE_URL } from ".";

const axiosClient = axios.create({
  baseURL: REACT_COVID_TRACKER_BASE_URL,
});

export default axiosClient;
