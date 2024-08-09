import { Box, Button, Checkbox, Container, createTheme, CssBaseline, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, ThemeProvider, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from "react";
import FormTask from "../../Components/FormTask";
import { IMoreInfoTask, ITask, IToggleModal } from "../../Config/interface";

import imgThreeDots from '../../assets/threeDots.svg';
import InfoTask from "../../Components/InfoTask";

function Home() {
    const [toggleModal, setToggleModal] = useState<IToggleModal>({
        open: false,
        option: false,
    });
    const [toggleModalInfoTask, setToggleModalInfoTask] = useState<IMoreInfoTask>({ openModal: false, task: null, index: 0 });
    const [listTasks, setListTasks] = useState<ITask[]>([]);

    const defaultTheme = createTheme();

    useEffect(() => {

        const jsonList = localStorage.getItem("list_tasks");

        if (jsonList) {
            const list = JSON.parse(jsonList);
            setListTasks(list);
        }

    }, [toggleModal, toggleModalInfoTask])

    function openMoreInfoTask(obj: IMoreInfoTask) {
        setToggleModalInfoTask({
            task: obj.task,
            openModal: obj.openModal,
            index: obj.index
        });

    }

    function close() {
        setToggleModal({
            open: false,
            option: false,
        });
        setToggleModalInfoTask({
            task: null,
            openModal: false,
            index: 0
        });
    }

    function openEdit(task: ITask) {
        task.id = toggleModalInfoTask.index;
        setToggleModal({
            open: true,
            option: false,
            task: task,
        });

    }

    function handleToggleCompletedTask(obj: ITask, index: number) {
        obj.check = !obj.check;

        let jsonListTask = localStorage.getItem("list_tasks");

        if (jsonListTask) {
            const listTask: ITask[] = JSON.parse(jsonListTask);
            listTask.splice(index, 1, obj);

            jsonListTask = JSON.stringify(listTask);
            localStorage.setItem("list_tasks", jsonListTask);

            close();
        }

    }

    return (
        <>
            {toggleModal.open && <FormTask open={toggleModal.open} close={close} option={toggleModal.option} task={toggleModal.task} />}


            <InfoTask
                open={toggleModalInfoTask.openModal}
                close={close}
                task={toggleModalInfoTask.task}
                openEdit={openEdit}
            />

            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">

                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h1" sx={{ fontSize: 34 }} >
                            To Do List
                        </Typography>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 3, width: '100%', maxWidth: 360, fontWeight: 600 }}
                            onClick={() => setToggleModal({ open: true, option: true })}
                        >
                            + New Task
                        </Button>

                        <List sx={{
                            width: '100%', maxWidth: 360,
                        }}>
                            {listTasks.length === 0 ? (<>
                                <Typography component="h2" variant="h2" sx={{ fontSize: 30, textAlign: 'center', mt: 4 }} >
                                    No to tasks ...
                                </Typography></>) : listTasks.map((value, index) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={index}
                                            disablePadding
                                            sx={{
                                                bgcolor: value.color
                                            }}
                                            secondaryAction={
                                                <ListItemSecondaryAction
                                                    aria-label="delete"
                                                    sx={{ padding: 2, paddingRight: 0, cursor: 'pointer' }}
                                                    onClick={() => openMoreInfoTask({ index: index, openModal: true, task: value })}
                                                >

                                                    <img src={imgThreeDots} alt="icon three dots" style={{ width: 4 }} />
                                                </ListItemSecondaryAction>
                                            }
                                        >
                                            <ListItemButton role={undefined}
                                                onClick={() => handleToggleCompletedTask(value, index)}
                                                dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={value.check}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={value.title} />
                                            </ListItemButton>

                                        </ListItem>
                                    );
                                })}
                        </List>

                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )

}

export default Home;