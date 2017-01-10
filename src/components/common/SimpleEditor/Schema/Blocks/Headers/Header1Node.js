import React from 'react';

export default class Header1 extends React.Component{
  static get nodeType(){
    return 'header1';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <h1 {...this.props.attributes}>
        {this.props.children}
      </h1>
    )
  }
}