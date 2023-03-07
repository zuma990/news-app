import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Article } from '../types';
import img from '../images/default-news.jpg'
import {useNavigate} from "react-router-dom";

interface NewsCardProps {
    article: Article;
}

function NewsCard({ article }: NewsCardProps) {
    const navigate = useNavigate()
    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) {
            return text;
        }
        return `${text.substring(0, maxLength)}...`;
    }
    return (
        <Card sx={{ width: 345, height:300 }}>
            <CardActionArea>
               {article.urlToImage !== null ? (
                    <CardMedia
                        component="img"
                        height="140"
                        image={article.urlToImage}
                        title={article.title}
                    />
                ) : (
                   <CardMedia
                       component="img"
                       height="140"
                       image={img}
                       title={article.title}
                   />
                ) }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {truncateText(article.title, 30)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => navigate(`/${article.publishedAt}`)}>
                    Read full article
                </Button>
            </CardActions>
        </Card>
    );
}
export default NewsCard;
