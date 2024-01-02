import logo from "./logo.svg";
import "./App.css";
//React

import { useEffect, useState } from "react";

// MUI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { changedResult } from "./weatherapiSlice";
import { fetchWeather } from "./weatherapiSlice";

moment.locale("ar");

let cancelAxios = null;

function App() {

  const dispatch = useDispatch();
  const result = useSelector((state) => {
    console.log("the state is state", state);
    return state.rsesult;
  });

  const isLoading = useSelector((state) => {
    console.log("==============*********", state);
    return state.weather.isLoading;
  });

  const temp = useSelector((state)=>{

return state.weather.weather;

  });

  const [dateAndTime, setDateAndTime] = useState("");
  const [lang, setLang] = useState("ar");
  // const [temp, setTemp] = useState({
  //   tempp: null,
  //   description: null,
  //   min: null,
  //   max: null,
  //   icon: null,
  // });
  const { t, i18n } = useTranslation();
  const direction = lang == "en" ? "ltr" : "rtl";

  function handleLanguage() {
    if (lang == "ar") {
      setLang("en");
      i18n.changeLanguage("en");
      moment.locale("en");
      setDateAndTime(moment().format("dddd | Do MMMM YYYY"));
    } else {
      setLang("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
      setDateAndTime(moment().format("dddd | Do MMMM YYYY"));
    }
  }

  useEffect(() => {
    console.log("calling dispatch function ");
    dispatch(fetchWeather());
    i18n.changeLanguage(lang);
  }, []);

  useEffect(() => {
    setDateAndTime(moment().format("dddd | Do MMMM YYYY"));
  }, []);
  return (
    <div className="App">
      <Container maxWidth="sm">
        {/* content Container */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* CARD */}
          <div
            dir={direction}
            style={{
              width: "100%",
              background: "orange",
              color: "white",
              padding: "10px",
              borderRadius: "10px 10px",
              boxShadow: "0px 11px 1px white",
            }}
          >
            {/* CONTENT */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* CITY AND TIME */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "satrt",
                }}
                dir={direction}
              >
                <Typography
                  dir={direction}
                  variant="h1"
                  style={{ marginRight: "20px", fontWeight: "600" }}
                >
                  {t("Jerusalem")}
                </Typography>

                <Typography variant="h5" style={{ marginRight: "20px" }}>
                  {dateAndTime}{" "}
                </Typography>
              </div>

              {/* Container of dgree and + cloude icon  */}
              <hr style={{ width: "100%" }} />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {/* DEGREE AND DESCRIPTION */}
                <div>
                  {/* Temp */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isLoading ? (<CircularProgress style={{ color: "white" }} />):("")}
                    
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.temp}
                    </Typography>
                    <img src={temp.tempIcon}/>
                  </div>
                  {/* == TEMP */}
                  <Typography variant="h6">{t(temp.tempDescription)}</Typography>
                  {/* MIN AND MAX */}

                  <div style={{ display: "flex" }}>
                    <h5>
                      {" "}
                      {t("Min")}: {temp.tempMin}{" "}
                    </h5>
                    <h5> &nbsp; | &nbsp; </h5>
                    <h5>
                      {" "}
                      {t("Max")}: {temp.tempMax}{" "}
                    </h5>
                  </div>
                </div>
                {/* == DEGREE AND DESCRIPTION == */}

                <CloudIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
            </div>
          </div>
          <div
            dir={direction}
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              marginTop: "15px",
            }}
          >
            <Button
              variant="text"
              style={{ color: "white", display: "flex" }}
              onClick={handleLanguage}
            >
              {lang == "en" ? "Arabic" : "انجليزي"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
