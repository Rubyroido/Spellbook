import './SpellsGroup.css';
import SpellCard from '../SpellCard/SpellCard';
import { useAppSelector } from '../../hooks/hooks';
import ISpell from '../../interface/ISpell';

interface ISPellGroup {
  level: number,
  currentSpells?: ISpell[]
}

function SpellsGroup({ level, currentSpells }: ISPellGroup) {
  const savedSpells = useAppSelector(state => state.spells.spells).filter((spell: ISpell) => spell !== null);

  return (
    <div className="spells-group">
      <h2 className='spells-level'>{level === 0 ? 'Заговоры' : level + ' уровень'}</h2>
      <ul className='spells-list'>
        {currentSpells &&
          currentSpells.map((spell: ISpell, index: number) => {
            if (spell) {
              let isSaved;
              savedSpells.some((item: ISpell) => item.id === spell.id) ? isSaved = true : isSaved = false;
              return (
                <li key={index}>
                  <SpellCard spell={spell} isSaved={isSaved} key={spell.id} />
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