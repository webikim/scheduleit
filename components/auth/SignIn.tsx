import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';

interface SignInProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = (props: SignInProps) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('signin request was failed.');
            return;
        }

        console.log('success ', await response.json());
    }
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2" onClick={ openForgot }>
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="#" variant="body2" onClick={ () => props.setLogin(false) }>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default SignIn;