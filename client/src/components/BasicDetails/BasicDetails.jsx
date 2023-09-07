import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Group,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails?.title,
      description: propertyDetails?.description,
      price: propertyDetails?.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? "Must be greater than 999 dollars" : null,
    },
  });

  const { title, description, price } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };
  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* left side */}
        {/* inputs */}

        <TextInput
          placeholder="Property Name"
          withAsterisk
          label="Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          withAsterisk
          label="Description"
          {...form.getInputProps("description")}
        />
       <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />


        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
