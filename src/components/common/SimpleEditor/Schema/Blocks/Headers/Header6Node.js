import React from 'react';

export default class Header6 extends React.Component{
  static get nodeType(){
    return 'header6';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <h6 {...this.props.attributes}>
        {this.props.children}
      </h6>
    )
  }
}