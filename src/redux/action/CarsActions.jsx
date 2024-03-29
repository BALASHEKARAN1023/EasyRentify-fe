import { message } from 'antd';
import axios from 'axios';
axios.defaults.baseURL = "https://easyrentify.onrender.com";
export const getAllCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/cars/getallcars')
        dispatch({ type: 'GET_ALL_CARS', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false })

    }
}


export const addCar = (reqObj, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        console.log(reqObj);
        await axios.post('/api/cars/addcar', reqObj)
        dispatch({ type: 'LOADING', payload: false })
        message.success("New car added succesfully");
        setTimeout(() => {
            navigate("/admin");
        }, 500)
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false })

    }
}


export const editCar = (reqObj, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/cars/editcar', reqObj)
        dispatch({ type: 'LOADING', payload: false })
        message.success("Car details updated  succesfully");
        setTimeout(() => {
            navigate("/admin");
        }, 500)
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false })

    }
}



export const deleteCar = (reqObj,navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/cars/deletecar', reqObj)
        dispatch({ type: 'LOADING', payload: false })
        message.success("Car deleted succesfully");
        setTimeout(() => {
            navigate("/home");
        }, 500)
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false })

    }
}