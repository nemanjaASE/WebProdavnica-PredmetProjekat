import React, { useContext, useState } from "react";
import CartItem from "./CartItem";

import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import Checkout from "../Checkout/Checkout";
import CartContext from "../../../contexts/cart-context";

const Cart = ({ open, onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  
  const totalAmount = cartCtx.totalAmount;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
    console.log(item);
  };

  const openCheckoutHandler = () => {
    setIsCheckout(true);
  };

  const closeCheckoutHandler = () => {
    setIsCheckout(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        noValidate
        sx={{
          backgroundColor: "white",
          display: "flex",
          marginLeft: "30%",
          width: 550,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "2%",
        }}
      >
        <Typography sx={{ color: "black", fontSize: 25, marginTop: "10px" }}>Moja korpa</Typography>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            mt: -2,
            marginTop: "5%",
          }}
        >
          <Table sx={{margin: "10px"}}>
            <TableHead>
              <TableRow sx={{border: 2, borderColor: "lightgray"}}> 
                <TableCell sx={{ color: "crimson" }}>Proizvod</TableCell>
                <TableCell sx={{ color: "crimson" }}>Cena</TableCell>
                <TableCell sx={{ color: "crimson" }}>Količina</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ width: "50", backgroundColor: "lightgray"}}>
              {cartCtx.items.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  amount={item.amount}
                  price={item.price}
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}
                  onAdd={cartItemAddHandler.bind(null, item)}
                />
              ))}
            </TableBody>
          </Table>
        </Box>

        <Typography sx={{ color: "green", marginTop: "20px" }}>Ukupna cena: {totalAmount} USD</Typography>
        <Typography sx={{ color: "crimson",marginTop: "5px" }}>Poštarina: 4 USD</Typography>

        <Box display="flex" justifyContent="center" alignItems="center">
          {hasItems && (
            <Button
              sx={{ ml: 2, mt: 1, marginTop: "20px", marginBottom: "30px" } }
              variant="contained"
              color="success"
              onClick={openCheckoutHandler}
            >
              Postavi porudžbinu
            </Button>
          )}
          <Button
            sx={{ ml: 2, mt: 1, marginTop: "20px", marginBottom: "30px" }}
            variant="contained"
            color="error"
            onClick={onClose}
          >
            Zatvori
          </Button>

          <Checkout open={isCheckout} onClose={closeCheckoutHandler} />
        </Box>
      </Box>
    </Modal>
  );
};

export default Cart;