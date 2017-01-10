import React from 'react';

export default class LinkNode extends React.Component{
  static get nodeType(){
    return 'link';
  }

  constructor(props){
    super(props);
  }

  render(){
    const { data } = this.props.node;
    const href = data.get('href');
    return (
      <a {...this.props.attributes} href={href}>
        {this.props.children}
      </a>
    );
  }
}