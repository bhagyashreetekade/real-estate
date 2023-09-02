import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import {  checkFavourites, updateFavourites } from '../../utils/common'
import { toFav } from '../../utils/api'
import { useAuth0 } from '@auth0/auth0-react'
import UserdetailContext from '../../context/UserDetailContext'

const Heart = ({ id }) => {
    // console.log(id)
    const [heartColor, setHeartColor] = useState("white")
    const { validateLogin } = useAuthCheck()
    const { user } = useAuth0()

    const {
        userDetails: { favourites, token },
        setUserDetails
    } = useContext(UserdetailContext)

    useEffect(() => {
        console.log("favourites:", favourites);
        setHeartColor(() => checkFavourites(id, favourites))
    }, [favourites])

    const { mutate } = useMutation({
        mutationFn: () => toFav(id, user?.email, token), // API 
        onSuccess: () => {
            setUserDetails((prev) => (
                {
                    ...prev,
                    favourites:updateFavourites(id, prev.favourites)
                }
            ))
        }
    })
    //whether like or dislike it
    const handleLike = () => {
        if (validateLogin()) {

          //sending info to ther server using mutation function
            mutate()
            setHeartColor((prev) => prev === "#fa3e5f" ? "white" : "#fa3e5f")
        }
    }

    return (
        <AiFillHeart size={24} color={heartColor} onClick={(e) => {
            e.stopPropagation()
            handleLike()
        }
        } />
    )
}

export default Heart