import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Popup from '../Popup/Popup';
// import ISpell from '../../interface/ISpell';

function App() {
  const [selectedSpell, setSelectedSpell] = useState(null);

  function handleSpellClick(spell: any) {
    setSelectedSpell(spell);
  }

  function handleClosePopup() {
    setSelectedSpell(null);
  }

  return (
    <div className='app'>
      <Header />
      <Main onSpellClick={handleSpellClick} />
      <Popup spell={selectedSpell} onClose={handleClosePopup} />
    </div>
  );
}

export default App;
