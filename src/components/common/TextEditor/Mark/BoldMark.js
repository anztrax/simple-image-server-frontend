import React from 'react';

export default class BoldMark extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <strong>{this.props.children}</strong>
    )
  }
}