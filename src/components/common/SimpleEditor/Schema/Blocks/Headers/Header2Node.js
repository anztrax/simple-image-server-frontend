import React from 'react';

export default class Header2 extends React.Component{
  static get nodeType(){
    return 'header2';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <h2 {...this.props.attributes}>
        {this.props.children}
      </h2>
    )
  }
}