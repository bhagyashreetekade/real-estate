import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserdetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const {user}=useAuth0()
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  const {
    userDetails: { token,bookings },
    setUserDetails,
  } = useContext(UserdetailContext);

  // const {mutate:cancelBooking,isLoading:cancelling}=useMutation({
  //   mutationFn:()=>removeBooking(id,user?.email,token),
  //   onSuccess:()=>{
  //     setUserDetails((prev))
  //   }
  // })

  if (isLoading) {
    return (
      <div className="wrapper ">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like button */}
        <div className="like">
          <AiFillHeart size={24} color="white" />
        </div>

        {/* Image */}
        <img src={data?.image} alt="home image" />

        {/* div. */}

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities.bathrooms} Bathrooms</span>
              </div>
              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parkings</span>
              </div>
              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Room</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}
            <div className="flexStart">
              <MdLocationPin size={25} />
              <span className="secondaryText" style={{ gap: "1rem" }}>
                {data?.address}
                {data?.city}
                {data?.country}
              </span>
            </div>

            {/* booking button */}
            {
              bookings?.map((booking)=>booking.id).includes(id)?(
                <>
                <Button variant="outline" w={"100%"} color="red">
                  <span>Cancel Booking</span>
                </Button>
                <span>Your visit already booked for date {bookings?.filter((booking)=>booking?.id===id)[0].date}</span>
                </>
              ):
              (<button
              className="button"
              onClick={() => {
                validateLogin() && setModalOpened(true);
              }}
            >
              Book your visit
            </button>)}

            <BookingModal opened={modalOpened} setOpened={setModalOpened} propertyId={id} email={user?.email}/>
          </div>

          {/* right */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            ></Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
