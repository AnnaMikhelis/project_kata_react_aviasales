/* eslint-disable indent */
import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import { fetchSearchId, fetchTickets } from '../../store/ticketsActions';
import MoreInfo from '../MoreInfo/MoreInfo';
import { BarLoader } from 'react-spinners';

const Card = () => {
  const dispatch = useDispatch();
  const { searchId, tickets, visibleTicketsCount, status, stop } = useSelector(
    (state) => state.tickets
  );
  const checkboxes = useSelector((state) => state.checkboxes);
  const sortType = useSelector((state) => state.sort.sortType);

  useEffect(() => {
    if (!searchId && status === 'idle') {
      dispatch(fetchSearchId());
    }
  }, [dispatch, searchId, status]);

  useEffect(() => {
    let intervalId;
    if (searchId && !stop) {
      intervalId = setInterval(() => {
        dispatch(fetchTickets(searchId));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [dispatch, searchId, stop]);

  const applyFilters = useCallback(
    (tickets) => {
      if (!checkboxes) return tickets;

      const activeFilters = Object.keys(checkboxes).filter(
        (key) => checkboxes[key] && key !== 'Все'
      );

      if (activeFilters.length === 0 && !checkboxes['Все']) {
        return [];
      }

      if (checkboxes['Все']) {
        return tickets;
      }

      return tickets.filter((ticket) =>
        ticket.segments.some((segment) =>
          activeFilters.includes(
            segment.stops.length === 0
              ? 'Без пересадок'
              : `${segment.stops.length} пересадк${
                  segment.stops.length > 1 ? 'и' : 'а'
                }`
          )
        )
      );
    },
    [checkboxes]
  );

  const applySort = useCallback(
    (tickets) => {
      switch (sortType) {
        case 'самый дешевый':
          return [...tickets].sort((a, b) => a.price - b.price);
        case 'самый быстрый':
          return [...tickets].sort(
            (a, b) =>
              getTotalDuration(a.segments) - getTotalDuration(b.segments)
          );
        case 'оптимальный':
          return [...tickets].sort(
            (a, b) =>
              a.price - b.price ||
              getTotalDuration(a.segments) - getTotalDuration(b.segments)
          );
        default:
          return tickets;
      }
    },
    [sortType]
  );

  const getTotalDuration = (segments) =>
    segments.reduce((sum, segment) => sum + segment.duration, 0);

  const filteredTickets = useMemo(
    () => applyFilters(tickets),
    [JSON.stringify(tickets), applyFilters]
  );
  const sortedTickets = useMemo(
    () => applySort(filteredTickets),
    [JSON.stringify(filteredTickets), applySort]
  );

  const SegmentInfo = ({ segment }) => (
    <div className={styles.CardInfo}>
      <div className={styles.CardInfoSchedule}>
        <p>
          {segment.origin} - {segment.destination}
        </p>
        <p>
          {new Date(segment.date).toLocaleTimeString()} -{' '}
          {new Date(
            new Date(segment.date).getTime() + segment.duration * 60000
          ).toLocaleTimeString()}
        </p>
      </div>
      <div className={styles.CardInfoTime}>
        <p>В пути</p>
        <p>
          {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
        </p>
      </div>
      <div className={styles.CardInfoTransplant}>
        <p>{segment.stops.length} пересадки</p>
        <p>{segment.stops.join(', ')}</p>
      </div>
    </div>
  );

  SegmentInfo.propTypes = {
    segment: PropTypes.shape({
      origin: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      stops: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  };

  return (
    <div className={styles.TicketsList}>
      {!stop && (
        <div className={styles.spinner}>
          <BarLoader color="#0081f9" width={500} height={2} />
        </div>
      )}

      {sortedTickets.length === 0 && tickets.length !== 0 ? (
        <p>Рейсов, подходящих под заданные фильтры, не найдено</p>
      ) : (
        sortedTickets.slice(0, visibleTicketsCount).map((ticket, index) => (
          <div key={index} className={styles.Card}>
            <div className={styles.CardHeader}>
              <div className={styles.CardPrice}>{ticket.price} Р</div>
              <div className={styles.CardLogo}>
                <img
                  src={`http://pics.avs.io/99/36/${ticket.carrier}.png`}
                  alt="logoAir"
                />
              </div>
            </div>
            {ticket.segments.map((segment, segIndex) => (
              <SegmentInfo key={segIndex} segment={segment} />
            ))}
          </div>
        ))
      )}
      <MoreInfo />
    </div>
  );
};

export default Card;
