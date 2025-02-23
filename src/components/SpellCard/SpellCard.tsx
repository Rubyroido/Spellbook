import "./SpellCard.css";
import ISpell from "../../interface/ISpell";
import { useAppDispatch } from '../../hooks/hooks';
import { selectSpell } from "../../store/selectedSpellSlice";
import { saveSpell, deleteSpell } from '../../store/spellsSlice';

interface ISpellCard {
  spell: ISpell,
  isSaved: boolean
}

export default function SpellCard({ spell, isSaved }: ISpellCard) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(selectSpell(spell))
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (isSaved) {
      dispatch(deleteSpell(spell.id));
    } else {
      dispatch(saveSpell(spell));
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
      <button className={`card-button ${isSaved ? 'delete-button' : 'save-button'}`} onClick={handleButtonClick}></button>
    </div>
  )
}