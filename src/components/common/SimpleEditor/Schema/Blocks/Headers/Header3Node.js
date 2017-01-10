import React from 'react';

export default class Header3 extends React.Component{
  static get nodeType(){
    return 'header3';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <h3 {...this.props.attributes}>
        {this.props.children}
      </h3>
    )
  }
}