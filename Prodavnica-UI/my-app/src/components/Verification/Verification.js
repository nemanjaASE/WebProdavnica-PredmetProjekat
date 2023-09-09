import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { Alert, AlertTitle, Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import {
  acceptVerification,
  denyVerification,
  getAllSalesmans,
} from "../../services/KorisnikService";


const Verification = () => {
  const [alert, setAlert] = useState({
        message: "",
        severity: "",
    });

  const exceptionRead = (value) => value.split(":")[1].split("at")[0];

  const [user, setUser] = useState(null);

  const [salesmans, setSalesmans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSalesmans();

        setSalesmans(response.data);
      } catch (error) {
        setAlert({
          message: exceptionRead(error.response.data),
          severity: "error",
        });
        return;
      }
    };

    fetchData();
  }, [user]);

  const handleAcceptVerification = async (id) => {
    try {
      const response = await acceptVerification(id);
        
      
        setAlert({
          message: 'Prodavac ' + response.data.korisnickoIme + ' je verifikovan.',
          severity: "success",
        })

      setUser(response.data);
    } catch (error) {
      if (error !== undefined) {
        setAlert({
          message: exceptionRead(error.response.data),
          severity: "error",
        });
        return;
      }
    }
  };

  const handleDenyVerification = async (id) => {
    try {
      const response = await denyVerification(id);
      
      setAlert({
        message: 'Prodavcu ' + response.data.korisnickoIme + ' je odbijena verifikacija.',
        severity: "info",
        icon: "false"
      })

      setUser(response.data);
    } catch (error) {
      if (error !== undefined) {
        setAlert({
          message: exceptionRead(error.response.data),
          severity: "error",
        });
        return;
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", type: "number", flex: 1, maxWidth: 40,},
    { field: "ime", headerName: "Ime", maxWidth: 140 , flex: 1},
    { field: "prezime", headerName: "Prezime", maxWidth: 140, flex: 1 },
    { field: "korisnickoIme", headerName: "Korisničko ime", maxWidth: 140, flex: 1 },
    { field: "email", headerName: "Email",  maxWidth: 150 , flex: 1},
    { field: "verifikacija", headerName: "Verifikacija",  maxWidth: 120, flex: 1},
    {
      field: "verificate",
      headerName: "Verifikuj", 
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: (params) => {
        const { id, verifikacija } = params.row;
        if (verifikacija === "UTOKU") {
          return (
            <div>
              <Button
                style={{ marginRight: "14px", width: "100px", height: "30px"}}
                variant="outlined"
                color="success"
                onClick={() => handleAcceptVerification(id)}
              >
                Prihvati
              </Button>
              <Button
                style={{ width: "100px", height: "30px"}}
                variant="outlined"
                color="error"
                onClick={() => handleDenyVerification(id)}
              >
                Odbij
              </Button>
            </div>
          );
        }
        return null;
      },
    },
  ];

  return (
    <>
      {alert.message !== "" && (
        <Alert
          sx={{
            position: "",
            bottom: 0,
            left: 0,
            right: 0,
            width: "auto",
            height: 70,
          }}
          severity={alert.severity}
          onClose={() => setAlert({ message: "", severity: "success" })}
        >
          <AlertTitle>
            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
          </AlertTitle>
          {alert.message}

        </Alert>
      )}
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "lightgray",
        }}
      >
        <DataGrid
        
         sx={{ color: "black",textAlign: "center", BorderAllSharp: "1px", marginTop:"100px"
         ,"& .MuiDataGrid-row": {
            border: "1px solid white",
            borderRadius: "5px",
            backgroundColor: "white",
          },
          '& .MuiDataGrid-cell:hover': {
            color: 'crimson',
          },
          "& .MuiDataGrid-columnHeader": {
            border: "1px solid crimson",
            borderRadius: "1px",
            backgroundColor: "crimson",
            color: "white"
          },}}
          rows={salesmans}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      </Box>
    </>
  );
};

export default Verification;