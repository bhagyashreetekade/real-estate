import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Here we are specifying the base url os server
export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

//fetching all property
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

//Fetching one property
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong,Please try again");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    console.log(token);
    console.log(email);
    console.log(date);
    console.log(propertyId);
    await api.post(
      `user/bookVisit/${propertyId}`,
      {
        // Payloads/ Parameters
        email: email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/cancelBooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};


export const toFav=async (id,email,token)=>{
  try {
    await api.post(
      `/user/toFav/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
}

export const getAllFav=async (email,token)=>{
  if(!token) return

  try {
    const res=await api.post(
      `/user/allFav`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return res.data["favResidenciesID"]
    
  } catch (error) {
    toast.error("Something went wrong while fetching favourites");
    throw error;
  }
}

export const getAllBookings = async (email,token)=>{
  if(!token) return
  
  try {
    const res=await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return res.data["bookedVisits"]
    
  } catch (error) {
    toast.error("Something went wrong while fetching favourites");
    throw error;
  }
}