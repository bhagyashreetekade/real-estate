import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserdetailContext from "../../context/UserDetailContext";
import { updateFavourites } from "../../utils/common";
import { toFav } from "../../utils/api";

const Heart = ({id}) => {
  const [heartColor, setHeartColor] = useState("white");
  const {user}=useAuth0()

  const {
    userDetails:{favourites,token},
    setUserDetails,
  }=useContext(UserdetailContext)

//   useEffect(()=>{
//     setHeartColor(()=>checkFavourites(id,favourites))
//   },[favourites])

  //validate hook which is returning the validate login function
  const {validateLogin}=useAuthCheck()
  const {mutate}=useMutation({
    mutationFn:()=>toFav(id,user?.email,token),
    onSuccess:()=>{
        setUserDetails((prev)=>({
            ...prev,
            favourites:updateFavourites(id,prev.favourites)
        }))
    }
  })
  const handleLike=()=>{

    //if like button is red then turn to white and if white then to red
    if(validateLogin()){
        mutate()
        setHeartColor((prev)=>prev === "red"?"white":"red")
    }
  }

  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=>{
        e.stopPropagation()
        handleLike()
    }} />
  )
};

export default Heart;
