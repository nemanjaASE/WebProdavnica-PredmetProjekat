import React, { useState, useRef } from "react";
import { createNewProduct } from "../../../services/ProizvodService";
import ImageForm from "../../ImageForm/ImageForm";

import {
  Box,
  Modal,
  Typography,
  TextField,
  Grid,
  Button
} from "@mui/material";

const NewProduct = ({ open, onClose }) => {
  const exceptionRead = (value) => value.split(":")[1].split("at")[0];

  const [data, setData] = useState({
    Naziv: "",
    Opis: "",
    Kolicina: 0,
    Cena: 0,
    ImageForm: "",
  });

  const [displayImage, setDisplayImage] = useState(null);
  const defaultImage = process.env.PUBLIC_URL + "/proizvod.jpg";

  const imageInput = useRef(null);

  const imageUploadHandler = () => {
    if (!imageInput.current) {
      return;
    }
    imageInput.current.children[0].click();
  };

  const imageChangeHandler = (event) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDisplayImage(reader.result.toString());
      };
    }
    setData({
      ...data,
      ImageForm: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Naziv", data.Naziv);
    if(data.Naziv === ""){
        alert("Morate uneti naziv!");
        return;
    }
    formData.append("Opis", data.Opis);
    if(data.Opis === ""){
        alert("Morate uneti opis!");
        return;
    }
    formData.append("Kolicina", data.Kolicina);
    if(data.Kolicina <= 0)
    {
        alert("Kolicina mora biti veca od nula!");
        return;
    }
    formData.append("Cena", data.Cena);
    if(data.Cena <= 0)
    {
        alert("Cena mora biti veca od nula!");
        return;
    }
    if(data.ImageForm === ""){
      
      alert("Slika je neophodna!");
      return;
    }
    formData.append("ImageForm", data.ImageForm);

    const addProduct = async () => {
      try {
        const response = await createNewProduct(formData).then(() => {onClose();});
        alert("Novi proizvod uspesno dodat!");
      } catch (error) {
        if (error) alert(exceptionRead(error.response.data.toString()));
        return;
      }
    };
    addProduct();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box component="form" noValidate onSubmit={handleSubmit}>
        
          <Box
            noValidate
            sx={{
              backgroundColor: "white",
              display: "flex",
              marginTop: "5%",
              marginLeft: "30%",
              width: 500,
              height: 500,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Grid
              display="flex"
              flexDirection="column"
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 1,
                marginTop: "10%",
              }}
            >
              <Grid>

                <TextField
                  inputProps={{ style: { color: "black" } }}
                  InputLabelProps={{ style: { color: "gray" } }}
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  sx={{
                    marginBottom: 2
                  }}
                  autoFocus
                  onChange={(e) => setData({ ...data, Naziv: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { color: "black" } }}
                  InputLabelProps={{ style: { color: "gray" } }}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  sx={{
                    marginBottom: 2
                  }}
                  name="description"
                  autoComplete="description"
                  onChange={(e) =>
                    setData({ ...data, Opis: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { color: "black" } }}
                  InputLabelProps={{ style: { color: "gray" } }}
                  required
                  fullWidth
                  name="amount"
                  label="Amount"
                  sx={{
                    marginBottom: 2
                  }}
                  type="number"
                  id="amount"
                  autoComplete="amount"
                  onChange={(e) => setData({ ...data, Kolicina: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { color: "black" } }}
                  InputLabelProps={{ style: { color: "gray" } }}
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  sx={{
                    marginBottom: 2
                  }}
                  type="price"
                  id="price"
                  autoComplete="price"
                  onChange={(e) => setData({ ...data, Cena: e.target.value })}
                />
              </Grid>
              <Grid>
                <Box
                  noValidate
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {
                    <ImageForm
                      required
                      disabled={true}
                      image={displayImage ? displayImage : defaultImage}
                      imageInput={imageInput}
                      uploadHandler={imageChangeHandler}
                      avatarClickHandler={imageUploadHandler}
                    ></ImageForm>
                  }
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ mt: 1, marginTop: "25px" }}
                type="submit"
                variant="outlined"
                color="success"
              >
               Dodaj
              </Button>
              <Button
                sx={{ ml: 2, mt: 1,  marginTop: "24px" }}
                onClick={onClose}
                variant="outlined"
                color="error"
              >
                Otkaži
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default NewProduct;