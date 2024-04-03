import "./SpellCard.css";
import ISpell from "../../interface/ISpell";
import { useAppDispatch } from '../../hooks/hooks';
import { saveSpell, deleteSpell } from '../../store/spellsSlice';

export default function SpellCard({ spell, onSpellClick, isSaved }: { spell: ISpell, onSpellClick: any, isSaved:boolean }) {
  const dispatch = useAppDispatch();

  function handleClick() {
    onSpellClick(spell)
  }

  function handleButtonClick(event: any) {
    event.stopPropagation()
    if(isSaved) {
      dispatch(deleteSpell(spell))
    } else {
      dispatch(saveSpell(spell))
    }
  }

  return (
    <div className="spell-card" onClick={handleClick}>
      <p className="spell-level">{spell.level}</p>
      <div className="card-container">
        <div className="spell-description">
          <span>{spell.name}</span>
          <span className="spell-name_en">{` [${spell.nameEN}]`}</span>
        </div>
        <div className="spell-info">
          <div className="spell-info_container">
            {
              spell.ritual ? <span className="additional">Р</span> : false
            }
            {
              spell.concentration ? <span className="additional">К</span> : false
            }
            <span className="spell-school">{spell.school}</span>
          </div>
          <div className="components">
            <span>{spell.verbal ? 'в' : '-'}</span>
            <span>{spell.somatic ? ' с' : ' -'}</span>
            <span>{spell.material ? ' м' : ' -'}</span>
          </div>
        </div>
      </div>
      <button className={`card-button ${isSaved?'delete-button':'save-button'}`} onClick={handleButtonClick}></button>
    </div>
  )
}