import React from 'react'

const Facilities = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
  setOpened,
  setActiveStep
})  => {
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
        placeholder="Description"
        withAsterisk
        label="Description"
        {...form.getInputProps("description")}
      />

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back{" "}
        </Button>
        <Button type="submit">Next </Button>
      </Group>
    </form>
  </Box>
  )
}

export default Facilities
