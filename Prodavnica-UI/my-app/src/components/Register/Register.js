import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import ImageForm from "../ImageForm/ImageForm";
import { register } from "../../services/KorisnikService";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from '@mui/material/InputAdornment';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import RepeatIcon from '@mui/icons-material/Repeat';
import HomeIcon from '@mui/icons-material/Home';

const defaultTheme = createTheme();
const isNotEmpty = (value) => value.trim() !== "";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {

    const navigate = useNavigate();

    const [displayImage, setDisplayImage] = useState(null);
    const defaultImage = process.env.PUBLIC_URL + "/korisnik.jpg";
    const imageInput = useRef(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [localDate, setLocalDate] = useState(null);
     
    const [data, setData] = useState({
      KorisnickoIme: "",
      Email: "",
      Sifra: "",
      PonovljenaSifra: "",
      Ime: "",
      Prezime: "",
      DatumRodjenja: "",
      Adresa: "",
      ImageForm: "",
      Tip: "KUPAC",
    });
  
    const [isValid, setIsValid] = useState({
      korisnickoIme: true,
      email: true,
      sifra: true,
      ponovljenaSifra: true,
      ime: true,
      prezime: true,
      datumRodjenja: true,
      adresa: true,
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
  
    const firstnameBlurHandler = () => {
      const enteredFirstName = data.Ime;
      if (isNotEmpty(enteredFirstName)) {
        setIsValid((valid) => ({
          ...valid,
          korisnickoIme: true,
        }));
      } else {
        setIsValid((valid) => ({
          ...valid,
          korisnickoIme: false,
        }));
      }
    };
  
    const lastnameBlurHandler = () => {
      const enteredlastName = data.Prezime;
      if (isNotEmpty(enteredlastName)) {
        setIsValid((valid) => ({
          ...valid,
          prezime: true,
        }));
      } else {
        setIsValid((valid) => ({
          ...valid,
          prezime: false,
        }));
      }
    };
  
    const usernameBlurHandler = () => {
      const enteredUsername = data.KorisnickoIme;
      if (isNotEmpty(enteredUsername)) {
        setIsValid((valid) => ({
          ...valid,
          korisnickoIme: true,
        }));
      } else {
        setIsValid((valid) => ({
          ...valid,
          korisnickoIme: false,
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
  
    const passwordBlurHandler = () => {
      const enteredPassword = data.Sifra;
      if (isNotEmpty(enteredPassword)) {
        setIsValid((valid) => ({
          ...valid,
          sifra: true,
        }));
      } else {
        setIsValid((valid) => ({
          ...valid,
          sifra: false,
        }));
      }
    };
  
    const repeatPasswordBlurHandler = () => {
      const enteredRepeatPassword = data.PonovljenaSifra;
      if (isNotEmpty(enteredRepeatPassword)) {
        setIsValid((valid) => ({
          ...valid,
          ponovljenaSifra: true,
        }));
      } else {
        setIsValid((valid) => ({
          ...valid,
          ponovljenaSifra: false,
        }));
      }
    };
  
    const birthdateBlurHandler = () => {
      const enteredDate = data.DatumRodjenja;
      console.log("OVO", enteredDate);
      if (isNotEmpty(enteredDate)) {
        setIsValid((valid) => ({
          ...valid,
          datumRodjenja: true,
        }));
      } else {
        setIsValid((valid) => ({
          ...valid,
          datumRodjenja: false,
        }));
      }
    };
  
    const addressBlurHandler = () => {
      const enteredAddress = data.Adresa;
      if (isNotEmpty(enteredAddress)) {
        setIsValid((valid) => ({
          ...valid,
          adresa: true,
        }));
      } else {
        setIsValid((valid) => ({
          ...valid,
          adresa: false,
        }));
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const currentDate = new Date();
      const minAgeDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
      );
  
      console.log(isValid);
      const formIsValid = Object.values(isValid).every((value) => value === true);
      console.log(formIsValid);
      if (!formIsValid) {
        alert("You must fill in all fields");
        return;
      } else if (data.Password !== data.RepeatPassword) {
        alert("Password dont match, try again.");
        return;
      } else if (data.BirthDate > minAgeDate) {
        alert("You must have at least 18 years.");
        return;
      }
  
      const date = new Date(Date.parse(localDate));
      date.setDate(date.getDate() + 1);
      
  
      const formData = new FormData();
      formData.append("KorisnickoIme", data.KorisnickoIme);
      formData.append("Email", data.Email);
      formData.append("Password", data.Sifra);
      formData.append("PonovljenaSifra", data.PonovljenaSifra);
      formData.append("Ime", data.Ime);
      formData.append("Prezime", data.Prezime);
      formData.append("DatumRodjenja", date.toISOString());
      formData.append("Adresa", data.Adresa);
      formData.append("Tip", data.Tip);
      formData.append("ImageForm", data.ImageForm);
      
  
      const registerFunction = async () => {
        try {
         
        console.log(formData)

          const response = await register(formData);
          
          alert("Uspešno ste se registrovali.");
          navigate("/");
        } catch (error) {
          if (error.response) alert(error.response.data);
        }
      };
      registerFunction();
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          height: "100%",
          backgroundColor: "lightgray",
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "crimson" }}>
                <AppRegistrationIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: "Black" }}>
                Registracija
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
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
                      error={!isValid.ime}
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
                      error={!isValid.prezime}
                      onBlur={lastnameBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Prezime: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "Gray" } }}
                      required
                      fullWidth
                      id="korisnickoIme"
                      label="Korisničko ime"
                      name="korisnickoIme"
                      autoComplete="korisnickoIme"
                      error={!isValid.korisnickoIme}
                      onBlur={usernameBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, KorisnickoIme: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      error={!isValid.email}
                      onBlur={emailBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      name="sifra"
                      label="Šifra"
                      type="password"
                      id="sifra"
                      autoComplete="new-password"
                      error={!isValid.sifra}
                      onBlur={passwordBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Sifra: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RepeatIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      name="ponovljenaSifra"
                      label="Ponovljena šifra"
                      type="password"
                      id="ponovljenaSifra"
                      autoComplete="new-password"
                      error={!isValid.ponovljenaSifra}
                      onBlur={repeatPasswordBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, PonovljenaSifra: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: 400,
                        "& .MuiInputBase-root": {
                            height: 50
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon style={{ color: 'crimson' }}/>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ style: { color: "Black" } }}
                      InputLabelProps={{ style: { color: "gray" } }}
                      required
                      fullWidth
                      id="adresa"
                      label="Adresa"
                      name="adresa"
                      autoComplete="adresa"
                      error={!isValid.adresa}
                      onBlur={addressBlurHandler}
                      onChange={(e) =>
                        setData({ ...data, Adresa: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid container spacing={1} sx={{marginTop: 1, marginLeft: 1 }}>
                    <Grid item xs={5} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                     
                        sx={{ backgroundColor: "litegray", svg: { color: "crimson"}}}
                        slotProps={{
                            inputAdornment: {
                              position: 'start'
                            }
                          }}
                        required
                        name="datumRodjenja"
                        label="Datum rođenja"
                        id="datumRodjenja"
                        error={!isValid.datumRodjenja}
                        onBlur={birthdateBlurHandler}
                        onChange={handleDateChange}
                      />
                    </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2} sx={{marginTop: -0.7, marginLeft: 10 }}>
                    
                    <ImageForm
                      required
                      disabled={true}
                      image={displayImage ? displayImage : defaultImage}
                      imageInput={imageInput}
                      uploadHandler={imageChangeHandler}
                      avatarClickHandler={imageUploadHandler}
                    >
                        
                    </ImageForm>
                  </Grid>
                  </Grid>
                 
                </Grid>
                <Grid item xs={1} sm={1} sx={{ marginTop: 2, marginLeft: 1}}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label" sx={{color: "gray"}}>
                        Tip korisnika:
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="KUPAC"
                      >
                        <FormControlLabel
                            componentsProps={{ typography: { variant: 'h7'}}}
                          sx={{ color: "Black"}}
                          value="KUPAC"
                          control={
                          <Radio size="small"
                            sx={{
                                size: "small",
                                color: "crimson",
                                "&.Mui-checked": {
                                color: "crimson"
                                }
                                }}
                          />}          
                          label="Kupac"
                          onChange={() => setData({ ...data, Tip: "KUPAC" })}
                        />
                        <FormControlLabel
                          componentsProps={{ typography: { variant: 'h7'}}}
                          sx={{ color: "Black" }}
                          value="PRODAVAC"
                          control={
                            <Radio size="small"
                              sx={{
                                  color: "crimson",
                                  "&.Mui-checked": {
                                  color: "crimson"
                                  }
                                  }}
                            />}     
                          label="Prodavac"
                          onChange={() => setData({ ...data, Tip: "PRODAVAC" })}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                <Button
                  type="submit"
                  color="success"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 6, mb: 10 }}
                >
                  Registruj se
                </Button>
                <Grid container justifyContent="flex" sx={{ marginTop: -7, marginLeft: 16, marginBottom: 20, fontSize: 12}}>
                   Već imate nalog?&nbsp;
                  <Grid item>
                    <Link href="/" variant="body1" sx={{fontSize: 12}}>
                       Ulogujte se
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    );
  };
  
  export default Register;