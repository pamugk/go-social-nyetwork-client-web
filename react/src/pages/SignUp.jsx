import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Alert, Avatar, Box, Button, Container, Grid, Link, MenuItem, TextField, Typography } from '@mui/material';
import { MuiTelInput, isValidPhoneNumber } from 'mui-tel-input'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { createUser } from 'services/service';
import { defaultLocalesByCountries } from 'utils/country-utils';
import { CountryPicker } from 'components/CountryPicker';

export default function SignUp() {
  let navigate = useNavigate();
  
  const [login, setLogin] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [apiError, setApiError] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
          "Login": login,
          "Country": country,
          "PreferredLocale": defaultLocalesByCountries[country],
          "Name": firstName,
          "Surname": lastName,
          "Patronymic": middleName,
          "Birthday": birthday.toISOString().slice(0, 10),
          "Gender": gender,
          "Phone": phone,
          "Email": email,
          "Password": password
      }).then(response => {
        if (response.ok) {
          navigate('/login');
        } else {
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            response.text().then(setApiError);
          } else {
            response.json().then(setApiError);
          }
        }
      }).catch(console.error);
  };

  return (
    <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          { apiError && <Alert severity="error" onClose={() => setApiError(null)}>{apiError}</Alert> }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  required
                  id="Login"
                  label="Login"
                  name="Login"
                  autoComplete="username"
                  inputProps={{ maxLength: 100, pattern: "^\\S+$" }}
                  value={login} 
                  onChange={ event => setLogin(event.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <CountryPicker
                  fullWidth
                  required
                  value={country}
                  onChange={ event => setCountry(event.target.value) }
                  id="Country"
                  label="Country"
                  helperText="Please select your country of origin"
                  name="Country"
                  langOfCountryName={!country || country === '' ? null : defaultLocalesByCountries[country]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="First Name"
                  inputProps={{ maxLength: 150 }}
                  value={firstName} 
                  onChange={ event => setFirstName(event.target.value) }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Surname"
                  label="Last Name"
                  name="Surname"
                  autoComplete="family-name"
                  inputProps={{ maxLength: 200 }}
                  value={lastName} 
                  onChange={ event => setLastName(event.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Patronymic"
                  label="Middle Name"
                  name="Patronymic"
                  autoComplete="additional-name"
                  inputProps={{ maxLength: 175 }}
                  value={middleName} 
                  onChange={ event => setMiddleName(event.target.value) }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  disableFuture={true}
                  label="Birthday"
                  value={birthday}
                  onChange={newValue => setBirthday(newValue)  }
                  renderInput={(params) => <TextField {...params} required id="Birthday" name="Birthday" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  fullWidth
                  id="Gender"
                  label="Gender"
                  name="Gender"
                  value={gender}
                  onChange={event => setGender(event.target.value)}
                >
                  <MenuItem key="MALE" value="MALE">Male</MenuItem>
                  <MenuItem key="FEMALE" value="FEMALE">Female</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  fullWidth
                  id="Phone"
                  label="Phone Number"
                  name="Phone"
                  autoComplete="tel"
                  inputProps={{ maxLength: 16 }}
                  focusOnSelectCountry={true}
                  disableFormatting={true}
                  langOfCountryName={!country || country === '' ? null : defaultLocalesByCountries[country]}
                  value={phone} 
                  onChange={ newValue => setPhone(newValue) } 
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="Email"
                  type="email"
                  inputProps={{ maxLength: 400, pattern: "^(\\w+@\\w+\\.\\w+)?$" }}
                  autoComplete="email"
                  value={email} 
                  onChange={ event => setEmail(event.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="Password"
                  id="password"
                  autoComplete="new-password"
                  value={password} 
                  onChange={ event => setPassword(event.target.value) }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Container>
  );
}
