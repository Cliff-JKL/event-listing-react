import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import EventItem from './EventItem';

const EventList = (props) => (
  <>
    { props.events.map((event) => {
      console.log(event.id);
      return <EventItem id={Number(event.id)} image={event.image} date={event.date.slice(0, 2)} name={event.name} />;
    }) }
  </>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventList;
