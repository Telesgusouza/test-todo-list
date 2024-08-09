import { Box, Button, Grid, Modal, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { styleBoxModal, styleInputColor } from "./style";
import { IPropsFormTask, ISnackBar, ITask } from "../../Config/interface";



// When true Add false to Edit
function FormTask({ open, close, option, task }: IPropsFormTask) {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const [wrongTitle, setWrongTitle] = useState<boolean>(false);
    const [wrongDescription, setWrongDescription] = useState<boolean>(false);

    const [openSnackBar, setOpenSnackBar] = useState<ISnackBar>({open: false, message: ""});

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

    useEffect(() => {
        if (wrongDescription) {
            setWrongDescription(false);
        }
    }, [description])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();


        // checks if the fields have been filled in
        setWrongTitle(title.length <= 2);
        setWrongDescription(description.length <= 1);
        if (title.length <= 2 || description.length <= 1) return;

        // handle submit for Add and Edit
        (option) ? handleAddTask() : handleEditask();
    }

    function handleAddTask() {
        const listTaskJson = localStorage.getItem("list_tasks");
        const listTask = listTaskJson ? JSON.parse(listTaskJson) : [];

        const data: ITask = {
            title: title,
            description: description,
            color: color.length === 0 ? '#c0c0c029' : color,
            check: false,
        }

        listTask.push(data);

        const listTaskSerializeble = JSON.stringify(listTask);
        localStorage.setItem("list_tasks", listTaskSerializeble);

        endOfSubmit("message added successfully");

    }

    function handleEditask() {

        if (task && task.id != null) {

            const listTaskJson = localStorage.getItem("list_tasks");

            const data: ITask = {
                title: title,
                description: description,
                color: color.length === 0 ? '#c0c0c029' : color,
                check: task.check,
            }

            if (!listTaskJson) {
                setOpenSnackBar({ open: true, message: "You have no tasks" });
                return;
            }


            const listTask: ITask[] = JSON.parse(listTaskJson);
            listTask.splice(task.id, 1, data);

            const jsonListTask = JSON.stringify(listTask);
            localStorage.setItem("list_tasks", jsonListTask);

            endOfSubmit("edited successfully");
        }
    }

    function closeSnackBar() {
        setOpenSnackBar({ open: false, message: "" });
    }

    function endOfSubmit(message: string) {

        setTimeout(() => {
            setTitle("");
            setDescription("");
            setColor("");
    
            close();
        }, 700);

        setOpenSnackBar({ open: true, message: message });
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

                    <h2 id="parent-modal-title">{option ? "Add a new Task" : "Edit your task"}</h2>
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

                                    error={wrongDescription}

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
                open={openSnackBar.open}
                autoHideDuration={8000}
                onClose={closeSnackBar}
                message={openSnackBar.message}
            />
        </>
    )
}

export default FormTask;