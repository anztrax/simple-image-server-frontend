import React from 'react';

export default class CommentNode extends React.Component{
  static get nodeType(){
    return 'comment';
  }

  constructor(props){
    super(props);
  }

  render(){
    const { data } = this.props.node;
    const comment = data.get('comment');
    return (
      <span style={{ borderBottom : '4px solid #FFCF1F', background: '#FFCF1F'}} data-comment={comment}>
        {this.props.children}
      </span>
    )
  }
}