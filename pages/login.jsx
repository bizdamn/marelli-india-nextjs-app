import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataStore } from '../utils/DataStore';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
const theme = createTheme();

export default function SignInSide() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo,router]);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} lg={7}>
         <Image src='/bg.png'width='100%' height='100%'alt={'IGSCS LOGO'} ></Image>
        </Grid>
        <Grid item xs={12} sm={8} lg={5} component={Paper} elevation={6} square>
          {/* Form Started */}
          <form onSubmit={handleSubmit(submitHandler)} >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" sx={{ fontWeight: 700 }} variant="h4">
                Login
              </Typography>
              <Box sx={{ mt: 1 }}>

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ my: 4 }}
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      inputProps={{ type: 'email' }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === 'pattern'
                            ? 'Email is not valid'
                            : 'Email is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ mb: 4 }}
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="Password"
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === 'minLength'
                            ? 'Password length is more than 5'
                            : 'Password is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>


                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                  <Button className='hvr-grow' type="submit" 
                    style={{ width: '100%', backgroundColor: '#38B6FF', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
                    Log In
                  </Button>
                

              </Box>
            </Box>
          </form>
        </Grid>
        

      </Grid>
    </ThemeProvider>
  );
}