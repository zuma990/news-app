import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchNewsSearch } from "../features/newsSlice";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortBy, setSortBy] = useState<
    "popularity" | "relevancy" | "publishedAt"
  >("popularity");
  const dispatch = useDispatch<AppDispatch>();
  const handleSortByChange = (
    event: SelectChangeEvent<"popularity" | "relevancy" | "publishedAt">
  ) => {
    setSortBy(event.target.value as "popularity" | "relevancy" | "publishedAt");
  };
  const handleSearch = () => {
    setShowSortOptions(true);
    dispatch(
      fetchNewsSearch({
        query,
        sortBy: sortBy as "popularity" | "relevancy" | "publishedAt",
      })
    );
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          margin: "auto",
          marginTop: "30px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for news"
          inputProps={{ "aria-label": "search news" }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
        {showSortOptions && (
          <FormControl variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={handleSortByChange}
              label="Sort By"
            >
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="relevancy">Relevancy</MenuItem>
              <MenuItem value="publishedAt">Published At</MenuItem>
            </Select>
          </FormControl>
        )}
      </Paper>
    </div>
  );
}
