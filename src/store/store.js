import {configureStore} from "@reduxjs/toolkit";
import weatherReducer from './../reducers/weatherSlice';


export default configureStore({
    reducer:{
        weather: weatherReducer
    }
})