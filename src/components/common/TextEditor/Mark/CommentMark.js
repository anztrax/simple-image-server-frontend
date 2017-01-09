import React from 'react';

export default class CommentMark extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <span style={{backgroundColor : '#ff0ff1',color: 'white'}}>
        {this.props.children}
      </span>
    )
  }
}