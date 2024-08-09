import { Box, Fab, Grid, makeStyles, Modal, Typography } from "@mui/material";
import { IPropsInfoTask } from "../../Config/interface";

import imgPen from '../../assets/pen.svg';
import { styleInfoTask } from "./style";

function InfoTask({ close, open, task, openEdit }: IPropsInfoTask) {

    function handlOpenEdit() {
        if (task) {
            openEdit(task);
        }
    }

    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleInfoTask}>
                <Grid container spacing={0}>

                    <Grid item xs={12} sm={1} sx={{ backgroundColor: "blue" }} >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {task?.title} 
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}
                        sx={{ backgroundColor: "red" }}
                    >
                        <Fab
                            color="primary"
                            aria-label="edit"
                            sx={{
                                width: 38,
                                height: 38,
                                backgroundColor: '#90e3ff',

                                '&:hover': {
                                    backgroundColor: '#f0f8ff',
                                },
                            }}

                            onClick={handlOpenEdit}
                        >
                            <img src={imgPen} alt="pen icon" style={{ width: 15 }} />
                        </Fab>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {task?.description}
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </Modal>
    );
}

export default InfoTask;