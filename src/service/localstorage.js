import axios from "axios";
export const afterLoginStorage = async (onSuccess = () => {}) => {
  const URL = process.env.REACT_APP_PROD_API;
  try {
    const user = localStorage.getItem("user");
    if (user) {
      const url = `${URL}/api/affiliates`;
      try {
        const userData = JSON.parse(user);
        const accessToken = userData.data.access_token;
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        localStorage.setItem("res", JSON.stringify(res));
        onSuccess(res);
        return res.data;
      } catch (error) {
        console.error("Error parsing user data:", error);
        throw error;
      }
    } else {
      console.log("User data not found in local storage.");
      throw new Error("User data not found in local storage.");
    }
  } catch (error) {
    console.log("error while get request:", error);
    throw error;
  }
};

export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("auth");
  window.location.reload();
};

export const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("token");

  // const result = localStorage.getItem("user");
  const user = JSON.parse(userData); // Parse the JSON data

  return user;
};

export const getResFromLocalStorage = () => {
  const resData = localStorage.getItem("res");
  const res = JSON.parse(resData); // Parse the JSON data

  return res;
};
