import "./Spells.css";
import SpellsGroup from "../SpellsGroup/SpellsGroup";
import Filter from "../Filter/Filter";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { clearFilter } from "../../store/filterSlice";
import { selectSortedSpells } from "../../store/spellsSlice";
import ISpell from "../../interface/ISpell";

interface ISpells {
  spellsList: ISpell[],
  submitSearch?: (searchValue: string) => void;
}

function Spells({ spellsList, submitSearch }: ISpells) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const savedSpells = useAppSelector(selectSortedSpells);
  const filterState = useAppSelector((state) => state.filter);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitSearch && submitSearch(searchValue);
  }

  function handleReset() {
    submitSearch && submitSearch("");
    setSearchValue("");
    dispatch(clearFilter());
  }

  function getFilteredSpells(spells: ISpell[]) {
    return filterState.length > 0
      ? spells.filter((spell) => filterState.includes(spell.level))
      : spells;
  }

  function renderSpellsGroups(spells: ISpell[]) {
    const levels = Array.from(new Set(spells.map((spell) => spell.level))).sort();

    return levels.map((level) => {
      const currentSpells = spells.filter((spell) => spell.level === level);
      return (
        <SpellsGroup key={level} level={level} currentSpells={currentSpells} />
      );
    });
  }

  return (
    <div className="spells">
      {location.pathname === "/" ? (
        <>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Введите название"
            />
            <button type="submit" className="search-button">
              Поиск
            </button>
            <button type="button" className="reset-button" onClick={handleReset}>
              Сброс
            </button>
          </form>
          <Filter />
          {renderSpellsGroups(getFilteredSpells(spellsList))}
        </>
      ) : savedSpells.length > 0 ? (
        renderSpellsGroups(getFilteredSpells(savedSpells))
      ) : (
        <p className="no-spells">Нет сохраненных заклинаний</p>
      )}
    </div>
  );
}

export default Spells;
