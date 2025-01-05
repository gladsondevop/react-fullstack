import { Box, Card, CardHeader, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import "../assets/styleGlobal.css"
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Miniatura } from "../model/miniatura";
import MiniaturaService from "../services/MiniaturaService";
import ConfirmDelete from "../components/modal/confirmDelete";
import toast from "react-hot-toast";
import MiniaturaModal from "./MiniaturaModal";
import { useNavigate } from "react-router-dom";
import SearchBarMiniatura from "../components/filter/SearchBarMiniatura";


function MiniaturaList() {

  const navidate = useNavigate();
  const [miniaturas, setMiniaturas] = useState<Miniatura[]>();
  const miniaturaService = new MiniaturaService();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const toastSuccess = () => toast.success("Mini removida com sucesso!", {position: 'top-center'});
  const toastError = () => toast.error("Ops... Algo errado não está certo!", {position: 'top-center'});

  const handlePageChange = (event, newPage) => {
    miniaturaService.getAllPaginated(newPage,limit).then((response) => {
      setTotal(response.data.totalElements);
      setMiniaturas(response.data.content);
    });
    setPage(newPage);
  }

  const handleLimitChange = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value));
    miniaturaService.getAllPaginated(0,parseInt(event.target.value)).then((response) => {
      setTotal(response.data.totalElements);
      setMiniaturas(response.data.content);
    });
  }

  const handleEdit = (mini:Miniatura) => {
    navidate(`cadastro/${mini.id}`);
  }

  const handleOpenDetails = (mini:Miniatura) => {
    setShowDetails(true);
    setSelectedRow(mini);
  }

  const handleCloseDetails = () => {
    setShowDetails(false);
  }

  const handleOpenModalConfirm = (mini:Miniatura) => {
    setOpenModalConfirm(true);
    setSelectedRow(mini);
  }

  const handleCloseModalConfirm = () => {
    setOpenModalConfirm(false);
    
  }

  const handleConfirmDelete = () => {
    miniaturaService.delete(selectedRow.id)
    .then(() => {
      miniaturaService.getAllPaginated(page,limit).then((response) => {
        setTotal(response.data.totalElements);
        setMiniaturas(response.data.content);
        setOpenModalConfirm(false);
        toastSuccess();
      });
    }).catch((error) => {
      console.log(error);
      toastError();
      setOpenModalConfirm(false);
    })
  }

  useEffect(() => {
    miniaturaService.getAllPaginated(0,10).then((response) => {
      setTotal(response.data.totalElements);
      setLimit(response.data.size);
      setPage(response.data.pageable.pageNumber);
      setMiniaturas(response.data.content);
    });

  }, []);


  return (
    <React.Fragment>
      <Card sx={{border: 1, borderRadius: 2, mb: 1, transform: 'scale(1)' }}>
        <CardHeader title="Miniaturas"></CardHeader>
        <SearchBarMiniatura setMiniaturas={setMiniaturas} setTotal={setTotal}></SearchBarMiniatura>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Escala</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {miniaturas?.map((mini:Miniatura) => {
                  return (
                    <TableRow hover key={mini.id}>
                      <TableCell>
                        <Typography 
                          variant="body1" 
                          fontWeight="bold" 
                          color="text.primary"
                          gutterBottom
                          noWrap
                          >{mini.id}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography 
                          variant="body1" 
                          fontWeight="bold" 
                          color="text.secondary"
                          gutterBottom
                          noWrap
                          >{mini.marca}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography 
                          variant="body1" 
                          fontWeight="bold" 
                          color="text.secondary"
                          gutterBottom
                          noWrap
                          >{mini.modelo}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography 
                          variant="body1" 
                          fontWeight="bold" 
                          color="text.secondary"
                          gutterBottom
                          noWrap
                          >{mini.escala}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="Ver Mais" arrow>
                          <IconButton
                            onClick={() => handleOpenDetails(mini)}
                            sx={{
                              '&:hover': {
                                background: 'FFF'
                              },
                              color: '#f6b40f'
                            }}
                            color="inherit"
                            size="small">
                            <AddIcon fontSize="small"></AddIcon>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar miniatura" arrow>
                          <IconButton
                            onClick={() => handleEdit(mini)}
                            sx={{
                              '&:hover': {
                                background: 'FFF'
                              },
                              color: 'blue'
                            }}
                            color="inherit"
                            size="small">
                            <EditIcon fontSize="small"></EditIcon>
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Deletar miniatura" arrow>
                          <IconButton
                            onClick={() => {handleOpenModalConfirm(mini)}}
                            sx={{
                              '&:hover': {
                                background: 'FFF'
                              },
                              color: 'red'
                            }}
                            color="inherit"
                            size="small">
                            <DeleteIcon fontSize="small"></DeleteIcon>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination 
            component="div"
            count={total}
            page={page} 
            rowsPerPage={limit}
            onRowsPerPageChange={handleLimitChange} 
            onPageChange={handlePageChange}
            rowsPerPageOptions={[2,5,10,50,100]}>
          </TablePagination>
        </Box>
      </Card>
      
      <ConfirmDelete open={openModalConfirm} onClose={handleCloseModalConfirm} onConfirm={handleConfirmDelete}></ConfirmDelete>

      {showDetails && <MiniaturaModal miniatura={selectedRow} onClose={handleCloseDetails}></MiniaturaModal>}

    </React.Fragment>
  )
}

export default MiniaturaList;