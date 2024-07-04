import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import {
  AuthProvider,
  useAuth,
} from "./services/api/context/authContext/AuthContext";
import { RouteConfig } from "./components/route/RouteConfig";
import Loader from "./components/shared/loader/Loader";
import { Toaster } from "react-hot-toast";
import ScrollToTop from './components/route/ScrollToTop'; 

const App = () => {
  const { apiLoader } = useAuth();

  if (apiLoader)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <BrowserRouter>
      <ScrollToTop />
        <div className="h-screen">
          <RouteConfig />
        </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <AuthProvider>
    <App />
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          borderRadius: "5px",
          background: "#646464",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "normal",
        },
        success: {
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
        },
        error: {
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
        },
      }}
    />
  </AuthProvider>,
  document.getElementById("app")
);
