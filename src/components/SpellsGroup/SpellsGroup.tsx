import './SpellsGroup.css';
import SpellCard from '../SpellCard/SpellCard';
import { useAppSelector } from '../../hooks/hooks';

function SpellsGroup({ level, onSpellClick, currentSpells }: { level: number, onSpellClick: any, currentSpells?: any }) {
  const savedSpells = useAppSelector(state => state.spells.spells).filter((spell: any) => spell !== null);

  return (
    <div className="spells-group">
      <h2 className='spells-level'>{level === 0 ? 'Заговоры' : level + ' уровень'}</h2>
      <ul className='spells-list'>
        {
          currentSpells.map((spell: any) => {
            if (spell) {
              let isSaved;
              savedSpells.some((item: any) => item.id === spell.id) ? isSaved = true : isSaved = false;
              return (
                <li >
                  <SpellCard spell={spell} isSaved={isSaved} key={spell.id} onSpellClick={onSpellClick} />
                </li>
              )
            } else {
              return null;
            }
          })
        }
      </ul>
    </div>
  );
}

export default SpellsGroup;