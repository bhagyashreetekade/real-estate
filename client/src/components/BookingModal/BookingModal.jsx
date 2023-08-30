import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {useMutation} from "react-query";
import UserDetailContext from "../../context/UserDetailContext";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {


  const [value, setValue] = useState(null);
  const { userDetails :{token}} = useContext(UserDetailContext);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
  });
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        {/*when we are using the react query we try to use muted function when wehave to upload some data to other database  */}
        <Button disabled={!value} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
