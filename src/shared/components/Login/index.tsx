import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { useAuthContext } from "../../contexts";
import { useState } from "react";
import * as yup from 'yup';

interface ILoginProps {
    children: React.ReactNode
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

export const Login = ({children}: ILoginProps) => {
    const { isAuthenticated, login } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = () => {
        setIsLoading(true);

        loginSchema.validate({ email, password }, { abortEarly: false })
            .then(dadosValidados => {
                login(dadosValidados.email, dadosValidados.password)
                    .then(() => setIsLoading(false))

            }).catch((errors: yup.ValidationError) => {
                setIsLoading(false);

                errors.inner.forEach(error => {

                    if (error.path === 'email') {
                        setEmailError(error.message);
                    } else if (error.path === 'password') {
                        setPasswordError(error.message);
                    }

                })
            });
    }

    if (isAuthenticated) {
        return (
            <Box>
                {children}
            </Box>
        )
    }

    return (
        <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
            <Card>
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2} width={300}>
                        <Typography variant="h6" align="center">Identifique-se</Typography>

                        <TextField 
                            label="Email" 
                            type="email" 
                            autoComplete="off" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={() => setEmailError('')}
                            error={!!emailError}
                            helperText={emailError}
                            disabled={isLoading}
                        />

                        <TextField 
                            label="Senha" 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={() => setPasswordError('')}
                            error={!!passwordError}
                            helperText={passwordError}
                            disabled={isLoading}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width="100%" display="flex" justifyContent="center">
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit} 
                            disabled={isLoading}
                            endIcon={isLoading && <CircularProgress variant="indeterminate" color="inherit"  size={20} />}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}