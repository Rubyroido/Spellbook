import './Popup.css';
// import ISpell from "../../interface/ISpell";
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { saveSpell, deleteSpell } from '../../store/spellsSlice';
import { usePreventScroll } from '@react-aria/overlays';


function Popup({ spell, onClose }: { spell: any, onClose: any }) {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const savedSpells = useAppSelector(state => state.spells.spells).filter((spell: any) => spell !== null);
  const [isSaved, setIsSaved] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  usePreventScroll({isDisabled})

  useEffect(() => {
    const dialog = dialogRef.current;
    const overlay = overlayRef.current;
    if (dialog && spell !== null && overlay) {
      dialog.classList.add('popup_active');
      overlay.classList.add('overlay_active');
      document.body.style.overflow = 'hidden';
      const isSpellSaved = savedSpells.some((item: any) => item.id === spell.id);
      setIsDisabled(false)
      setIsSaved(isSpellSaved)
    } else if (dialog && overlay) {
      dialog.classList.remove('popup_active');
      overlay.classList.remove('overlay_active');
      document.body.style.overflow = 'unset';
      setIsDisabled(true)
    }
  }, [spell])

  function handleClose() {
    onClose()
  }

  function handleSave() {
    dispatch(saveSpell(spell))
    setIsSaved(true)
  }

  function handleDelete() {
    dispatch(deleteSpell(spell))
    setIsSaved(false)
  }


  return (
    <>
      <div ref={overlayRef} className='overlay' onClick={handleClose} />
      <div ref={dialogRef} className='popup'>
        <h2>{spell?.name + ` [${spell?.nameEN}]`}</h2>
        <span>{(spell?.level === 0 ? 'Заговор' : `${spell?.level} уровень`) + ', ' + spell?.school}</span>
        <span><b>Время накладывания:</b>{' ' + spell?.castTime}</span>
        <span><b>Дистанция:</b>{' ' + spell?.distance}</span>
        <span><b>Компоненты:</b>{' ' + ((spell?.verbal) ? 'В ' : '') + ((spell?.somatic) ? 'С ' : '') + ((spell?.material) ? 'М ' : '')}</span>
        <span><b>Длительность:</b>{' ' + spell?.duration}</span>
        <span><b>Классы:</b>{' ' + spell?.classes}</span>
        {
          spell?.archetypes ? <span><b>Архетипы:</b>{' ' + spell?.archetypes}</span> : false
        }
        {
          spell?.source.map((item: any) => {
            return (
              <span><b>Источник:</b>{' ' + item.name}</span>
            )
          })
        }
        <div className='description'>
          {
            spell?.descriprion.map((string: string) => {
              return (
                <p>{string}</p>
              )
            })
          }
        </div>
        <div className='popup-controls'>
          <button className='button button-close' onClick={handleClose}>закрыть</button>
          {
            isSaved ?
              <button className='button button-delete' onClick={handleDelete}>удалить</button> :
              <button className='button button-save' onClick={handleSave}>сохранить</button>
          }
        </div>
      </div>
    </>
  )
}

export default Popup;