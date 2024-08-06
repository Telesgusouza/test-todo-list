import { Box, Button, Checkbox, Container, createTheme, CssBaseline, IconButton, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from "react";
import FormTask from "../../Components/FormTask";


function Home() {
    const [toggleAdd, setToggleAdd] = useState<boolean>(true);

    const defaultTheme = createTheme();

    function close() {
        setToggleAdd(false)
    }

    return (
        <>
            <FormTask open={toggleAdd} close={close} option={true} />

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

                        <Typography component="h1" variant="h5" sx={{ fontSize: 34 }} >
                            To Do List
                        </Typography>

                        {/*  */}



                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 3, width: '100%', maxWidth: 360, fontWeight: 600 }}
                            onClick={() => setToggleAdd(true)}
                        >
                            + New Task
                        </Button>




                        <List sx={{
                            width: '100%', maxWidth: 360,
                            // bgcolor: 'background.paper'
                            // bgcolor: '#e2e2e22f' 
                            bgcolor: '#c0c0c029'
                        }}>
                            {[0, 1, 2, 3].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;

                                return (
                                    <ListItem
                                        key={value}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                {/* <CommentIcon /> */}
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined}
                                            // onClick={handleToggle(value)} 
                                            dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    // checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
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