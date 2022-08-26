import axios from "axios";

const myElement = (element) => document.querySelector(element);
const API_BASE_URL = 'http://localhost:3001/api/v1/user/'

export const register = (firstName, lastName, email, password) => {
  return axios.post(API_BASE_URL + 'signup', {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = (username, password, setToken, navigate) => {
  axios.post(API_BASE_URL + 'login',{ email: username, password})
  .then((res) => {
    setToken(res.data.body.token);
    if(res.data.body.token){
      localStorage.setItem("user", JSON.stringify(res.data))
      navigate("/user/profile")
    }
  })
  .catch((err) => {
    const error = err.response.data.message;
    localStorage.removeItem("user");
    if(error === 'Error: User not found!'){
      myElement(".email-error").innerHTML = error
      myElement(".password-error").innerHTML = ''
    }else{
      myElement(".email-error").innerHTML = ''
      myElement(".password-error").innerHTML = error
    }
    if(error === "Error: data and hash arguments required"){
      myElement(".password-error").innerHTML = "Error: Password is required!"
    }
  })
  return true
}
