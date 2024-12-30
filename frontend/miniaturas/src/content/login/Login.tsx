import { Box, TextField, Button, Card, CardHeader, Divider } from "@mui/material";
import LoginService from "../../services/LoginService";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const navigate = useNavigate();
    const loginService = new LoginService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toastError = () => toast.error("Login e/ou Senha inválido(s)", {position: 'top-center'});
    

    const handleSubmit = () => {
        
        loginService.login(email, password).then((response) => {
            localStorage.setItem("token", response.data.token);
            console.log(response.data);
            navigate(0);
        }).catch((error) => {
            toastError();
            console.log('teste error');
        });
    
      };

    return(
        <Card sx={{border: 1, borderRadius: 2, mb: 1 }}>
            <Toaster />
            <CardHeader title="Login"></CardHeader>
            <Divider />
            <Box
                component="form"
                noValidate autoComplete="off"
                sx={{mx: '2px', transform: 'scale(0.8)', '& .MuiTextField-root': {m:1} }}>

                <TextField
                    fullWidth
                    required 
                    id="email" 
                    label="Usuário"
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <TextField
                    fullWidth
                    required 
                    id="password" 
                    label="Senha"
                    name="password"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                
                <Button onClick={handleSubmit} variant="contained" sx={{m:1}}>Logar</Button>
            </Box>
        </Card>
    );
}

export default Login;