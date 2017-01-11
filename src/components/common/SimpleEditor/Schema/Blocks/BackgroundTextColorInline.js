import React from 'react';

export default class BackgroundTextColorInline extends React.Component{
  static get nodeType(){
    return 'background-text-color';
  }

  constructor(props){
    super(props);
  }
  render(){
    const { data } = this.props.node;
    const color = data.get('color');
    return (
      <span style={{ 'backgroundColor': 'blue' }}>
        {this.props.children}
      </span>
    )
  }
}