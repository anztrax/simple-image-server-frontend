import React from 'react';

export default class ParagraphNode extends React.Component{
  static get nodeType(){
    return 'paragraph';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <a>{this.props.children} </a>
    );
  }
}