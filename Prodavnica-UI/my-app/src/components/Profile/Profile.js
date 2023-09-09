import React, { useState, useRef, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ImageForm from "../ImageForm/ImageForm";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getMyProfile, update } from "../../services/KorisnikService";

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockResetIcon from '@mui/icons-material/LockReset';
import HomeIcon from '@mui/icons-material/Home';

import InputAdornment from '@mui/material/InputAdornment';

const isNotEmpty = (value) => value.trim() !== "";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const defaultTheme = createTheme();

const Profile = () => {
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState(null);
  const [userImage, setUserImage] = useState("");
  const imageInput = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [localDate, setLocalDate] = useState(null);
  const [data, setData] = useState({
      KorisnickoIme: "",
      Email: "",
      Sifra: "",
      StaraSifra: "",
      Ime: "",
      Prezime: "",
      DatumRodjenja: "",
      Adresa: "",
      ImageForm: "",
  });

  const [isValid, setIsValid] = useState({
    email: true,
    username: true,
    password: true,
    oldPassword: true,
    firstname: true,
    lastname: true,
    birthdate: true,
    address: true,
  });

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    if (selectedDate) {
      const localDateTime = new Date(selectedDate).toLocaleDateString();
      setLocalDate(localDateTime);
      
    }
  }, [selectedDate, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyProfile();

        let initialDateString = response.data.datumRodjenja;
        let initialDatePart = initialDateString.split("T");
        let initialDateParts = initialDatePart[0].split("-");

        let initialDate = new Date(initialDatePart[0]);

        setSelectedDate(initialDate);
        
        const imageSrc = `data:image/*;base64,` + response.data.slika;
        setUserImage(imageSrc);
        setData({
          ...data,
          Ime: response.data.ime,
          Prezime: response.data.prezime,
          KorisnickoIme: response.data.korisnickoIme,
          Email: response.data.email,
          DatumRodjenja: initialDate,
          Adresa: response.data.adresa,
        });
      } catch (error) {
        if (error.response) alert(error.response.data);
        return;
      }
    };

    fetchData();
  }, []);

  const firstnameBlurHandler = () => {
    const enteredFirstName = data.Ime;
    if (isNotEmpty(enteredFirstName)) {
      setIsValid((valid) => ({
        ...valid,
        firstname: true,
      }));
    } else {
      setIsValid((valid) => ({
        ...valid,
        firstname: false,
      }));
    }
  };

  const lastnameBlurHandler = () => {
    const enteredlastName = data.Prezime;
    if (isNotEmpty(enteredlastName)) {
      setIsValid((valid) => ({
        ...valid,
        lastname: true,
      }));
    } else {
      setIsValid((valid) => ({
        ...valid,
        lastname: false,
      }));
    }
  };

  const usernameBlurHandler = () => {
    const enteredUsername = data.KorisnickoIme;
    if (isNotEmpty(enteredUsername)) {
      setIsValid((valid) => ({
        ...valid,
        username: true,
      }));
    } else {
      setIsValid((valid) => ({
        ...valid,
        username: false,
      }));
    }
  };

  const emailBlurHandler = () => {
    const enteredEmail = data.Email;
    if (isNotEmpty(enteredEmail) && emailRegex.test(enteredEmail)) {
      setIsValid((valid) => ({
        ...valid,
        email: true,
      }));
    } else {
      setIsValid((valid) => ({
        ...valid,
        email: false,
      }));
    }
  };

  const birthdateBlurHandler = () => {
    const enteredDate = data.DatumRodjenja;
    if (isNotEmpty(enteredDate)) {
      setIsValid((valid) => ({
        ...valid,
        birthdate: true,
      }));
    } else {
      setIsValid((valid) => ({
        ...valid,
        birthdate: false,
      }));
    }
  };

  const addressBlurHandler = () => {
    const enteredAddress = data.Adresa;
    if (isNotEmpty(enteredAddress)) {
      setIsValid((valid) => ({
        ...valid,
        address: true,
      }));
    } else {
      setIsValid((valid) => ({
        ...valid,
        address: false,
      }));
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isNotEmpty(data.Ime))
      setIsValid({
        ...isValid,
        firstName: true,
      });
    else
      setIsValid({
        ...isValid,
        firstName: false,
      });
    if (isNotEmpty(data.Prezime))
      setIsValid({
        ...isValid,
        lastName: true,
      });
    else
      setIsValid({
        ...isValid,
        lastName: false,
      });
    if (isNotEmpty(data.Adresa)) {
      setIsValid({
        ...isValid,
        address: true,
      });
    } else
      setIsValid({
        ...isValid,
        address: false,
      });
    if (isNotEmpty(data.KorisnickoIme))
      setIsValid({
        ...isValid,
        username: true,
      });
    else
      setIsValid({
        ...isValid,
        username: false,
      });
    if (isNotEmpty(data.Email) && emailRegex.test(data.Email))
      setIsValid({
        ...isValid,
        email: true,
      });
    else
      setIsValid({
        ...isValid,
        email: false,
      });

    const formIsValid = Object.values(isValid).every((value) => value === true);
    if (!formIsValid) {
      alert("Sva polja moraju biti popunjena.");
      return;
    }

    console.log(localDate)
    const date = new Date(Date.parse(localDate));
    date.setDate(date.getDate() + 1);

    const formData = new FormData();
    
    formData.append("KorisnickoIme", data.KorisnickoIme);
    formData.append("Email", data.Email);
    formData.append("StaraSifra", data.StaraSifra);
    formData.append("NovaSifra", data.Sifra);
    formData.append("Ime", data.Ime);
    formData.append("Prezime", data.Prezime);
    formData.append("DatumRodjenja", date.toISOString());
    formData.append("Adresa", data.Adresa);
    formData.append("ImageForm", data.ImageForm);

    console.log("Profile", formData);

    try {
      const response = await update(formData);
    
      alert("Uspešno ste izmenili vaš profil.");
    } catch (error) {
      if (error) alert(error.response.data);
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          height: "130vh",
          backgroundColor: "lightgray",
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "crimson" }}>
                <ModeEditIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: "Black" }}>
                Izmena profila
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={submitHandler}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                    sx={{
                        width: 200,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      autoComplete="given-name"
                      name="ime"
                      required
                      fullWidth
                      id="ime"
                      label="Ime"
                      autoFocus
                      value={data.Ime}
                      error={!isValid.firstname}
                      onBlur={firstnameBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Ime: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                    sx={{
                        width: 190,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      id="prezime"
                      label="Prezime"
                      name="prezime"
                      autoComplete="family-name"
                      value={data.Prezime}
                      error={!isValid.lastname}
                      onBlur={lastnameBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Prezime: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      id="korisnickoIme"
                      label="Korisničko ime"
                      name="korisnickoIme"
                      autoComplete="username"
                      value={data.KorisnickoIme}
                      error={!isValid.username}
                      onBlur={usernameBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, KorisnickoIme: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={data.Email}
                      error={!isValid.email}
                      onBlur={emailBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      fullWidth
                      name="staraSifra"
                      label="Stara šifra"
                      type="password"
                      id="staraSifra"
                      autoComplete="new-password"
                      value={data.StaraSifra}
                      error={!isValid.oldPassword}
                      onChange={(e) =>
                        setData({ ...data, StaraSifra: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockResetIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      fullWidth
                      name="sifra"
                      label="Nova šifra"
                      type="password"
                      id="sifra"
                      autoComplete="new-password"
                      value={data.Sifra}
                      error={!isValid.password}
                      onChange={(e) =>
                        setData({ ...data, Sifra: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      id="adresa"
                      label="Adresa"
                      name="adresa"
                      autoComplete="address"
                      value={data.Adresa}
                      error={!isValid.address}
                      onBlur={addressBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Adresa: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid container spacing={1} sx={{marginTop: 1, marginLeft: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                      sx={{ backgroundColor: "litegray", svg: { color: "crimson"}}}
                      slotProps={{
                          inputAdornment: {
                            position: 'start'
                          }
                        }}
                        required
                        fullWidth
                        name="datumRodjenja"
                        label="Datum rođenja"
                        id="datumRodjenja"
                        value={dayjs(data.DatumRodjenja)}
                        error={!isValid.birthdate}
                        onBlur={birthdateBlurHandler}
                        onChange={handleDateChange}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <ImageForm
                      disabled={true}
                      image={displayImage ? displayImage : userImage}
                      imageInput={imageInput}
                      uploadHandler={imageChangeHandler}
                      avatarClickHandler={imageUploadHandler}
                    ></ImageForm>
                  </Grid>
                  </Grid>
                
                
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  color="success"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sačuvaj izmene
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default Profile;