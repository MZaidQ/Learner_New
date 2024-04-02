import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FormControl,
  Button,
  Typography,
  Slider,
  Checkbox,
} from "@mui/material"; // Added Checkbox
import FilterComponent from "../../components/FilterComponent";
import AppliedFilterList from "../../components/AppliedFilterList";
import NewCollegeCard from "@/components/collegeNewCard";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import Classes from "../../styles/filter.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function index(testeligibility, filterCollege) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedZone, setSelectedZone] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [showToggleMenu, setHandleClickFilter] = React.useState(false);
  

  const HandleChangeFilter = (value) => {
    let element = document.getElementById("filter-cont");
    if (value == "open") {
      element.classList.add(`${Classes.filter_open}`);
      element.classList.remove(`${Classes.filter_close}`);
    } else if (value == "close") {
      element.classList.add(`${Classes.filter_close}`);
      element.classList.remove(`${Classes.filter_open}`);
    }
    // setHandleClickFilter(!showToggleMenu);
  };

  const [fee, setFee] = React.useState("200000");

  const collegeFilterData = async (
    zone,
    fee,
    course,
    rating,
    name,
    mobile,
    qualification,
    specialization
  ) => {
    setIsLoading(true);
    try {
      const newrating = testeligibility.ratings.find(
        (r) => r.label == rating
      )?.value;
      var queryParams = "?";

      if (zone && zone != undefined) {
        queryParams += `zone=${zone}`;
      }
      if (fee && fee != undefined) {
        queryParams += `&fee=${fee}`;
      }
      if (name && name != undefined) {
        queryParams += `&name=${name}`;
      }
      if (mobile && mobile != undefined) {
        queryParams += `&mobile=${mobile}`;
      }
      if (qualification && qualification != undefined) {
        queryParams += `&qualification=${encodeURIComponent(qualification)}`;
      }
      if (specialization && specialization != undefined) {
        queryParams += `&specialization=${encodeURIComponent(specialization)}`;
      }
      if (course && course != undefined) {
        queryParams += `&course=${course}`;
      }
      if (newrating && newrating != undefined) {
        queryParams += `&rating=${newrating}`;
      }
      const filterCollege_res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/colleges/filter${queryParams}`
      );
      const filterCollege = await filterCollege_res.json();
      setSearchResults(filterCollege.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching filtered colleges:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const { query } = router;
    if (Object.keys(query).length > 0) {
      const course = query.course;
      const zone = query.zone;
      var rating = query.rating;
      const feeParam = query.fee;
      const name = query.name;
      const mobile = query.mobile;
      const specialization = query.specialization;
      const qualification = query.qualification;
      if (rating) {
        rating = testeligibility.ratings.find((r) => r.value == rating).label;
      }

      if (course) {
        setSelectedCourse(course);
      }
      if (zone) {
        setSelectedZone(zone);
      }
      if (rating) {
        setSelectedRating(rating);
      }
      if (feeParam) {
        setFee(feeParam);
      }

      collegeFilterData(
        zone,
        feeParam,
        course,
        rating,
        name,
        mobile,
        qualification,
        specialization
      );
    } else {
      const course = "MBA";
      // zone = "North",
      // rating = "4 - 5",
      // fee = "500000"
      setSelectedCourse(course);
      // setSelectedZone(zone)
      // setSelectedRating(rating)
      // setFee(fee)
      collegeFilterData(selectedZone, fee, course, selectedRating);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedZone) {
      url.searchParams.set("zone", selectedZone);
    } else {
      url.searchParams.delete("zone");
    }
    if (fee == true || !fee) {
      url.searchParams.delete("fee");
    } else if (fee) {
      url.searchParams.set("fee", fee);
    }
    if (selectedCourse) {
      url.searchParams.set("course", selectedCourse);
    }
    const rating = testeligibility.ratings.find(
      (r) => r.label == selectedRating
    )?.value;
    if (rating) {
      url.searchParams.set("rating", rating);
    } else {
      url.searchParams.delete("rating");
    }
    window.history.replaceState({}, "", url);
  }, [selectedZone, fee, selectedCourse, selectedRating]);

  const handleSearch = () => {
    // Perform search based on searchTerm
    // Update searchResults state
  };

  const handleZoneSelect = (e, condition) => {
    if (condition) {
      setSelectedZone(e.target.value);
      collegeFilterData(e.target.value, fee, selectedCourse, selectedRating);
    } else {
      setSelectedZone("");
      collegeFilterData("", fee, selectedCourse, selectedRating);
    }
    // Handle zone selection
    // Update filtered data based on selected zone
  };
  const handleRatingSelect = (e, condition) => {
    // Handle zone selection
    // const rating = testeligibility.ratings.find(
    //   (r) => r.label == e.target.value
    // ).value;
    if (condition) {
      setSelectedRating(e.target.value);
      collegeFilterData(selectedZone, fee, selectedCourse, e.target.value);
    } else {
      setSelectedRating("");
      collegeFilterData(selectedZone, fee, selectedCourse, "");
    }

    // Update filtered data based on selected zone
  };
  const handleCourseSelect = (e) => {
    // Handle zone selection
    // const rating = testeligibility.ratings.find(
    //   (r) => r.label == selectedRating
    // ).value;
    setSelectedCourse(e.target.value);
    collegeFilterData(selectedZone, fee, e.target.value, selectedRating);

    // Update filtered data based on selected zone
  };
  const handleSliderChange = (event, newValue, condition) => {
    if (condition) {
      setFee(newValue);
      collegeFilterData(selectedZone, newValue, selectedCourse, selectedRating);
    } else {
      setFee("");
      collegeFilterData(selectedZone, "", selectedCourse, selectedRating);
    }
  };
  const formatFeeLabel = (value) => {
    if (value >= 100000) {
      return `${value / 100000} L`;
    }
    return value;
  };

  return (
    <div className="my-md-2 my-lg-5 my-sm-10">
      <Container>
        <Row>
          <Col md={3} id="filter-cont" className={Classes.filter_container}>
            <div className={Classes.filter_header}>
              <div className={Classes.filter_title}>
                <div onClick={() => {HandleChangeFilter("close")}}><ArrowBackIcon /></div>
                <div>FILTERS</div>
              </div>
            </div>
            {/* <section className="filter-body"> */}
              <FilterComponent
                type="zones"
                Selectedfilter={selectedZone}
                heading="Zones"
                accessKey="name"
                FilterType={testeligibility.zones}
                onSelect={handleZoneSelect}
              />
              <FilterComponent
                type="ratings"
                Selectedfilter={selectedRating}
                heading="Ratings"
                accessKey="label"
                FilterType={testeligibility.ratings}
                onSelect={handleRatingSelect}
              />
              <FilterComponent
                type="courses"
                Selectedfilter={selectedCourse}
                heading="Courses"
                accessKey="course"
                FilterType={testeligibility.courses}
                onSelect={handleCourseSelect}
              />
            {/* </section> */}
            <FormControl
              size="small"
              className={`rounded-lg ${Classes.feeFilter}`}
              // fullWidth
              margin="normal"
              style={{ width: "95%" }}
            >
              <Typography
                style={{ color: "#0151c1", fontWeight: "bold" }}
                id="input-slider"
                gutterBottom
              >
                Fees
              </Typography>
              <Slider
                value={fee}
                onChange={(e) => {
                  handleSliderChange(e, e.target.value, true);
                }}
                min={200000}
                max={5000000}
                step={100000}
                marks={[{ value: fee, label: formatFeeLabel(fee) }]}
                aria-labelledby="fee-slider"
              />
            </FormControl>
            <div
              className={Classes.filterDoneBtn}
              id="filterBtn"
              onClick={() => {
                HandleChangeFilter("close");
              }}
            >
              View Colleges
            </div>
          </Col>
          <Col className="col-lg-9 col-md-12">
          <div className={Classes["advance-filter-main"]}>
              <div
                className={Classes["advance-filter"]}
                onClick={() => {
                  HandleChangeFilter("open");
                }}
              >
                <TuneIcon /> Advance Filter
              </div>
            </div>
            <AppliedFilterList
              course={selectedCourse}
              rating={selectedRating}
              zone={selectedZone}
              fee={fee}
              onChangeZone={handleZoneSelect}
              onChangeRating={handleRatingSelect}
              onChangeFee={handleSliderChange}
            />


            <div style={{ overflow: "auto", height: "73vh", overflowX: 'hidden' }}>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <CircularProgress color="inherit" size={30} />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {searchResults && searchResults.length > 0 ? (
                    searchResults.map((college) => (
                      <NewCollegeCard college={college} />
                    ))
                  ) : (
                    <p>No records found.</p>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const testeligibility_res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/miscellaneous/testeligibility"
    );
    const testeligibility = await testeligibility_res.json();
    return { props: testeligibility };
  } catch (error) {
    throw error;
  }
}
