import MiniaturaService from "../services/MiniaturaService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Button, Paper, styled, createTheme, Grid, Grid2, ThemeProvider, Card, CardHeader, Divider } from "@mui/material";

const MiniaturaAddForm: React.FC = () => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
    }));

    const lightTheme = createTheme({ palette: { mode: 'light' } });

    const navigate = useNavigate();
    const {id} = useParams();
    const miniaturaService = new MiniaturaService();

    interface IFormInput {
        id: number;
        marca: string;
        modelo: string;
        escala: string;
        image: string;
    }

    const validarEscala = (escala: string) => {
        return /^[\d]+\/[\d]+$/.test(escala);
    }

    const schema = yup.object().shape({
        marca: yup.string().required("Campo obrigatório."),
        modelo: yup.string().required("Campo obrigatório."),
        escala: yup.string().required("Campo obrigatório.").test('is-valid-escala', 'Escala inválida. Ex.: 1/43', validarEscala)
    });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(schema)})

    const onSubmit = (data:IFormInput) => {
        miniaturaService.save(data).then(() => {
            toastSuccess();
            navigate('/');
        }).catch((error) => {
            toastError();
        });
    }

    const toastSuccess = () => toast.success("Mini inserida com sucesso!", {position: 'top-center'});
    const toastError = () => toast.error("Ops... Algo errado não está certo!", {position: 'top-center'});

    return(
        <Card sx={{border: 1, borderRadius: 2, mb: 1 }}>
            <CardHeader title="Adicionar Miniatura"></CardHeader>
            <Divider />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off"
                sx={{mx: '2px', transform: 'scale(0.8)', '& .MuiTextField-root': {m:1} }}>

                <TextField
                    fullWidth
                    required 
                    id="marca" 
                    label="Marca"
                    name="marca" 
                    {...register("marca")}
                    error={!!errors.marca}
                    helperText={errors.marca?.message} />
            

                <TextField
                    fullWidth
                    required 
                    id="modelo" 
                    label="Modelo"
                    name="modelo" 
                    {...register("modelo")}
                    error={!!errors.modelo}
                    helperText={errors.modelo?.message} />

                <TextField
                    fullWidth
                    required 
                    id="escala" 
                    label="Escala"
                    name="escala" 
                    {...register("escala")}
                    error={!!errors.escala}
                    helperText={errors.escala?.message} />

                <TextField
                    fullWidth
                    required 
                    id="image" 
                    label="Imagem"
                    name="image" 
                    {...register("image")}
                    error={!!errors.image}
                    helperText={errors.image?.message} />

                
                <Button type="submit" variant="contained" sx={{m:1}}>Cadastrar</Button>
            </Box>
        </Card>
    );
}

export default MiniaturaAddForm;