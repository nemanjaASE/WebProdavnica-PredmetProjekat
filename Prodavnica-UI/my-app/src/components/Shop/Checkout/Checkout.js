import React, { useState, useContext } from "react";

import { Modal, Button, TextField, Box, Typography } from "@mui/material";

import { createOrder } from "../../../services/PorudzbinaService";
import CartContext from "../../../contexts/cart-context";

const Checkout = ({ open, onClose }) => {
  const exceptionRead = (value) => value.split(":")[1].split("at")[0];
  const cartCtx = useContext(CartContext);
  const [data, setData] = useState({
    PorudzbinaProizvods: cartCtx.items.map((item) => ({
      ProizvodId: item.id,
      Kolicina: item.amount,
    })),
    Adresa: "",
    Komentar: "",
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      
      const response = await createOrder(data);

      cartCtx.clearCart();
      onClose();

    } catch (error) {
      if (error) alert(exceptionRead(error.response.data));
      return;
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          display: "flex",
          marginLeft: "43%",
          width: 400,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "12%",
        }}
      >
        <Typography sx={{ color: "black", fontSize: 28, marginTop: 5 }}>Provera adrese</Typography>

        <Box
          display="flex"
          flexDirection="column"
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            mt: -2,
            marginTop: "10%",
          }}
        >
          <TextField
            inputProps={{ style: { color: "black" } }}
            InputLabelProps={{ style: { color: "gray" } }}
            autoComplete="adresa"
            name="adresa"
            required
            fullWidth
            id="adresa"
            label="Adresa"
            autoFocus
            sx={{margin: "5px"}}
            onChange={(e) => setData({ ...data, Adresa: e.target.value })}
          />
          <TextField
            inputProps={{ style: { color: "black" } }}
            InputLabelProps={{ style: { color: "gray" } }}
            fullWidth
            id="komentar"
            label="Komentar"
            name="komentar"
            autoComplete="komentar"
            onChange={(e) => setData({ ...data, Komentar: e.target.value })}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ mt: 1, marginTop: "20px", marginBottom: "20px"}}
              type="submit"
              variant="contained"
              color="success"
            >
              Poruči
            </Button>
            <Button
              sx={{ ml: 2, mt: 1,marginTop: "20px", marginBottom: "20px" }}
              onClick={onClose}
              variant="contained"
              color="error"
            >
              Otkaži
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Checkout;