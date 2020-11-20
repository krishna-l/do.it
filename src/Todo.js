import { List, ListItem, ListItemText, Button, Modal, FormControl, Input, InputLabel, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import './Todo.css';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '20%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.text.todo);
    const [deadline, setDeadline] = useState(props.text.deadline);

    const updateTodo = (e) => {
        e.preventDefault();
        db.collection('todos').doc(props.text.id).set({
            todo: input,
            deadline: deadline,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        setOpen(false)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>📝 Edit</h1>
                    <form>
                        <FormControl>
                            <div>
                                <InputLabel>🖊 Enter the task</InputLabel>
                                <Input defaultValue={props.text.todo} onChange={e => setInput(e.target.value)} />
                                <TextField
                                    id="deadline"
                                    label="🗓 Deadline"
                                    type="date"
                                    defaultValue={props.text.deadline}
                                    onChange={e => setDeadline(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ marginLeft: '1em' }}
                                />
                            </div>
                        </FormControl>
                        <Button
                            disabled={props.text.todo === input && props.text.deadline === deadline ? true : false}
                            variant="contained" color="primary" onClick={updateTodo} type="submit" style={{ float: 'right', margin: '1em' }}
                        >
                            💾 Save
                        </Button>
                    </form>
                </div>
            </Modal>
            <List className="todo_list">
                <ListItem>
                    <ListItemText primary={props.text.todo} secondary={"Deadline ⏰: " + props.text.deadline} />
                    <Button onClick={e => { db.collection('todos').doc(props.text.id).delete() }}>⛔ Delete</Button>
                    <Button onClick={e => setOpen(true)}>📝 Edit</Button>
                </ListItem>
            </List>
        </>
    )
}

export default Todo
