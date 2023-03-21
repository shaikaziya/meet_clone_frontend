import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
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
import { api_url } from "../../utils/api";

const theme = createTheme();

const ResetPasswordPage = () => {
    const { id, token } = useParams();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            toast.error('Please fill all the fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${api_url}/api/users/reset-password/${id}/${token}`, { password: newPassword }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setLoading(false);
            toast.success('Password updated successfully !!');
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data);
        }
    }

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
                    <Typography className="mt-3" component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField margin="normal" fullWidth id="new-password" type={showPassword ? 'text' : 'password'} label="New Password" value={newPassword} name="password" autoComplete='false' onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton></InputAdornment>,
                            }} autoFocus />
                        <TextField margin="normal" fullWidth id="confirm-password" type={showPassword ? 'text' : 'password'} label="Confirm Password" value={confirmPassword} name="password" autoComplete='false' onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IconButton
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
                            Update Password
                        </LoadingButton>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default ResetPasswordPage;
