import React from 'react';

export default class LinkNote extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const { data } = this.props.node;
    const href = data.get('href');
    return (
      <a {...this.props.attributes} href={href}>{this.props.children}</a>
    )
  }
}