import React from 'react';
import ListItem from './ListItem';
import Style from './Style.css';
import classnames from 'classnames';

export default class List extends React.Component{
  constructor(props){
    super(props);

    this.generateListItems = this.generateListItems.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick(value){
    console.log('value : ',value);
  }

  generateListItems(){
    const { data, setIgnoreBlur, setHighlightedIndex } = this.props;
    return data.map((dataItem,index) => {
      return (
        <ListItem
          key={index}
          index={index}
          setHighlightedIndex={setHighlightedIndex}
          text={dataItem.text}
          value={dataItem.value}
          setIgnoreBlur={setIgnoreBlur}
          onClick={this.handleListItemClick.bind(this)}
        />
      )
    });
  }

  render(){
    const { getIsOpen } = this.props;
    const ListStyle = classnames(Style.list,(getIsOpen() ? '' : Style['hide-list']));
    const listItems = this.generateListItems();
    return (
      <ul className={ListStyle}>
        {listItems}
      </ul>
    )
  }
}