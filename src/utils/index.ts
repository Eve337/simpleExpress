import { RouteUrls } from "../constants/routes";

export const buildUrl = (endpoint: string): string => RouteUrls.API + endpoint;
