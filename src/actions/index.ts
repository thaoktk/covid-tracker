import axiosClient from "../config/axiosCLient";

const getAllCountries = async () => {
  const res = await axiosClient.get("/countries");
  return res.data;
};

const getSummary = async () => {
  const res = await axiosClient.get("/summary");
  return res.data;
};

const getByCountry = async (slug: string) => {
  const res = await axiosClient.get(`/total/dayone/country/${slug}`);
  return res.data;
};

export { getAllCountries, getSummary, getByCountry };
