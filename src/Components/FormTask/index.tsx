import { Box, Button, Grid, Modal, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { styleBoxModal, styleInputColor } from "./style";
import { IPropsFormTask, ITask } from "../../Config/interface";



// When true Add false to Edit
function FormTask({ open, close, option, task }: IPropsFormTask) {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const [wrongTitle, setWrongTitle] = useState<boolean>(false);

    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    useEffect(() => {
        if (!option && task !== undefined) {
            setTitle(task.title);
            setDescription(task.description);
            setColor(task.color);
        }
    }, [])

    useEffect(() => {
        if (wrongTitle) {
            setWrongTitle(false);
        }
    }, [title])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (title.length <= 2) {
            setWrongTitle(true);
            return;
        }

        const data: ITask = {
            title: title,
            description: description,
            color: color.length === 0 ? '#c0c0c029' : color,
        }

        const listTaskJson = localStorage.getItem("list_tasks");
        const listTask = listTaskJson ? JSON.parse(listTaskJson) : [];

        listTask.push(data);

        const listTaskSerializeble = JSON.stringify(listTask);
        localStorage.setItem("list_tasks", listTaskSerializeble);

        setTimeout(() => {
            close();
        }, 700);

        setOpenSnackBar(true);

    }

    function closeSnackBar() {
        setOpenSnackBar(false);
    }

    return (
        <>
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box
                    className="modal"
                    sx={{
                        ...styleBoxModal,
                    }}
                >

                    <h2 id="parent-modal-title">{ option ? "Add a new Task" : "Edit your task"}</h2>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    error={wrongTitle}

                                    autoComplete="given-name"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title" 
                                    autoFocus

                                    value={title}
                                    onChange={e => setTitle(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField

                                    multiline
                                    rows={5}
                                    placeholder="Decription"

                                    autoComplete="given-name"
                                    name={"descripton"}
                                    required
                                    fullWidth
                                    id="descripton"
                                    label="Description" 
                                    autoFocus

                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />

                            </Grid>


                            <Grid item xs={12} sm={12}>

                                <div style={{ position: 'relative', width: 'fit-content' }} >
                                    <Button variant="outlined"  >
                                        Color for task
                                    </Button>

                                    <input
                                        type="color"
                                        name="color"
                                        style={{ ...styleInputColor }}
                                        onChange={e => setColor(e.target.value)}
                                    />

                                </div>

                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {option ? "Add a task" : "Edit your task"}
                        </Button>

                    </Box>

                </Box>

            </Modal>

            <Snackbar
                    open={openSnackBar}
                    autoHideDuration={8000}
                    onClose={closeSnackBar}
                    message="message added successfully"
                />
        </>
    )
}

export default FormTask;