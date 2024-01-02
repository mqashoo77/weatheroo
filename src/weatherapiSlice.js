import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=31.76&lon=35.21&appid=2b8e0bc57fe3a697807123344e5c2f5b",
    
  );
  const responseTemp = Math.round(response.data.main.temp - 272.19);
  const responseDescription = response.data.weather[0].description;
  const responseMinTemp = Math.round(response.data.main.temp_min - 272.19);
  const responseMaxTemp = Math.round(response.data.main.temp_max - 272.19);
  const responseIconTemp = response.data.weather[0].icon;

  console.log("calling fetch weather", response);

  return {
    temp: responseTemp,
    tempDescription: responseDescription,
    tempMax: responseMaxTemp,
    tempMin: responseMinTemp,
    tempIcon : `https://openweathermap.org/img/wn/${responseIconTemp}@2x.png` 
    
};
  
});
const initialState = {
  result: "empty",
  weather: {},
  isLoading: false,
};

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState,
  reducers: {
    changedResult: (state, action) => {
      state.result = "changed";
    },
  },
  // extra reducers
  extraReducers(builder){
    builder.addCase(fetchWeather.pending, (state, action)=>{
        console.log("recived weatherApi/fetchWeather/pending")

        state.isLoading = true;
    }).addCase(fetchWeather.fulfilled, (state, action)=>{
        console.log("==============*********", state, action);
        state.weather = action.payload; //mutation in redux is FREE

        state.isLoading = false; 
    }).addCase(fetchWeather.rejected,(state, action)=>{
        state.isLoading = false;
    })
  }
});

// Action creators are generated for each case reducer function
export const { changedResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
