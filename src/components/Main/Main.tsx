import './Main.css';
import { Routes, Route } from 'react-router-dom';
import Spells from '../Spells/Spells';
import { spellsList } from '../../utils/spellsList';
import { useAppSelector } from '../../hooks/hooks';
import { useState, useEffect } from 'react';

function Main({ onSpellClick }: any) {
  const savedSpells = useAppSelector((state) => state.spells.spells)
  const [currentSpells, setCurrentSpells] = useState(spellsList);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query !== '') {
      const foundSpells = spellsList.filter(spell => {
        return spell.name.toLowerCase().includes(query.toLowerCase()) || spell.nameEN.toLowerCase().includes(query.toLowerCase())
      })
      setCurrentSpells(foundSpells)
    } else {
      setCurrentSpells(spellsList)
    }
  }, [query])
  
  function submitSearch(string:string) {
    setQuery(string)
  }

  return (
    <main className="main">
      <Routes>
        <Route path='/' element={<Spells spellsList={currentSpells} onSpellClick={onSpellClick} submitSearch={submitSearch}/>}></Route>
        <Route path='/saved' element={<Spells spellsList  ={savedSpells} onSpellClick={onSpellClick} />}></Route>
      </Routes>
    </main>
  );
}

export default Main;