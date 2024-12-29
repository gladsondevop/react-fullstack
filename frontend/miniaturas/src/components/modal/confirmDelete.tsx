import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDelete: React.FC<ConfirmProps> = ({open,onClose,onConfirm}) => {
    return(
        <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Atenção</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Esta ação não poderá ser revertida!
                    <br/>
                    Escluir item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={onConfirm} color="secondary">Sim</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmDelete;