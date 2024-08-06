import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

interface IProps {
    open: boolean;
    close: () => void;
    option: boolean;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function FormTask({ open, close, option }: IProps) {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
    }

    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box
                className="modal"
                sx={{ 
                    ...style,  
                }}
            >

            <h2 id="parent-modal-title">Add a new Task</h2>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>


            </Box>

            </Box>
        </Modal>
    )
}

export default FormTask;