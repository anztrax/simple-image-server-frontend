import React from 'react';

export default class UnderlineMark extends React.Component{
  static get markType(){
    return 'underline';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <u>{this.props.children}</u>
    )
  }
}