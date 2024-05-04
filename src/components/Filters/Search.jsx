"use client";
import React from "react";
import { TextField } from "@mui/material";
const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    // Pass the search query to the parent component
    // onSearch(searchQuery);
  };
  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
