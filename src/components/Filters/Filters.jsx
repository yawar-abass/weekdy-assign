"use client";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import { minExperience, roles } from "@/Data/filters";

const Filters = ({ onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: "",
  });

  const handleChangeFilters = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters, onFiltersChange]);
  console.log(selectedFilters);

  return (
    <div className="flex flex-wrap gap-2 w-full ">
      <Filter
        filters={roles}
        label="Roles"
        selectedValues={selectedFilters.roles}
        isMultiple={true}
        onValuesChange={(event, values) => handleChangeFilters("roles", values)}
        width="130px"
      />
      <Filter
        filters={minExperience}
        label="Experience"
        isMultiple={false}
        selectedValues={selectedFilters.minExperience}
        onValuesChange={(event, values) =>
          handleChangeFilters("minExperience", values)
        }
      />
      <Filter filters={roles} label="Roles" />
      <Filter filters={roles} label="Roles" />
      <Filter filters={roles} label="Roles" />

      <Search />
    </div>
  );
};

export default Filters;
