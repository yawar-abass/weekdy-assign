"use client";
import React, { useState } from "react";
import { TextField } from "@mui/material";
const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    onSearch(searchQuery);
  };
  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
