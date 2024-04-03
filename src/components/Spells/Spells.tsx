import './Spells.css';
// import { spellsList } from '../../utils/spellsList';
import SpellsGroup from '../SpellsGroup/SpellsGroup';
import { useLocation } from 'react-router-dom';

function Spells({ spellsList, onSpellClick }: any) {
  const location = useLocation();
  let spellsGroups = [];

  if (location.pathname === '/') {
    const maxLevel = spellsList.length > 0 ? [...spellsList].pop().level : 0;
    for (let i = 0; i <= maxLevel; i++) {
      spellsGroups.push(
        <SpellsGroup level={i} onSpellClick={onSpellClick} />
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

  return (
    <div className="spells">
      {
        spellsList.length > 0 ? spellsGroups : <p className='no-spells'>Нет сохраненных заклинаний</p>
      }
    </div>
  );
}

export default Spells;