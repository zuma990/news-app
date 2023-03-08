import {Button, CircularProgress, Grid, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import NewsCard from './NewsCard'
import { fetchTopHeadlines } from '../features/newsSlice';
import { Article } from '../types';
import SearchPage from './SearchPage'
function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { articles, status, error, totalResults } = useSelector((state: RootState) => state.news);
    const [page, setPage] = useState(1);
    useEffect(() => {
        dispatch(fetchTopHeadlines({ }));
    }, [dispatch]);
    const handleLoadMore = () => {
        setPage(page + 1);
        dispatch(fetchTopHeadlines({ page: page + 1 }));
    };
    return (
        <div>
            <Container maxWidth="lg">
                <SearchPage />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <h2>Top Headlines News</h2>
                            {status === 'loading' && (
                                <CircularProgress data-testid="loading-indicator" />
                            )}
                            {status === 'failed' && <p>{error}</p>}
                            {status === 'succeeded' && (
                                <>
                                    <Grid container spacing={2}>
                                        {articles.map((article: Article) => (
                                            <Grid item xs={12} sm={6} md={4} key={article.url}>
                                                <NewsCard article={article} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {articles.length < totalResults && (
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" onClick={handleLoadMore}>
                                                Load More
                                            </Button>
                                        </Grid>
                                    )}
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default Home;
