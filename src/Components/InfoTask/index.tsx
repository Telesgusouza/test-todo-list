import { Box, Fab, Modal, Typography } from "@mui/material";
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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {task?.title} 
                        </Typography>
                    
                        <Fab
                            color="primary"
                            aria-label="edit"
                            sx={{
                                width: 38,
                                height: 38,
                                backgroundColor: '#90e3ff',

                                marginLeft: 10,

                                '&:hover': {
                                    backgroundColor: '#f0f8ff',
                                },
                            }}

                            onClick={handlOpenEdit}
                        >
                            <img src={imgPen} alt="pen icon" style={{ width: 15 }} />
                        </Fab>
                    </Box>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {task?.description}
                        </Typography>
                    

            </Box>
        </Modal>
    );
}

export default InfoTask;