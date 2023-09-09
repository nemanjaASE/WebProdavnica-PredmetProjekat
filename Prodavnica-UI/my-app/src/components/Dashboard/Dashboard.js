import React, { useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.js";
import { Box, Button } from "@mui/material";
import {
  FormatListBulleted,
  ShoppingCart,
  Groups,
  LocalMall,
} from "@mui/icons-material";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
  
    const role = authCtx.uloga;
    const verification = authCtx.verifikacija;
  
    const isAdmin = role === "ADMINISTRATOR";
    const isCustomer = role === "KUPAC";
    const isSalesman = role === "PRODAVAC";
    const isVerified = verification === "PRIHVACENA";
  
    const profileHandler = async (event) => {
        navigate("/profile");
      };
      const verificationHandler = async (event) => {
        navigate("/verification");
      };
    
      const ordersHandler = async () => {
        navigate("/orders");
      };
    
      const productHandler = async () => {
        navigate("/product");
      };
    
      const shopHandler = async () => {
        navigate("/shop");
      };

    return (
      <>
        <NavBar />

        {isAdmin && (
        <Box
          sx={{
            display: "row",
            justifyContent: "left",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "lightgray",
            paddingTop: 5,
            paddingLeft: 1,
          }}
        >
          <Box sx={{ m: 1 }}>
            <Button
              sx={{
                color: "#141e30",
                fontSize: "14px",
                padding: "5px 5px",
                width: "180px",
                display: "flex",
                justifyContent: "left",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "crimson",
                  color: "white",
                },
              }}
              variant="contained"
              startIcon={

                <AccountBoxIcon
                  sx={{ fontSize: "30px", height: "30px", width: "40px" }}

                />
              }
              size="medium"
              color="primary"
              onClick={profileHandler}
            >
              Moj profil
            </Button>
          </Box>
          <Box sx={{ m: 1 }}>
            <Button
              sx={{
                color: "#141e30",
                fontSize: "14px",
                padding: "5px 5px",
                width: "180px",
                display: "flex",
                justifyContent: "left",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "crimson",
                  color: "white",
                },
              }}
              variant="contained"
              startIcon={
                <GroupsIcon
                  sx={{ fontSize: "30px", width: "30px", height: "40px" }}
                />
              }
              size="large"
              color="primary"
              onClick={verificationHandler}
            >
              Verifikacija
            </Button>
          </Box>
          <Box sx={{ m: 1 }}>
            <Button
              sx={{
                color: "#141e30",
                fontSize: "14px",
                padding: "5px 5px",
                width: "180px",
                display: "flex",
                justifyContent: "left",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "crimson",
                  color: "white",
                },
              }}
              variant="contained"
              startIcon={
                <FormatListBulletedIcon
                  sx={{ fontSize: "30px", width: "30px", height: "40px" }}
                />
              }
              size="large"
              color="primary"
              onClick={ordersHandler}
            >
              Porudžbine
            </Button>
          </Box>
        </Box>
      )}

    {isCustomer && (
        <Box
          sx={{
            display: "row",
            justifyContent: "left",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "lightgray",
            paddingTop: 5,
            paddingLeft: 1,
          }}
        >
          <Box sx={{ m: 1 }}>
            <Button
              sx={{
                color: "#141e30",
                fontSize: "14px",
                padding: "5px 5px",
                width: "180px",
                display: "flex",
                justifyContent: "left",
                backgroundColor:"white",
                "&:hover": {
                  backgroundColor: "crimson",
                  color: "white",
                },
              }}
              variant="contained"
              startIcon={
                <AccountBoxIcon
                  sx={{ fontSize: "30px", width: "30px", height: "40px" }}
                />
              }
              size="large"
              color="primary"
              onClick={profileHandler}
            >
              Moj profil
            </Button>
          </Box>
          <Box sx={{ m: 1 }}>
            <Button
              sx={{
                color: "#141e30",
                fontSize: "14px",
                padding: "5px 5px",
                width: "180px",
                display: "flex",
                justifyContent: "left",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "crimson",
                  color: "white",
                },
              }}
              variant="contained"
              startIcon={
                <FormatListBulletedIcon
                  sx={{ fontSize: "30px", width: "30px", height: "40px" }}
                />
              }
              size="large"
              color="primary"
              onClick={ordersHandler}
            >
              Porudžbine
            </Button>
          </Box>
          <Box sx={{ m: 1 }}>
            <Button
              sx={{
                color: "#141e30",
                fontSize: "14px",
                padding: "5px 5px",
                width: "180px",
                display: "flex",
                justifyContent: "left",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "crimson",
                  color: "white",
                },
              }}
              variant="contained"
              startIcon={
                <AddShoppingCartIcon
                  sx={{ fontSize: "30px", width: "30px", height: "40px" }}
                />
              }
              size="large"
              color="primary"
              onClick={shopHandler}
            >
              Prodavnica
            </Button>
          </Box>
        </Box>
      )}

    {isSalesman && (
        <Box
          sx={{
            display: "row",
            justifyContent: "left",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "lightgray",
            paddingTop: 5,
            paddingLeft: 1,
          }}
        >
          <Box sx={{ m: 2 }}>
            <Button
              sx={{
                color: "#141e30",
                fontSize: "14px",
                padding: "5px 5px",
                width: "180px",
                display: "flex",
                justifyContent: "left",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "crimson",
                  color: "white",
                },
              }}
              variant="contained"
              startIcon={
                <AccountBoxIcon
                  sx={{ fontSize: "30px", width: "30px", height: "40px" }}
                />
              }
              size="large"
              color="primary"
              onClick={profileHandler}
            >
              Moj profil
            </Button>
          </Box>
          {isVerified && (
            <>
              <Box sx={{ m: 2}}>
                <Button
                  sx={{
                    color: "#141e30",
                    fontSize: "14px",
                    padding: "5px 5px",
                    width: "180px",
                    display: "flex",
                    justifyContent: "left",
                    backgroundColor : "white",
                    "&:hover": {
                      backgroundColor: "crimson",
                      color: "white",
                    },
                  }}
                  variant="contained"
                  startIcon={
                    <LocalMall
                      sx={{ fontSize: "30px", width: "30px", height: "40px"}}
                    />
                  }
                  size="large"
                  color="primary"
                  onClick={productHandler}
                >
                  Proizvodi
                </Button>
              </Box>
              <Box sx={{ m: 2 }}>
                <Button
                  sx={{
                    color: "#141e30",
                    fontSize: "14px",
                    padding: "5px 5px",
                    width: "180px",
                    display: "flex",
                    justifyContent: "left",
                    backgroundColor: "white",
                    "&:hover": {
                        backgroundColor: "crimson",
                        color: "white",
                    },
                  }}
                  variant="contained"
                  startIcon={
                    <FormatListBulleted
                      sx={{ fontSize: "30px", width: "30px", height: "40px"}}
                    />
                  }
                  size="large"
                  color="primary"
                  onClick={ordersHandler}
                >
                  Porudžbine
                </Button>
              </Box>
            </>
          )}
        </Box>
        )}

      </>
    )};
    
    export default Dashboard;