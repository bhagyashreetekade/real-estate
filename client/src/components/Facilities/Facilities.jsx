import { Box, Button, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react'

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
            //mutate()
        }
    }


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
        <Button type="submit" color='green'>Add Property </Button>
      </Group>
    </form>
  </Box>
  )
}

export default Facilities
