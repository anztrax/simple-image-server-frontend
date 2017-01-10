import React from 'react';

export default class BoldMark extends React.Component{
  static get markType(){
    return 'bold';
  }

  constructor(props){
    super(props);
  }
  render(){
    return (
      <strong>{this.props.children}</strong>
    )
  }
}