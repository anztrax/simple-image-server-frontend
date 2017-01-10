import React from 'react';

export default class UnorderedListNode extends React.Component{
  static get nodeType(){
    return 'bulleted-list';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <ul {...this.props.attributes}>
        {this.props.children}
      </ul>
    )
  }
}