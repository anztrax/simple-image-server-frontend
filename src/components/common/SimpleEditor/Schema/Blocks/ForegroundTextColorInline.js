import React from 'react';

export default class ForegroundTextColorInline extends React.Component{
  static get nodeType(){
    return 'foreground-text-color';
  }

  constructor(props){
    super(props);
  }
  render(){
    const { data } = this.props.node;
    const color = data.get('color');
    return (
      <span style={{ 'color': color }}>
        {this.props.children}
      </span>
    )
  }
}