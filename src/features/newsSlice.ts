import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../types';
import { fetchNews } from '../api/newsAPI';

interface NewsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    articles: Article[];
    totalResults: number;
    error: string | null;

}
const initialState: NewsState = {
    status: 'idle',
    articles: [],
    totalResults: 0,
    error: null,
};
export const fetchTopHeadlines = createAsyncThunk(
    'news/fetchTopHeadlines',
    async (options: { country?: string; category?: string; pageSize?: number; page?: number; source?: string } = {}) => {
        const { country = 'us', category = 'general', pageSize = 20, page = 1, source } = options;
        const response = await fetchNews({
            endpoint: 'top-headlines',
            country,
            category,
            pageSize,
            page,
             ...(source ? { sources: source } : {}),
        });
        const newArticles = response.data.articles;
        const allArticles = page === 1 ? newArticles.slice(0, pageSize) : newArticles;
        return {
            totalResults: response.data.totalResults,
            articles: allArticles,
        };
    }
);

export const fetchNewsSearch = createAsyncThunk(
    'news/fetchNewsSearch',
    async ({ query, sortBy }: { query: string, sortBy: 'popularity' | 'relevancy' | 'publishedAt' }) => {
        const pageSize = 20;
        const page =  1;
        const response = await fetchNews({
            endpoint: 'everything',
            q: query,
            pageSize,
            page,
            sortBy
        });
        return response.data;
    }
);
export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<'popularity' | 'relevancy' | 'publishedAt'>) => {
            return { ...state, sortBy: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopHeadlines.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload.articles;
                state.totalResults = action.payload.totalResults;
            })
            .addCase(fetchTopHeadlines.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchNewsSearch.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewsSearch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload.articles;
                state.totalResults = action.payload.totalResults;
            })
            .addCase(fetchNewsSearch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});
export default newsSlice.reducer;
