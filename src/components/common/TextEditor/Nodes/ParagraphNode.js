import React from 'react';

export default class ParagraphNode extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <p>{this.props.children}</p>
    )
  }
}