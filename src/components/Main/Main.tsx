import './Main.css';
import { Routes, Route } from 'react-router-dom';
import Spells from '../Spells/Spells';
// import SavedSpells from '../SavedSpells/SavedSpells';
import { spellsList } from '../../utils/spellsList';
import { useAppSelector } from '../../hooks/hooks';

function Main({ onSpellClick }: any) {
  const savedSpells = useAppSelector((state) => state.spells.spells)
  return (
    <main className="main">
      <Routes>
        <Route path='/' element={<Spells spellsList={spellsList} onSpellClick={onSpellClick} />}></Route>
        <Route path='/saved' element={<Spells spellsList={savedSpells} onSpellClick={onSpellClick} />}></Route>
      </Routes>
    </main>
  );
}

export default Main;