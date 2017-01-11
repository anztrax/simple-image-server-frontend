import React from 'react';

export default class ComboBoxItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { text, value } = this.props;
    return (
      <option value={value}>
        {text}
      </option>
    )
  }
}