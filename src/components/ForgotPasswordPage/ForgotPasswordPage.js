import React, { useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import toast from 'react-hot-toast';
import { api_url } from "../../utils/api";

const theme = createTheme();

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(`${api_url}/api/users/forgot-password`, { email: email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setLoading(false);
            toast.success('Password reset link sent successfully to your mail!!')
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data);
        }
    }

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
                        Forgot Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" fullWidth required id="email" label="Email Address" value={email} name="email" autoComplete='false' autoFocus onChange={(e) => setEmail(e.target.value)} />
                        <LoadingButton type="submit" fullWidth
                            color="primary"
                            loading={loading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Password reset Mail
                        </LoadingButton>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ForgotPasswordPage;