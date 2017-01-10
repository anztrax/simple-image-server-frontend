import React from 'react';

export default class BlockquoteNode extends React.Component{
  static get nodeType(){
    return 'blockquote';
  }


  constructor(props){
    super(props);
  }

  render(){
    return (
      <blockquote {...this.props.attributes}>
        {this.props.children}
      </blockquote>
    )
  }
}