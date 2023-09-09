import React, { useState, useRef, useEffect } from "react";


import {
    Modal,
    Button,
    TextField,
    Grid,
    Box,
  } from "@mui/material";

import ImageForm from "../../ImageForm/ImageForm";

import { updateProduct,  } from "../../../services/ProizvodService";

const UpdateProduct = ({ open, onClose, product}) => {
  
  const exceptionRead = (value) => value.split(":")[1].split("at")[0];

  const [data, setData] = useState({
    Naziv: product.naziv,
    Opis: product.opis,
    Kolicina: product.kolicina,
    Cena: product.cena,
    ImageForm: "",
  });

  useEffect(() => {
    setData({
      ...data,
      Naziv: product.naziv,
      Opis: product.opis,
      Kolicina: product.kolicina,
      Cena: product.cena,
    })
  }, [product]);

  const [displayImage, setDisplayImage] = useState(
    process.env.PUBLIC_URL + "/proizvod.jpg"
  );
  const imageSrc = `data:image/*;base64,` + product.slika;
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("Id", product.id);
    formData.append("Naziv", data.Naziv);
    formData.append("Cena", data.Cena);
    formData.append("Kolicina", data.Kolicina);
    formData.append("Opis", data.Opis);
    formData.append("ImageForm", data.ImageForm);

    const updateProduct2 = async () => {
      try {
        const response = await updateProduct(formData).then(() => {onClose();});
        alert("Uspesno izmenjen proizvod.");
      } catch (error) {
        if (error) alert("Error ",error.response.data);
        return;
      }
    };

    updateProduct2 ();
  };

  return (
      <Modal open={open} onClose={onClose}>
        <>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Box
            sx={{
              backgroundColor: "white",
              display: "flex",
              marginLeft: "30%",
              marginTop: "5%",
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
                  defaultValue={product && product.naziv}
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
                  defaultValue={product && product.opis}
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
                  defaultValue={product && product.kolicina}
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
                  defaultValue={product && product.cena}
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
                      disabled={true}
                      image={displayImage ? displayImage : imageSrc}
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
                 sx={{ mt: 1, marginTop: "25px",color:"green", backgroundColor: "white", borderColor: "green"  }}
                type="submit"
                variant="outlined"
                color="primary"
              >
                Izmeni
              </Button>
              <Button
    
                sx={{ ml: 2, mt: 1,  marginTop: "24px", color:"crimson", backgroundColor: "white",borderColor: "red"}}
                onClick={onClose}
                variant="outlined"
                color="secondary"
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

export default UpdateProduct;