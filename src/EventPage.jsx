import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import EventItem from './components/EventItem';

const EventPage = () => {
  const { id, name } = useParams();
  const history = useHistory();
  const location = useLocation();

  // console.log('history: ', history);
  // console.log('location: ', location);

  const [event, setEvent] = useState({
    id: '...',
    name: '...',
    date: '01.01.1998',
    city: '...',
    genre: '...',
    image: '...',
  });

  useEffect(() => {
    const url = 'http://localhost:3010/events';
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setEvent(data.find((item) => Number(item.id) === Number(id)));
      });
  });

  return (
    <>
      <h2>{name}</h2>
      <p>
        event #
        {id}
      </p>
      <p>
        Date:&nbsp;
        {event.date}
      </p>
      <p>
        City:&nbsp;
        {event.city}
      </p>
      <p>
        Genre:&nbsp;
        {event.genre}
      </p>
      <EventItem id={Number(id)} image={event.image} date={event.date.slice(0, 2)} name={name} />
    </>
  );
};

export default EventPage;
