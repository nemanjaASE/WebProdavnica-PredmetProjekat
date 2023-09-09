import React, { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import AuthContext from "../../contexts/auth-context";

import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button
} from "@mui/material";

import {
  getAllOrders,
  getCustomerDeliveredOrders,
  getCustomerInProgressOrders,
  getSalesmanDeliveredOrders,
  getSalesmanInProgressOrders,
  denyOrder,
} from "../../services/PorudzbinaService";

function Row({ row, onDenyOrder  }) {

  const exceptionRead = (value) => value.split(":")[1].split("at")[0];

  const [open, setOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const role = authCtx.uloga;

  const isCustomer = role === "KUPAC";

  const handleDenyOrder = () => {
    onDenyOrder(row.id);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ color: "black " }}> 
          {row.id}
        </TableCell>
        <TableCell align="center" sx={{ color: "black" }}>{row.komentar}</TableCell>
        <TableCell align="center" sx={{ color: "black" }}>{row.adresa}</TableCell>
        <TableCell align="center" sx={{ color: "black" }}>{row.cena}</TableCell>
        <TableCell align="center" sx={{ color: "black" }}>{row.vremeNarudzbine.split(".")[0]}</TableCell>
        <TableCell align="center" sx={{ color: "black" }}>{row.vremeDostave.split(".")[0]}</TableCell>
        <TableCell align="center" sx={{ color: "black" }}>{row.status}</TableCell>
        {isCustomer && row.status === 'UTOKU' && (new Date(row.vremeDostave) >= Date.now()) &&
        <TableCell align="center" sx={{ color: "black" }}><Button sx={{ ml: 2, mt: 1, backgroundColor: "crimson",
        '&:hover': {
          backgroundColor: 'white',
          color: 'crimson',
      } }}
        onClick={handleDenyOrder}
        variant="contained"
        color="secondary">Otkaži</Button></TableCell>
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 ,border: 1, borderColor: "crimson", borderRadius: 5, padding: 5}}>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: "crimson" }}>
                Detalji porudžbine
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ color: "crimson" }}>
                      Naziv
                    </TableCell>
                    <TableCell align="center" sx={{ color: "crimson" }}>
                      {" "}
                      Opis
                    </TableCell>
                    <TableCell align="center" sx={{ color: "crimson" }}>
                      Cena
                    </TableCell>
                    <TableCell align="center" sx={{ color: "crimson" }}>
                      Količina
                    </TableCell>
                    <TableCell align="right" sx={{ color: "crimson" }}>
                      Ukupna cena (RSD)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.porudzbinaProizvods.map((porudzbinaProizvod) => (
                    <TableRow key={porudzbinaProizvod.id}>
                      <TableCell align="center" sx={{ color: "black" }}>
                        {porudzbinaProizvod.proizvod.ime}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "black" }}>
                        {porudzbinaProizvod.proizvod.opis}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "black" }}>
                        {porudzbinaProizvod.proizvod.cena} RSD
                      </TableCell>
                      <TableCell align="center" sx={{ color: "black" }}>
                        x{porudzbinaProizvod.kolicina}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "black" }}>
                        {porudzbinaProizvod.kolicina * porudzbinaProizvod.proizvod.cena} RSD
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    komentar: PropTypes.string.isRequired,
    adresa: PropTypes.string.isRequired,
    cena: PropTypes.number.isRequired,
    vremeNarudzbine: PropTypes.string.isRequired,
    vremeDostave: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    porudzbinaProizvods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        kolicina: PropTypes.number.isRequired,
        proizvod: PropTypes.shape({
          id: PropTypes.number.isRequired,
          naziv: PropTypes.string.isRequired,
          cena: PropTypes.number.isRequired,
          kolicina: PropTypes.number.isRequired,
          opis: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    korisnikId: PropTypes.number.isRequired,
    cenaDostave: PropTypes.number.isRequired,
  }).isRequired,
};

const Orders = () => {
  const exceptionRead = (value) => value.split(":")[1].split("at")[0];
  
  const [data, setData] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [change, setChange] = useState(false);
  const authCtx = useContext(AuthContext);
  const role = authCtx.uloga;

  const isAdmin = role === "ADMINISTRATOR";
  const isCustomer = role === "KUPAC";
  const isSalesman = role === "PRODAVAC";

  const handleDenyOrder = async (orderId) => {
    try {

      const response = await denyOrder(orderId);

      setChange(!change);

      alert("Vaša porudžbina je otkazana.");
    } catch (error) {
      if (error) alert(exceptionRead(error.response.data));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin) {
        try {
          const response = await getAllOrders();

          setData(response.data);
        } catch (error) {
          if (error) alert(exceptionRead(error.response.data));
          return;
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
      const fetchData = async () => {
        if (isSalesman) {
          try {
            const responseInProgress = await getSalesmanInProgressOrders();

            setData(responseInProgress.data);
            const responseDelivered = await getSalesmanDeliveredOrders();
            setDelivered(responseDelivered);
          } catch (error) {
            if (error) alert(exceptionRead(error.response.data));
            return;
          }
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isCustomer) {
        try {
          const responseInProgress = await getCustomerInProgressOrders();

          setData(responseInProgress.data);
          const responseDelivered = await getCustomerDeliveredOrders();
          
          // setData((data) => ({
          //   ...data,
          //   ...responseDelivered.data,
          // }));
        } catch (error) {
          if (error) alert(exceptionRead(error.response.data));
          return;
        }
      }
    };
    fetchData();
  }, [change]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "lightgray",
        }}
      >
        <div
          style={{
            position: "",
            top: 100,
            width: "90%",
            backgroundColor: "lightgray",
            marginTop: "30px",
            marginBottom: "30px"
          }}
        >
          <TableContainer component={Paper} style={{ background: "white" }}>
            <Table aria-label="collapsible table">
              <TableHead style={{ background: "crimson"}}>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ color: "white" }}>Id</TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Komentar
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Adresa
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Cena
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Vreme narudžbine
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Vreme dostave
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 &&
                  data.map((row) => <Row
                  key={row.id}
                  row={row}
                  onDenyOrder={handleDenyOrder}
                />)}
                  {delivered.length > 0 &&
                  delivered.map((row) => <Row key={row.id} row={row} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </>
  );
};

// 

export default Orders;