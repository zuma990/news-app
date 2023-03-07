import { CircularProgress, Grid, Paper, Select, Typography} from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import  { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import NewsCard from './NewsCard';
import { fetchTopHeadlines } from '../features/newsSlice';
import { Article } from '../types';
import SearchPage from './SearchPage';
import Pagination from '@mui/material/Pagination';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { articles, status, error, totalResults } = useSelector((state: RootState) => state.news);
    const [page, setPage] = useState(1);
    const [source, setSource] = useState('');

    useEffect(() => {
        dispatch(fetchTopHeadlines({}));
    }, [dispatch]);
    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        dispatch(fetchTopHeadlines({ page: newPage }));
    };
    const startIndex = (page - 1) * 20 + 1;
    const endIndex = Math.min(startIndex + 19, totalResults);
    const handleChangeSource = (event: SelectChangeEvent) => {
        setSource(event.target.value);
        dispatch(fetchTopHeadlines({ source: event.target.value }));
    };
    const uniqueSources = articles.reduce((sources: string[], article: Article) => {
        if (article.source.name && !sources.includes(article.source.name)) {
            sources.push(article.source.name);
        }
        return sources;
    }, []);
    const filteredArticles = source ? articles.filter((article: Article) => article.source.name === source) : articles;

    return (
        <div>
            <Container maxWidth="lg">
                <SearchPage />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <h2>Top Headlines</h2>
                            {status === 'loading' && <CircularProgress data-testid="loading-indicator" />}
                            {status === 'failed' && <p>{error}</p>}
                            {status === 'succeeded' && (
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel>Source</InputLabel>
                                            <Select value={source} onChange={handleChangeSource}>
                                                <MenuItem value="">All Sources</MenuItem>
                                                {uniqueSources.map((source: string) => (
                                                    <MenuItem key={source} value={source}>
                                                        {source}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                    </Grid>    <br/>
                                    <Grid container spacing={2}>
                                        {filteredArticles.map((article: Article) => (
                                            <Grid item xs={12} sm={6} md={4} key={article.url}>
                                                <NewsCard article={article} />
                                            </Grid>
                                        ))}
                                    </Grid><br />
                                    {totalResults > 20 && (
                                        <Grid container alignItems="center">
                                            <Grid item xs={6}>
                                                <Typography variant="body1">
                                                    Showing {startIndex} to {endIndex} of {totalResults} articles.
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Pagination
                                                    count={Math.ceil(totalResults / 20)}
                                                    page={page}
                                                    onChange={handleChangePage}
                                                    color="primary"
                                                    size="large"
                                                    showFirstButton={true}
                                                    showLastButton={true}
                                                />
                                            </Grid>
                                        </Grid>
                                    )}
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container><br />
        </div>
    );
}
export default Home;
