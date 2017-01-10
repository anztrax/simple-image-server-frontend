import React from 'react';

export default class OrderedListNode extends React.Component{
  static get nodeType(){
    return 'numbered-list';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <ol {...this.props.attributes}>
        {this.props.children}
      </ol>
    )
  }
}