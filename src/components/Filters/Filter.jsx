"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const Filter = ({
  filters,
  label,
  selectedValues,
  onValuesChange,
  width,
  isMultiple,
  isOptionEqualToValue,
}) => {
  // const selectedValues = React.useMemo(
  //   () => allValues.filter((v) => v.selected),
  //   [allValues],
  // );
  return (
    <div>
      <Autocomplete
        multiple={isMultiple}
        disablePortal
        id="combo-box-demo"
        options={filters}
        value={selectedValues}
        onChange={onValuesChange}
        sx={{ minWidth: width ?? "150px", fontSize: "11px", padding: "0" }}
        renderInput={(params) => <TextField {...params} label={label} />}
        // isOptionEqualToValue={isOptionEqualToValue}
      />
    </div>
  );
};

export default Filter;
