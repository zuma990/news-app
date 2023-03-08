import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";

function ArticlePage() {
  const params = useParams();
  const navigate = useNavigate();
  const { articles } = useSelector((state: RootState) => state.news);
  const article = articles.find((a) => a.publishedAt === params.id);
  if (!article) {
    return (
      <Container>
        <Typography variant="h4">Article not found</Typography>
      </Container>
    );
  }
  const { title, author, description, content, publishedAt, urlToImage } =
    article;
  return (
    <div>
      <Container>
        <Typography variant="h4">{title}</Typography>
        <br />
        <Typography variant="subtitle1">
          By {author} | Published at {publishedAt}
        </Typography>
        <br />
        {urlToImage && (
          <img src={urlToImage} alt={title} style={{ width: "450px" }} />
        )}
        <Typography variant="body1">{description}</Typography>
        <br />
        <Typography variant="body1">{content}</Typography>
        <br />
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </Container>
    </div>
  );
}
export default ArticlePage;
