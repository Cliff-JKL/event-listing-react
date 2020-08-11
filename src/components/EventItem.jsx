import React from 'react';
import PropTypes from 'prop-types';

import base from '../scss/base.scss';
import bookmarkSrc from '../pics/bookmark.png';

const Event = ({
  id, image, date, name,
}) => (
  <div className={base.tile}>
    <img src={image} className={base['tile-img']} />
    <div className={base['tile-date']}>{date}</div>
    <img src={bookmarkSrc} className={base['tile-svg']} />
    <div className={base['tile-name']}>
      <h1><a href={`/events/${id}/${name}`}>{name}</a></h1>
    </div>
  </div>
);

Event.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  date: PropTypes.string,
  name: PropTypes.string,
};

export default Event;
