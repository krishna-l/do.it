import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    //fires when the App.js is loaded
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    })
  }, []); // similar to component did mount

  const addTodo = (e) => {
    //onclick of add to Do button
    e.preventDefault(); // prevent the refresh by the form

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input]); //to retain the existing list.
    setInput('');
  }

  return (
    <div className="App">
      <h1>Do.It 🚀</h1>
      <form>
        <FormControl>
          <InputLabel>☑ What to do?</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)} />
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" onClick={addTodo} type="submit">
          Add to Do
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
