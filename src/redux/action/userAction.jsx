import { message } from "antd";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://easyrentify.onrender.com";
export const userLogin = (reqObj,navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/users/login', reqObj)
        localStorage.setItem('users', JSON.stringify(response.data));
        const roleChecker = await response.data.role;
        if (roleChecker === "admin") {
            await message.success('Login Success')
            setTimeout(() => {

                navigate("/admin");
            }, 500);
        } else {
            await message.success('Login Success')
            setTimeout(() => {

                navigate("/home"); 
            }, 500);
        }

        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error);
        message.error('Something went worng check userName or Password')
        dispatch({ type: "LOADING", payload: false })

    }
}

export const userRegister = (reqObj,navigate) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('/api/users/register', reqObj);
        await message.success('Registeration Success')
        setTimeout(() => {
            navigate("/login");
        }, 500);
        dispatch({ type: 'LOADING', payload: false })

    } catch (error) {
        console.log(error);
        await message.error('Something went worng')
        dispatch({ type: "LOADING", payload: false })

    }
}
