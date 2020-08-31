import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChangeList(e.target.value);
  }

  render() {
    return (
      <>
        <input type="text" onChange={this.onChange} />
      </>
    );
  }
}

export default Filter;
