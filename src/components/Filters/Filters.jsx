"use client";
import React from "react";
import Filter from "./Filter";
import { basePay, locations, minExperience, roles } from "@/Data/filters";

const Filters = ({ onFiltersChange, selectedFilters, companies }) => {
  const handleChangeFilters = (filterName, value) => {
    const updatedFilters = { ...selectedFilters, [filterName]: value };
    onFiltersChange(updatedFilters);
  };

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
        selectedValues={selectedFilters.minExperience?.value}
        onValuesChange={(event, values) =>
          handleChangeFilters("minExperience", values)
        }
      />
      <Filter
        filters={locations}
        label="Locations"
        isMultiple={false}
        selectedValues={selectedFilters.location}
        onValuesChange={(event, values) =>
          handleChangeFilters("location", values)
        }
      />
      <Filter
        filters={basePay}
        label="Minimum Base Pay"
        isMultiple={false}
        selectedValues={
          !selectedFilters.salary?.value
            ? selectedFilters.salary?.value
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
    </div>
  );
};

export default Filters;
