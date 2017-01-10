import React from 'react';

export default class StrikethroughMark extends React.Component{
  static get markType(){
    return 'strikethrough';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <del>{this.props.children}</del>
    )
  }
}