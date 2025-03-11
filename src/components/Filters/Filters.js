import styles from './Filters.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/sortReducer';

const Filters = () => {
  const sortType = useSelector((state) => state.sort.sortType);
  const dispatch = useDispatch();

  const getClassName = (type) => {
    return `${styles.FiltersItem} ${sortType === type ? styles.FiltersActive : ''}`;
  };

  return (
    <div>
      <ul className={styles.FiltersList}>
        <li
          onClick={() => dispatch(setSortType('самый дешевый'))}
          className={getClassName('самый дешевый')}
        >
          самый дешевый
        </li>
        <li
          onClick={() => dispatch(setSortType('самый быстрый'))}
          className={getClassName('самый быстрый')}
        >
          самый быстрый
        </li>
        <li
          onClick={() => dispatch(setSortType('оптимальный'))}
          className={getClassName('оптимальный')}
        >
          оптимальный
        </li>
      </ul>
    </div>
  );
};

export default Filters;
