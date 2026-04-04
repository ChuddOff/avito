import axios, { type CreateAxiosDefaults } from "axios";

const option: CreateAxiosDefaults = {
  baseURL: "http://localhost:8080",
};

export const http = axios.create(option);
