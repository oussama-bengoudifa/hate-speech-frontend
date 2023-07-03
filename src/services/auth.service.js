import axios from "axios";

import { domain } from "../constants";

export const loginAdmin = async (values) => {
  try {
    const response = await axios.post(`${domain}/auth/login`, values);

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const registerAdmin = async (values) => {
  try {
    const response = await axios.post(`${domain}/auth/signup`, values);

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const refreshToken = async (refresh_token) => {
  try {
    const response = await axios.post(
      `${domain}/auth/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const getCode = async (token) => {
  try {
    const response = await axios.get(`${domain}/auth/code`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const forgetPassword = async (values) => {
  try {
    const response = await axios.post(`${domain}/auth/forget-password`, values);

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const resetPassword = async (values) => {
  try {
    const response = await axios.post(`${domain}/auth/reset-password`, values);

    // Handle the response data here
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};
