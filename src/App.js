import logo from "./logo.svg";
import "./App.css";
//React

import { useEffect, useState } from "react";

// MUI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("ar");

let cancelAxios = null;

function App() {
  // const dateAndTime = moment().format("MMMM Do YYYY, h:mm:ss a"); // December 30th 2023, 4:42:08 pm
  const [dateAndTime, setDateAndTime] = useState("");
  const [lang, setLang] = useState("ar");
  const [temp, setTemp] = useState({
    tempp: null,
    description: null,
    min: null,
    max: null,
    icon: null,
  });
  const { t, i18n } = useTranslation();
  const direction =  lang == "en" ? "ltr": "rtl"

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
    i18n.changeLanguage(lang);
  }, []);
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.76&lon=35.21&appid=2b8e0bc57fe3a697807123344e5c2f5b",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.19);
        const responseDescription = response.data.weather[0].description;
        const responseMinTemp = Math.round(
          response.data.main.temp_min - 272.19
        );
        const responseMaxTemp = Math.round(
          response.data.main.temp_max - 272.19
        );
        const responseIconTemp = response.data.weather[0].icon;

        setTemp({
          tempp: responseTemp,
          description: responseDescription,
          min: responseMinTemp,
          max: responseMaxTemp,
          icon: `https://openweathermap.org/img/wn/${responseIconTemp}@2x.png`,
        });
        console.log(responseTemp, responseDescription);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      console.log("canceling axios");
      cancelAxios();
    };
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
                  flexDirection:"column",
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
              <hr style={{width:"100%"}}/>
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
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.tempp}
                    </Typography>
                    <img src="https://openweathermap.org/img/wn/10d@2x.png" />
                  </div>
                  {/* == TEMP */} 
                  <Typography variant="h6">{t(temp.description)}</Typography>
                  {/* MIN AND MAX */}

                  <div style={{ display: "flex" }}>
                    <h5>
                      {" "}
                      {t("Min")}: {temp.min}{" "}
                    </h5>
                    <h5> &nbsp; | &nbsp; </h5>
                    <h5>
                      {" "}
                      {t("Max")}: {temp.max}{" "}
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
            style={{ display: "flex", justifyContent: "end", width: "100%" , marginTop:"15px" }}
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
