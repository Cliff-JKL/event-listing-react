import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import EventItem from './EventItem';

const EventList = (props) => (
  <>
    { props.events.map((event) =>
    // console.log(event.id);
      <EventItem key={event.id.toString()} id={Number(event.id)} image={event.image} date={event.date.slice(0, 2)} name={event.name} />) }
  </>
);

EventList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default EventList;
