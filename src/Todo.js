import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import React from 'react'
import './Todo.css'
import db from './firebase';

function Todo(props) {
    return (
        <List className="todo_list">
            <ListItem>
                <ListItemText primary={props.text.todo} secondary="Deadline: ⏰" />
                <Button onClick={e => { db.collection('todos').doc(props.text.id).delete() }}>⛔ Delete</Button>
            </ListItem>
        </List>
    )
}

export default Todo
