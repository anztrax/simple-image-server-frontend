import React from 'react';
import Style from './Style.css';
import ReactDOM from 'react-dom';

export default class CommentNode extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOnHover : false
    };
    this.handleOnFocus  = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnFocus(event){
    event.preventDefault();
    console.log('focus');
  }

  handleOnBlur(event){
    event.preventDefault();
    console.log('on blur');
  }

  componentDidMount(){
  }

  componentDidUpdate(prevProps, prevState){
  }

  render(){
    const { data, key } = this.props.node;
    const userId = data.get('userId');
    return (
      <span
        className={Style.commentNodeContainer}
        onClick={this.handleOnFocus}
      >
        <span
          className={Style.commentNode}
          onBlur={this.handleOnBlur}>
          {this.props.children}
        </span>
      </span>
    )
  }
}