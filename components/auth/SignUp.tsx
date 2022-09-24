import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

interface SignUpProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = (props: SignUpProps) => {
    const notificationCtx = useContext(NotificationContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            fullname: data.get("fullname"),
            email: data.get('email'),
            password: data.get('password'),
        });
        const fullname = data.get('fullname');
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            let message = 'Signup failed.';
            if (response.status === 422) {
                message = 'Same email alredy signed up.';
            }
            notificationCtx.showNotification({
                message: message,
                status: 'error'
            })
            return;
        }

        notificationCtx.showNotification({
            message: 'Signup success.',
            status: 'success'
        })
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
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fullname"
                                    name="fullname"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
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
                                <Link href="#" variant="body2" onClick={ () => props.setLogin(true) }>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default SignUp;