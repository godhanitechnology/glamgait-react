/* eslint-disable react-refresh/only-export-components */
import toast from "react-hot-toast";

export const ApiURL = import.meta.env.VITE_APP_URL;
export const razorpayKEY = import.meta.env.VITE_RAZORPAY_KEY;
export const SecretKey = import.meta.env.VITE_APP_SECRET_KEY;

export const userInfo = () => {
  try {
    const userData = localStorage.getItem("GlamGait");
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.log(error, "Error parsing UserData from Localstorage");
    return null;
  }
};

export const orderInfo = () => {
  try {
    const orderData = localStorage.getItem("OrderData");
    if (orderData) {
      return JSON.parse(orderData);
    }
    return null;
  } catch (error) {
    console.log(error, "Error parsing UserData from Localstorage");
    return null;
  }
};

export const showToaster = (status, description) => {
  if (status === 1) {
    toast.success(description, { autoClose: 3000 });
  } else {
    console.log(description, { autoClose: 3000 });
  }
};

export const validationFunction = {
  includes: (item) =>
    item == null || item === "" || item === undefined || item === "undefined",
};
