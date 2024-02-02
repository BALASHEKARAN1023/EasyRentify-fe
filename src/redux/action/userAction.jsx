import { message } from "antd";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://easyrentify.onrender.com";
export const userLogin = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/users/login', reqObj)
        localStorage.setItem('users', JSON.stringify(response.data));
        const roleChecker = await response.data.role;
        if (roleChecker === "admin") {
            await message.success('Login Success')
            setTimeout(() => {

                window.location = "/admin";
            }, 500);
        } else {
            await message.success('Login Success')
            setTimeout(() => {

                window.location= "/home";
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

export const userRegister = (reqObj) => async dispatch => {
    const navigate = useNavigate();
    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('/api/users/register', reqObj);
        await message.success('Registeration Success')
        setTimeout(() => {
            navigate("/login");
            // window.location.href = "/login";
        }, 500);
        dispatch({ type: 'LOADING', payload: false })

    } catch (error) {
        console.log(error);
        await message.error('Something went worng')
        dispatch({ type: "LOADING", payload: false })

    }
}
