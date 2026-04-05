import axios, { type CreateAxiosDefaults } from "axios";

const option: CreateAxiosDefaults = {
  baseURL: "https://avito-jvbe.vercel.app",
};

export const http = axios.create(option);
