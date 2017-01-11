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
    const backgroundColor = data.get('backgroundColor');
    return (
      <span style={{ 'backgroundColor': backgroundColor }}>
        {this.props.children}
      </span>
    )
  }
}