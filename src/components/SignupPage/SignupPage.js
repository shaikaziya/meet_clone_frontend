import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import toast from 'react-hot-toast';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { api_url } from "../../utils/api";

const theme = createTheme();

const SignupPage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            await axios.post(`${api_url}/api/users/register`, { firstName: firstName, lastName: lastName, email: email, password: password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setLoading(false);
            toast.success('User created successfully !!');
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data);
        }
    }

    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        className="google-logo"
                        src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                        alt="Google"
                    />
                    <Typography className='mt-3' component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="false"
                                    name="firstName"
                                    required
                                    fullWidth
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    name="lastName"
                                    autoComplete="false"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    autoComplete="false"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="password" type={showPassword ? 'text' : 'password'} label="Password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton></InputAdornment>,
                                    }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="confirm-password" type={showPassword ? 'text' : 'password'} label="Confirm password" value={confirmPassword} name="confirmPassword" autoComplete='false' onChange={(e) => setConfirmPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton></InputAdornment>,
                                    }} />
                            </Grid>
                        </Grid>
                        <LoadingButton type="submit" fullWidth
                            color="primary"
                            loading={loading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignupPage
