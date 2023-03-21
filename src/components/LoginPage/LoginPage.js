import React, { useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import toast from 'react-hot-toast';
import { useEffect } from "react";
import { api_url } from "../../utils/api";

const theme = createTheme();

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirectInUrl = redirectUrl + "#init";
    const redirect = redirectUrl ? redirectInUrl : '/';

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await axios.post(`${api_url}/api/users/login`, { email: email, password: password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            localStorage.setItem("userInfo", JSON.stringify(result.data));
            setLoading(false);
            toast.success('Login successful!!');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data);
        }
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        className="google-logo"
                        src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                        alt="Google"
                    />
                    <Typography className='mt-3' component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField margin="normal" fullWidth required id="email" label="Email Address" value={email} name="email" autoComplete='false' autoFocus onChange={(e) => setEmail(e.target.value)} />
                        <TextField margin="normal" fullWidth required id="password" type={showPassword ? 'text' : 'password'} label="Password" value={password} name="password" autoComplete='false' onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton></InputAdornment>,
                            }} />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <LoadingButton type="submit" fullWidth
                            color="primary"
                            loading={loading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign in
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgot-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/sign-up" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage;