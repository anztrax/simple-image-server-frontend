import React from 'react';
import style from './Style.css';

export default class listItem extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOnMouseDown = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    const { onClick, value } = this.props;
    onClick(value);
  }

  handleOnMouseEnter(){
    const { setHighlightedIndex, index } = this.props;
    setHighlightedIndex(index);
  }

  handleOnMouseDown(){
    const {setIgnoreBlur} = this.props;
    setIgnoreBlur(true);
  }

  render(){
    const { text} = this.props;
    return (
      <li
        className={style.listItem}
        onClick={this.handleClick.bind(this)}
        onMouseEnter={this.handleOnMouseEnter.bind(this)}
        onMouseDown={this.handleOnMouseDown.bind(this)}
      >
        <div className={style.listItemChild}>
          {text}
        </div>
      </li>
    )
  }
}