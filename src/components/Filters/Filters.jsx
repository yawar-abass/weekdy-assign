"use client";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import { basePay, locations, minExperience, roles } from "@/Data/filters";
import { getCompanies } from "@/utils/utils";

const Filters = ({ onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: "",
    location: "",
    salary: { label: "1L", value: 1 },
    companies: "",
  });

  const [companies, setCompanies] = useState([]);

  const handleChangeFilters = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters, onFiltersChange]);
  // console.log(selectedFilters.location);

  useEffect(() => {
    (async () => {
      const companies = await getCompanies();
      console.log(companies);
      setCompanies(companies);
    })();
  }, []);

  const handleSearch = (searchQuery) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      search: searchQuery.trim(),
    }));
  };

  return (
    <div className="flex flex-wrap gap-2 w-full ">
      <Filter
        filters={roles}
        label="Roles"
        selectedValues={selectedFilters.roles}
        isMultiple={true}
        onValuesChange={(event, values) => handleChangeFilters("roles", values)}
        isOptionEqualToValue={(option, value) => option.value === value}
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
        isOptionEqualToValue={(option, value) => option.value === value}
      />
      <Filter
        filters={locations}
        label="Locations"
        isMultiple={false}
        selectedValues={selectedFilters.location}
        onValuesChange={(event, values) =>
          handleChangeFilters("location", values)
        }
        isOptionEqualToValue={(option, value) => option.value === value}
      />
      <Filter
        filters={basePay}
        label="Minimum Base Pay"
        isMultiple={false}
        selectedValues={
          !selectedFilters.salary?.value
            ? selectedFilters.salary
            : selectedFilters.salary.value + "L"
        }
        onValuesChange={(event, values) =>
          handleChangeFilters("salary", values)
        }
        width="200px"
      />

      <Filter
        filters={companies}
        label="Companies"
        isMultiple={false}
        selectedValues={selectedFilters.companies}
        onValuesChange={(event, values) =>
          handleChangeFilters("companies", values)
        }
        width="200px"
      />

      {/* <Search onSearch={handleSearch} /> */}
    </div>
  );
};

export default Filters;
