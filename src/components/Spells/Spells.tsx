import './Spells.css';
import SpellsGroup from '../SpellsGroup/SpellsGroup';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Spells({ spellsList, onSpellClick, submitSearch }: any) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  let spellsGroups = [];

  if (location.pathname === '/') {
    const maxLevel = spellsList.length > 0 ? [...spellsList].pop().level : 0;
    for (let i = 0; i <= maxLevel; i++) {
      spellsGroups.push(
        <SpellsGroup level={i} onSpellClick={onSpellClick} spellsList={spellsList}/>
      )
    }
  } else {
    const levels: number[] = Array.from(new Set(spellsList.filter((spell: any) => spell !== null).map((spell: any) => spell.level)))
    levels.forEach((level) => {
      spellsGroups.push(
        <SpellsGroup level={level} onSpellClick={onSpellClick} />
      )
    })
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitSearch(searchValue);
  }

  function hadnleReset() {
    submitSearch('')
    setSearchValue('')
  }

  return (
    <div className="spells">
      {
        location.pathname === '/' ?
          <form className='search-form' onSubmit={handleSearch}>
            <input type="text" className='search-input' value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder='Введите название'/>
            <button type='submit' className='search-button'>Поиск</button>
            <button type='button' className='reset-button' onClick={hadnleReset}>Сброс</button>
          </form>
          : null
      }
      {
        spellsList.length > 0 ? spellsGroups : <p className='no-spells'>Нет сохраненных заклинаний</p>
      }
    </div>
  );
}

export default Spells;