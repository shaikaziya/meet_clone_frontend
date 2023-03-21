import React, { useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import toast from 'react-hot-toast';
import Header from "../UI/Header/Header";
import { api_url } from "../../utils/api";

const theme = createTheme();

const ProfilePage = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const result = await axios.put(`${api_url}/api/users/profile/${userInfo._id}`, { firstName: firstName, lastName: lastName, email: email, password: password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            localStorage.setItem("userInfo", JSON.stringify(result.data));
            setLoading(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data);
        }
    }

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div>
            <Header />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            className="google-logo"
                            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                            alt="Google"
                        />
                        <Typography className='mt-3' component="h1" variant="h5">
                            Profile Details
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" fullWidth required id="firstName" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" />
                            <TextField margin="normal" fullWidth required id="lastName" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" />
                            <TextField margin="normal" fullWidth required id="email" label="Email Address" value={email} name="email" autoComplete='false' onChange={(e) => setEmail(e.target.value)} type="email" />
                            <TextField margin="normal" fullWidth id="password" type={showPassword ? 'text' : 'password'} label="Password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}
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
                            <TextField margin="normal" fullWidth id="confirm-password" type={showPassword ? 'text' : 'password'} label="Confirm password" value={confirmPassword} name="confirmPassword" autoComplete='false' onChange={(e) => setConfirmPassword(e.target.value)}
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
                            <LoadingButton type="submit" fullWidth
                                color="primary"
                                loading={loading}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </LoadingButton>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>

    );
}

export default ProfilePage;