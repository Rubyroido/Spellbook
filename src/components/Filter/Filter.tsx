import { FC } from 'react';
import './Filter.css';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { toggleLevel } from '../../store/filterSlice';

const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Filter: FC = () => {
  const selectedLevels = useAppSelector(state => state.filter)
  const dispatch = useAppDispatch()

  const toggleFilter = (level: number) => {
    dispatch(toggleLevel(level))
  };

  return (
    <form className="filter">
      {levels.map((level) => (
        <label key={level} className={`filter__item ${selectedLevels.includes(level) ? 'active' : ''}`}>
          <input
            type="checkbox"
            className="filter__checkbox"
            checked={selectedLevels.includes(level)}
            onChange={() => toggleFilter(level)}
          />
          {level === 0 ? 'Заговоры' : `${level}`}
        </label>
      ))}
    </form>
  );
};

export default Filter;
