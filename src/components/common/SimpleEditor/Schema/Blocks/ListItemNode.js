import React from 'react';

export default class ListItemNode extends React.Component{
  static get nodeType(){
    return 'list-item';
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <li {...this.props.attributes}>
        {this.props.children}
      </li>
    )
  }
}