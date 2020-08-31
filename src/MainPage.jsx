import React, { Component } from 'react';

import EventList from './components/EventList';
import Filter from './components/Filter';
import Select from './components/Select';
import base from './scss/base.scss';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let cities = [];
let months = [];
fetch('http://localhost:3010/events')
  .then((resp) => resp.json())
  .then((data) => {
    cities = Array.from(new Set(data.map((element) => element.city))).sort();
    months = Array.from(new Set(
      data.map((element) => monthNames[Number(element.date.slice(3, 5)) - 1]),
    ));
    months.sort((a, b) => {
      if (monthNames.indexOf(a) < monthNames.indexOf(b)) {
        return -1;
      }
      if (monthNames.indexOf(a) > monthNames.indexOf(b)) {
        return 1;
      }
      return 0;
    });
  });

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeCityFilter = this.onChangeCityFilter.bind(this);
    this.onChangeMonthFilter = this.onChangeMonthFilter.bind(this);
    this.onChangeNameFilter = this.onChangeNameFilter.bind(this);
    this.state = {
      defaultEvents: [], events: [], cityFilter: 'All', monthFilter: 'All',
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3010/events';
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ defaultEvents: data, events: data });
      });
  }

  onChangeCityFilter(eventFilter) {
    this.setState({ cityFilter: eventFilter });
    this.setState({
      events: this.getNewItemList(this.state.defaultEvents,
        eventFilter,
        this.state.monthFilter),
    });
  }

  getNewItemList(data, city, month) {
    if (city !== 'All' && month !== 'All') {
      return data.filter((element) => Number(element.date.slice(3, 5)) === Number(monthNames.indexOf(month) + 1));
    } if (city === 'All' && month === 'All') {
      return data;
    }
    return city === 'All'
      ? data.filter((element) => Number(element.date.slice(3, 5)) === Number(monthNames.indexOf(month) + 1))
      : data.filter((element) => element.city === city);
  }

  onChangeMonthFilter(eventFilter) {
    this.setState({ monthFilter: eventFilter });
    this.setState({ events: this.getNewItemList(this.state.defaultEvents, this.state.cityFilter, eventFilter) });
  }

  onChangeNameFilter(eventFilter) {
    if (!eventFilter.trim()) {
      this.setState({ events: this.state.defaultEvents });
    } else {
      const eventRegexp = new RegExp(eventFilter.trim(), 'gi');
      const newEvents = this.state.defaultEvents.filter((element) => element.name.match(eventRegexp));
      this.setState({ events: newEvents });
    }
  }

  render() {
    return (
      <>
        <h1>Event Listing</h1>
        <Filter onChangeList={this.onChangeNameFilter} />
        <div className={base['select-area']}>
          <Select options={cities} name="City:" onChangeList={this.onChangeCityFilter} />
          <Select options={months} name="Month:" onChangeList={this.onChangeMonthFilter} />
        </div>
        <div id="event_list" className={base['event-list']}>
          <EventList events={this.state.events} />
        </div>
      </>
    );
  }
}

export default MainPage;
