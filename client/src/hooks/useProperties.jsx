import React from 'react'
import { useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'

const useProperties = () => {

    const {data,isLoading,isError,refetch}=useQuery(
        //this means name of the query is allProperties
        "allProperties",getAllProperties,{refetchOnWindowFocus:false}
    )
  return {
    data,isError,isLoading,refetch
  }
}

export default useProperties
