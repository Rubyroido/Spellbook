import "./Popup.css";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { saveSpell, deleteSpell } from "../../store/spellsSlice";
import { clearSpell } from "../../store/selectedSpellSlice";
import { usePreventScroll } from "@react-aria/overlays";

function Popup() {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const spell = useAppSelector((state) => state.selectedSpell.selectedSpell);
  const savedSpells = useAppSelector((state) =>
    state.spells.spells
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  usePreventScroll({ isDisabled });

  useEffect(() => {
    const dialog = dialogRef.current;
    const overlay = overlayRef.current;
    if (dialog && overlay && spell) {
      dialog.classList.add("popup_active");
      overlay.classList.add("overlay_active");
      document.body.style.overflow = "hidden";
      setIsDisabled(false);
      setIsSaved(savedSpells.some((item) => item.id === spell.id));
    } else {
      dialog && dialog.classList.remove("popup_active");
      overlay && overlay.classList.remove("overlay_active");
      document.body.style.overflow = "unset";
      setIsDisabled(true);
    }
  }, [spell, savedSpells]);

  function handleClose() {
    dispatch(clearSpell());
  }

  function handleSave() {
    if (spell) {
      dispatch(saveSpell(spell));
      setIsSaved(true);
    }
  }

  function handleDelete() {
    if (spell) {
      dispatch(deleteSpell(spell.id));
      setIsSaved(false);
    }
  }

  // if (!spell) return null;
  console.log(spell)
  return (
    <>
      <div ref={overlayRef} className="overlay" onClick={handleClose} />
      <div ref={dialogRef} className="popup">
        <h2>{spell?.name + ` [${spell?.nameEN}]`}</h2>
        <span>
          {(spell?.level === 0 ? "Заговор" : `${spell?.level} уровень`) + ", " + spell?.school}
        </span>
        <span><b>Время накладывания:</b> {" " + spell?.castTime}</span>
        <span><b>Дистанция:</b> {" " + spell?.distance}</span>
        <span>
          <b>Компоненты:</b>
          {" " + (spell?.verbal ? "В " : "") + (spell?.somatic ? "С " : "") + (spell?.material ? "М " : "")}
        </span>
        <span><b>Длительность:</b> {" " + spell?.duration}</span>
        <span><b>Классы:</b> {" " + spell?.classes}</span>
        {spell?.archetypes && <span><b>Архетипы:</b> {" " + spell?.archetypes}</span>}
        <div>
          <b>Источник:</b>
          {spell?.source.map((item, index) => (
            <span key={index}>{" " + item.name}</span>
          ))}
        </div>
        <div className="description">
          {spell?.description.map((string, index) => (
            <p key={index}>{string}</p>
          ))}
        </div>
        <div className="popup-controls">
          <button className="button button-close" onClick={handleClose}>Закрыть</button>
          {isSaved ? (
            <button className="button button-delete" onClick={handleDelete}>Удалить</button>
          ) : (
            <button className="button button-save" onClick={handleSave}>Сохранить</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Popup;
