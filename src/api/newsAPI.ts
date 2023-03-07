import axios from 'axios';
import { NewsResponse } from '../types';

const API_KEY = '45ac550c92d04548afc56b70b9ee887a';
const API_URL = 'https://newsapi.org/v2';

interface FetchNewsOptions {
    endpoint: 'top-headlines' | 'everything';
    q?: string;
    pageSize?: number;
    page?: number;
    country?: string;
    category?: string;
    sortBy?: 'popularity' | 'relevancy' | 'publishedAt';
}
export const fetchNews = async (
    options: FetchNewsOptions
): Promise<{ data: NewsResponse }> => {
    const { endpoint, q = '', pageSize = 20, page = 1, country, category, sortBy } = options;
    const params = {
        q,
        pageSize,
        page,
        apiKey: API_KEY,
        country,
        category,
        sortBy
    };
    const url = `${API_URL}/${endpoint}`;
    try {
        const response = await axios.get(url, { params });
        return { data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message ?? 'An error occurred while fetching news.');
        } else {
            throw error;
        }
    }
};
