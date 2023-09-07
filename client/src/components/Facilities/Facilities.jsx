import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useContext } from 'react'
import UserdetailContext from '../../context/UserDetailContext';
import useProperties from '../../hooks/useProperties';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Toast } from 'react-toastify/dist/components';
import { createResidency } from '../../utils/api';

const Facilities = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
  setOpened,
  setActiveStep
})  => {

    const form = useForm({
        initialValues: {
          bedrooms: propertyDetails?.bedrooms,
          parkings: propertyDetails?.parkings,
          bathrooms: propertyDetails?.bathrooms,
        },
        validate: {
          bedrooms: (value) =>(value < 1 ?"Must have atleast one room":null),
          bathrooms: (value) =>
            value < 1 ? "Must be atleast one bathroom" : null,
        },
      });
    
    const { bedrooms, parkings, bathrooms} = form.values;

    const handleSubmit = ()=>{
        const { hasErrors } = form.validate();
        if (!hasErrors) {
          setPropertyDetails((prev) => (
            {...prev,facilities: { bedrooms,parkings,bathrooms }}));
            mutate()
        }
    }

    //=======================upload logic

    const {user}=useAuth0()
    const {
        userDetails:{token},
    }=useContext(UserdetailContext)

    const {refetch:refetchProperties}=useProperties()


    const { mutate, isLoading } = useMutation({
        mutationFn: () => createResidency({
            ...propertyDetails,facilities:{bedrooms,parkings,bathrooms},
        },token),
        onError: ({ response }) => toast.error(response.data.message),
        onSettled: () => {
            toast.success("Added successfully",{position:"bottom-right"})
            setPropertyDetails({
                title: "",
                description: "",
                price: 0,
                address: "",
                city: "",
                country: "",
                image: null,
                facilities: {
                  bedrooms: 0,
                  parkings: 0,
                  bathrooms: 0,
                },
                userEmail:user?.email,
            })
            setOpened(false)
            setActiveStep(0)
            refetchProperties()
        },
      });

  return (
    <Box maw="30%" mx="auto" my="sm">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >

      <NumberInput
        min={0}
        withAsterisk
        label="No of Bedrooms"
        {...form.getInputProps("bedrooms")}
      />
      <NumberInput
        min={0}
        withAsterisk
        label="No of parkings"
        {...form.getInputProps("parkings")}
      />
      <NumberInput
        min={0}
        withAsterisk
        label="No of Bathrooms"
        {...form.getInputProps("bathrooms")}
      />

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" color='green' disabled={isLoading}>{isLoading ? "Submittings":"Add Property"}</Button>
      </Group>
    </form>
  </Box>
  )
}

export default Facilities
