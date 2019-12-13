import React, { useState} from 'react';
import 'firebase/firestore';
import firebase from './firebase';

const ComandPerson = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [table, setTable] = useState('');
  const [itens, setItens] = useState('');

  function addComand(e){
    const fieldValue = firebase.firestore.FieldValue;
    const comand = {
      id,
      name,
      table,
      itens,
      time: fieldValue.serverTimestamp()
    };
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('comands')
      .add(comand)
      .then(() => {
        setId('');
        setName('');
        setTable('');
        setItens('');
      });
  };
  return (
    <>
      <label>Comanda</label>
      <input
        className="input-comand"
        type="text"
        value={name}
        onChange={e => setName(e.currentTarget.value)}
      ></input>
      <input
        className="input-comand"
        type="number"
        value={table}
        onChange={e => setTable(e.currentTarget.value)}
      ></input>
      <button onClick={addComand}>Confirmar mesa</button>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Burger Queen</h1>
      <ComandPerson/>
    </div>
  );
}

export default App;
