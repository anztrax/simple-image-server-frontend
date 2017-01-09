import React from 'react';

export default class ItalicMark extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <em>{this.props.children}</em>
    )
  }
}