import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, createHashRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserdetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";

const Layout = () => {

  useFavourites()
  // as we know layout is the first thing that is going to be render on application so here making some authentication related stuff in our layout

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserdetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email,token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res);
    };

    // if authentication is true then run mutate function
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        {/* outlet used in parent route elements to render their child route elements*/}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
