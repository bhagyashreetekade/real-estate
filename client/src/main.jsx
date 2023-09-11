import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-52ewzcoek5jdsm0n.us.auth0.com"
      clientId="Lzer21EXFGrkrJPsaqdCrzFNvaqLG7ns"
      authorizationParams={{
        redirect_uri: "https://real-estate-ashen-gamma.vercel.app/",
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
