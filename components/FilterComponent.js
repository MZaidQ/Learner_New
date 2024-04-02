import React, { useEffect, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import Classes from "/styles/filter.module.css";

const CheckBox = ({ data, accessKey }) => {
  return data.length ? (
    data.map((s, i) => {
      return (
        <FormControlLabel
          key={i}
          sx={{
            "& .MuiTypography-root": {
              fontSize: 14,
            },
          }}
          value={s[`${accessKey}`]}
          control={
            <Radio
              size="small"
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 14,
                },
              }}
            />
          }
          label={s[`${accessKey}`]}
        />
      );
    })
  ) : (
    <div>No Filter Found</div>
  );
};

const FilterComponent = ({
  type,
  heading,
  FilterType,
  onSelect,
  accessKey,
  Selectedfilter,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [filterData, setFilterData] = useState(true);
  const [searchData, setSearchData] = useState(true);
  const [width, setWidth] = useState("");

  const toggleDropdown = () => {
    if (width) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  const toggleDropdownMobile = (heading) => {
    let btnz = document.getElementById(`filter-box-btn-zones`);
    let btnr = document.getElementById(`filter-box-btn-ratings`);
    let btnc = document.getElementById(`filter-box-btn-courses`);
    let filterDivI = document.getElementById(`filter-box-zones`);
    let filterDivII = document.getElementById(`filter-box-ratings`);
    let filterDivIII = document.getElementById(`filter-box-courses`);

    btnz.classList.remove(`${Classes.activeZones}`);
    btnr.classList.remove(`${Classes.activeRatings}`);
    btnc.classList.remove(`${Classes.activeCourses}`);
    filterDivI.classList.remove(`${Classes.mobileShowZones}`);
    filterDivII.classList.remove(`${Classes.mobileShowRatings}`);
    filterDivIII.classList.remove(`${Classes.mobileShowCourses}`);

    if (heading == "Zones") {
      btnz.classList.add(`${Classes.activeZones}`);
      filterDivI.classList.add(Classes.mobileShowZones);
      // filterDivI.classList.add(`mobileShow${heading}`);
    } else if (heading == "Courses") {
      btnc.classList.add(`${Classes.activeCourses}`);
      filterDivIII.classList.add(Classes.mobileShowCourses);
    } else if (heading == "Ratings") {
      btnr.classList.add(`${Classes.activeRatings}`);
      filterDivII.classList.add(Classes.mobileShowRatings);
    }
  };
  const HandleChange = (e, data, type) => {
    setSearchData(false);
    if (type == "zones") {
      setFilterData(
        data.filter((ele) =>
          ele.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
    if (type == "ratings") {
      setFilterData(data.filter((ele) => ele.value.includes(e.target.value)));
    }
    if (type == "courses") {
      setFilterData(
        data.filter((ele) =>
          ele.course.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);
  return (
    <div className={`my-2 rounded ${Classes.filterBox}`}>
      {/* <div className="my-2  rounded filterBox"> */}
      <div  
        id={`filter-box-btn-${heading.toLowerCase()}`}
        className={`${Classes.filterdropdownline} ${
          width <= 1024 && heading == 'Zones' ? Classes.activeZones : ""
        }`}
        onClick={
          width <= 1024
            ? () => toggleDropdownMobile(heading)
            : () => toggleDropdown()
        } // Toggle the dropdown on click
      >
        <p
          className="my-0 ps-2 fw-bold uppercase"
          style={{ cursor: "pointer" }}
        >
          {heading}
        </p>
        <span
          className={`${
            isDropdownOpen ? Classes.arrowIconDown : Classes.arrowIcon
          }`}
        >
          <KeyboardArrowDownRoundedIcon />
        </span>
        {/* <span className={isDropdownOpen ? `${Classes.arrowIconDown}` : `${Classes.arrowIcon}`}><KeyboardArrowDownRoundedIcon /></span> */}
      </div>

      <div
        id={`filter-box-${heading.toLowerCase()}`}
        className={`${Classes.filterdropdown} ${
          isDropdownOpen ? Classes.show : ""
        } ${
          width <= 1024 && heading == "Zones" ? Classes.mobileShowZones : ""
        }`}
      >
        <div>
          <input
            className={Classes.searchFilter}
            placeholder="Search"
            onChange={(e) => {
              HandleChange(e, FilterType, type);
            }}
          />
        </div>
        <FormControl size="small" className="rounded-lg">
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={Selectedfilter}
            onChange={onSelect}
          >
            {searchData ? (
              <CheckBox data={FilterType} accessKey={accessKey} />
            ) : (
              <CheckBox data={filterData} accessKey={accessKey} />
            )}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterComponent;
