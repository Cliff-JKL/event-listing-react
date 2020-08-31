import React, { Component } from 'react';

import base from '../scss/base.scss';

class Select extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChangeList(e.target.value);
  }

  render() {
    return (
      <div className={base['select-area-box']}>
        <p>{this.props.name}</p>
        <select id="select_city" className={base.select} onChange={this.onChange}>
          <option defaultValue="All">All</option>
          {this.props.options.map((option, index) => <option key={option} value={option}>{option}</option>) }
        </select>
      </div>
    );
  }
}

export default Select;
