import React from 'react';

export default class BackgroundColorMark extends React.Component{
  static get markType(){
    return 'background-text-color-mark';
  }

  constructor(props){
    super(props);
  }

  render(){
    const { data } = this.props.mark;
    const color = data.get('color');
    return (
      <span style={{'backgroundColor' : color}}>
        {this.props.children}
      </span>
    )
  }
}