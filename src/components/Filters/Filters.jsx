"use client";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { basePay, minExperience, remote, roles } from "@/Data/filters";
import { getLocations } from "@/utils/utils";

const Filters = ({ onFiltersChange, selectedFilters, companies }) => {
  const [locations, setLocations] = useState([]);
  const [isRemoteSelected, setIsRemoteSelected] = useState(false);
  useEffect(() => {
    let temp = false;

    (async () => {
      if (temp) return;
      const locations = await getLocations();
      setLocations(locations);
    })();
    return () => (temp = true);
  }, []);

  useEffect(() => {
    if (selectedFilters.remote?.value?.toLowerCase() === "remote") {
      setIsRemoteSelected(true);
    } else {
      setIsRemoteSelected(false);
    }
  }, [selectedFilters.remote]);

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
        filters={remote}
        label="Remote"
        isMultiple={false}
        selectedValues={selectedFilters.remote}
        onValuesChange={(event, values) =>
          handleChangeFilters("remote", values)
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
      <Filter
        filters={locations}
        label="Locations"
        isMultiple={false}
        selectedValues={selectedFilters.location}
        onValuesChange={(event, values) =>
          handleChangeFilters("location", values)
        }
        width="200px"
        disabled={isRemoteSelected}
      />
    </div>
  );
};

export default Filters;
