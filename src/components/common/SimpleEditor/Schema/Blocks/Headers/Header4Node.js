import React from 'react';

export default class Header4 extends React.Component{
  static get nodeType(){
    return 'header4';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <h4 {...this.props.attributes}>
        {this.props.children}
      </h4>
    )
  }
}