import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { FormControl, Input, InputLabel, TextField } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {// similar to component did mount
    //fires when the App.js is loaded
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo, deadline: doc.data().deadline })))
    })
  }, []); //get all todos order by timestamp

  const addTodo = (e) => {
    //onclick of add to Do button
    e.preventDefault(); // prevent the refresh by the form

    db.collection('todos').add({
      todo: input,
      deadline: deadline,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input]); //to retain the existing list.
    setInput('');
    setDeadline('');
  }

  return (
    <div className="App">
      <h1>Let's Do.It 🚀</h1>
      <form>
        <FormControl>
          <div>
            <InputLabel>☑ What to do?</InputLabel>
            <Input value={input} onChange={e => setInput(e.target.value)} />
            <TextField
              id="deadline"
              label="🗓 Deadline"
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginLeft: '1em' }}
            />
          </div>
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" onClick={addTodo} type="submit" style={{ margin: '1em' }}>
          Add to Do
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
