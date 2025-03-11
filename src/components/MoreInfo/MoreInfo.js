import styles from './MoreInfo.module.scss';
import { useDispatch } from 'react-redux';
import { showMoreTickets } from '../../store/ticketsReducer';

const MoreInfo = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showMoreTickets());
  };

  return (
    <div className={styles.MoreInfo}>
      <button className={styles.MoreInfoBtn} onClick={handleClick}>
        Показать еще 5 билетов
      </button>
    </div>
  );
};

export default MoreInfo;
