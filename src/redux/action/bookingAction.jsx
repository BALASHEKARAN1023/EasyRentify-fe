import axios from 'axios';
import { message } from 'antd';

axios.defaults.baseURL = "https://easyrentify.onrender.com";

export const bookCar = (reqObj, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/bookings/bookcar', reqObj);
        dispatch({ type: 'LOADING', payload: false })
        message.success('Your Car booked succesfully')
        setTimeout(() => {
            navigate("/userbookings");
        }, 500);
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false });
        message.error("something went wrong,please try later");

    }
}


export const getAllBookings = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/bookings/getallbookings')
        dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false })

    }
}