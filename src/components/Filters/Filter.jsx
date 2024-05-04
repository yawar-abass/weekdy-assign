"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const Filter = () => {
  return (
    <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      options={[
        { label: "The Shawshank Redemption", year: 1994 },
        { label: "The Godfather", year: 1972 },
        { label: "The Godfather: Part II", year: 1974 },
        { label: "The Dark Knight", year: 2008 },
      ]}
      sx={{ minWidth: "200px", padding: 0 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
};

export default Filter;
