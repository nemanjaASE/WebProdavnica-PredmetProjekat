import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import { login, googleLogin } from "../services/AuthService.js";

const decodeToken = (token) => {
    console.log("Token:", token);

    try {
      const decoded = jwtDecode(token);

      return decoded;
    } catch (error) {
      console.log("Error decoding token:", error);
      return null;
    }
  };

const exceptionRead = (value) => value.split(":")[1].split("at")[0];

const AuthContext = React.createContext({
    ulogovan: false,
    token: "",
    verifikacija: "",
    uloga: "",
    onLogout: () => {},
    onLogin: (logInData) => {},
    googleLogin: (loginData) => {},
  });

  export const AuthContextProvider = (props) => {

    const [ulogovan, setUlogovan] = useState(false);
    const [token, setToken] = useState("");
    const [verifikacija, setVerifikacija] = useState("");
    const [uloga, setUloga] = useState("");
  
    const navigate = useNavigate();
  
    useEffect(() => {

      const _ulogovan = sessionStorage.getItem("ulogovan");
      const _token = sessionStorage.getItem("token");
      const _uloga = sessionStorage.getItem("uloga");
      const _verifikacija = sessionStorage.getItem("verifikacija");
  
      if (_ulogovan === "1") {
        setUlogovan(true);
        setToken(_token);
        setUloga(_uloga);
        setVerifikacija(_verifikacija);
      }
    }, []);

    const logovanjeHandler = async (logInData) => {
        try {
          const response = await login(logInData);

          const decodedToken = decodeToken(response.data);

          let verification = decodedToken.Verification;
          let role =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
    
          setUlogovan(true);
          setToken(response.data);
          setUloga(role);
          setVerifikacija(verification);
    
          sessionStorage.setItem("ulogovan", "1");
          sessionStorage.setItem("token", response.data);
          sessionStorage.setItem("verifikacija", verification);
          sessionStorage.setItem("uloga", role);
          navigate("/dashboard");

        } catch (error) {
          alert(exceptionRead(error.response.data));
        }
      };

    const odjavaHandler = async () => {

        setUlogovan(false);
        sessionStorage.removeItem("ulogovan");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("verifikacija");
        sessionStorage.removeItem("uloga");
        navigate("/");
      };

      const googleLoginHandler = async (logInData) => {
        try {
          const response = await googleLogin(logInData);
    
          const decodedToken = decodeToken(response.data);
 
          let verification = decodedToken.Verification;
          let role =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
    
          setUlogovan(true);
          setToken(response.data);
          setUloga(role);
          setVerifikacija(verification);
    
          sessionStorage.setItem("ulogovan", "1");
          sessionStorage.setItem("token", response.data);
          sessionStorage.setItem("verifikacija", verification);
          sessionStorage.setItem("uloga", role);
          navigate("/dashboard");
        } catch (error) {
          if (error.response) alert(exceptionRead(error.response.data));
        }
      };

      return (
        <AuthContext.Provider
          value={{
            ulogovan: ulogovan,
            token: token,
            verifikacija: verifikacija,
            uloga: uloga,
            onLogout: odjavaHandler,
            onLogin: logovanjeHandler,
            googleLogin: googleLoginHandler,
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );

    ;}

    export default AuthContext;
