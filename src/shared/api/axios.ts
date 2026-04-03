import axios, { type CreateAxiosDefaults } from "axios";
import { env } from "./env";

const BASE_URL = env.BASE_URL;

const option: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  withCredentials: true,
};

export const http = axios.create(option);
