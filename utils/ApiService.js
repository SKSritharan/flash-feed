import axios from "axios";

const BASE_URL = "https://newsapi.org/v2";
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

const BREAKING_NEWS_URL = `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;
const RECOMMENDED_NEWS_URL = `${BASE_URL}/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

const DISCOVER_NEWS_URL = (category) =>
  `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

const SEARCH_NEWS_URL = (query) =>
  `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`;

const newsApiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchBreakingNews = async () => {
  return await newsApiCall(BREAKING_NEWS_URL);
};

export const fetchRecommendedNews = async () => {
  return await newsApiCall(RECOMMENDED_NEWS_URL);
};

export const fetchDiscoverNews = async (category) => {
  return await newsApiCall(DISCOVER_NEWS_URL(category));
};

export const fetchSearchNews = async (query) => {
  const endpoint = SEARCH_NEWS_URL(query);
  return await newsApiCall(endpoint);
};
