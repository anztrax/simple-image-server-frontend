import React from 'react';

export default class ItalicMark extends React.Component{
  static get markType(){
    return 'italic';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <em>{this.props.children}</em>
    )
  }
}