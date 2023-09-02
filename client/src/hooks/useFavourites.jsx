import React, { useContext, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { getAllFav } from '../utils/api';
import { useQuery } from 'react-query';
import UserdetailContext from '../context/UserDetailContext';


// useRef() is a hook in React that returns a mutable ref object. It's commonly used to access and interact with DOM elements or to persist values across renders without causing a re-render when the value changes.

const useFavourites = () => {
    const { userDetails, setUserDetails } = useContext(UserdetailContext)
    const queryRef = useRef();
    const { user } = useAuth0();

    // console.log(userDetails)
    
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: "allFavourites",
        queryFn: () => getAllFav(user?.email, userDetails?.token),
        onSuccess: (data) => setUserDetails((prev) => ({ ...prev, favourites : data })),
        enabled: user !== undefined,
        staleTime: 30000
    })

    queryRef.current = refetch;

    useEffect(() => {
        queryRef.current && queryRef.current();
    }, [userDetails?.token]);


    // After the 30-second staleTime has passed, the useQuery hook will initiate a background re-fetch to update the data of favorites from the database. This re-fetch ensures that the data remains fresh and up-to-date, even if the user is still interacting with the application.
    return {
        data, isError, isLoading, refetch
    }
}

export default useFavourites