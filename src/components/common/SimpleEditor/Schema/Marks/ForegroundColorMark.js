import React from 'react';

export default class ForegroundColorMark extends React.Component{
  static get markType(){
    return 'foreground-text-color-mark';
  }

  constructor(props){
    super(props);
  }

  render(){
    const { data } = this.props.mark;
    const color = data.get('color');
    return (
      <span style={{'color' : color}}>
        {this.props.children}
      </span>
    )
  }
}