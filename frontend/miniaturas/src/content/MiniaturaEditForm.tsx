
import { Box, TextField, Button, Card, CardHeader, Divider } from "@mui/material";
import MiniaturaService from "../services/MiniaturaService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MiniaturaEditForm: React.FC = () => {

    const navigate = useNavigate();
    let miniaturaService = new MiniaturaService();
    const {id} = useParams();
    const [idMiniatura, setIdMiniatura] = useState(null)

    const toastSuccess = () => toast.success("Mini atualizada com sucesso!", {position: 'top-center'});
    const toastError = () => toast.error("Ops... Algo errado não está certo!", {position: 'top-center'});

    const [formData, setFormData] = useState({
        id: "",
        marca: "",
        modelo: "",
        escala: "",
        image: ""
      })

    useEffect(() => {
        miniaturaService.getById(parseInt(id)).then((response)=>{
            let miniatura = response.data;
            setIdMiniatura(miniatura.id)
            setFormData({
                id: miniatura.id,
                marca: miniatura.marca,
                modelo: miniatura.modelo,
                escala: miniatura.escala,
                image: miniatura.image
            })
        })
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        miniaturaService.update(formData).then(() => {
            toastSuccess();
            navigate('/');
        }).catch((error) =>{
            console.log(error);
            toastError()
        })
        console.log(formData);
    }    

    return(
        <Card sx={{border: 1, borderRadius: 2, mb: 1 }}>
            <CardHeader title="Editar Miniatura"></CardHeader>
            <Divider />
            <Box
                component="form"
                onSubmit={handleSubmit} noValidate autoComplete="off"
                sx={{mx: '2px', transform: 'scale(0.8)', '& .MuiTextField-root': {m:1} }}>

                <div>
                    <TextField
                        fullWidth
                        required 
                        id="marca" 
                        label="Marca"
                        name="marca" 
                        value={formData.marca}
                        onChange={handleChange} />

                    <TextField
                        fullWidth
                        required 
                        id="modelo" 
                        label="Modelo"
                        name="modelo" 
                        value={formData.modelo}
                        onChange={handleChange} />

                    <TextField
                        fullWidth
                        required 
                        id="escala" 
                        label="Escala"
                        name="escala" 
                        value={formData.escala}
                        onChange={handleChange} />
                    
                    <TextField
                        fullWidth
                        required 
                        id="image" 
                        label="URL Imagem"
                        name="image" 
                        value={formData.image}
                        onChange={handleChange} />

                </div>

                <Button type="submit" variant="contained" sx={{m:1}}>Salvar</Button>
            </Box>
        </Card>
    );
}

export default MiniaturaEditForm;