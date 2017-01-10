import React from 'react';

export default class Header5 extends React.Component{
  static get nodeType(){
    return 'header5';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <h5 {...this.props.attributes}>
        {this.props.children}
      </h5>
    )
  }
}