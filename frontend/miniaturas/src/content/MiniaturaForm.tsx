import MiniaturaService from "../services/MiniaturaService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Button, Card, CardHeader, Divider } from "@mui/material";
import { useEffect, useState } from "react";

const MiniaturaForm: React.FC = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const miniaturaService = new MiniaturaService();
    const [titleForm, setTitleForm] = useState("Adicionar Miniatura");
    const [msgSuccess, setMsgSuccess] = useState("Mini inserida com sucesso!");
    const toastSuccess = () => toast.success(msgSuccess, {position: 'top-center'});
    const toastError = () => toast.error("Ops... Algo errado não está certo!", {position: 'top-center'});

    useEffect(() => {
        if(id){
            setTitleForm("Editar Miniatura");
            setMsgSuccess("Mini atualizada com sucesso!")
            miniaturaService.getById(parseInt(id)).then((response) =>{
              const miniatura = response.data;
              setValue("id", parseInt(miniatura.id), {shouldTouch:true})
              setValue("marca", miniatura.marca || "", {shouldTouch:true})
              setValue("modelo", miniatura.modelo || "", {shouldTouch:true})
              setValue("escala", miniatura.escala, {shouldTouch:true})
              setValue("image", miniatura.image, {shouldTouch:true})
            })
        }
      }, []);

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
        id: yup.number(),
        marca: yup.string().required("Campo obrigatório."),
        modelo: yup.string().required("Campo obrigatório."),
        escala: yup.string().required("Campo obrigatório.").test('is-valid-escala', 'Escala inválida. Ex.: 1/43', validarEscala),
        image: yup.string()
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        control
    } = useForm({resolver: yupResolver(schema)})

    const onSubmit = (data:IFormInput) => {
        console.log(data);
        if(id) {
            miniaturaService.update(data).then(() => {
                toastSuccess();
                navigate('/');
            }).catch((error) => {
                console.log(error);
                toastError();
            });

        } else {
            miniaturaService.save(data).then(() => {
                toastSuccess();
                navigate('/');
            }).catch((error) => {
                console.log(error);
                toastError();
            });
        }
    }

    

    return(
        <Card sx={{border: 1, borderRadius: 2, mb: 1 }}>
            <CardHeader title={titleForm}></CardHeader>
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

export default MiniaturaForm;