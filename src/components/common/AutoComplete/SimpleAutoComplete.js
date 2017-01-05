import React from 'react';
import List from './List/List';
import AutoCompleteInput from './Input/AutoCompleteInput';

export default class SimpleAutoComplete extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isOpen : this.props.open,
      value : this.props.value,
      listData : this.props.listData,
      highlightedIndex : null
    };

    this.handleChange = this.handleChange.bind(this);
    this.setIsOpen = this.setIsOpen.bind(this);
    this.getIsOpen = this.getIsOpen.bind(this);
    this.setHighlightedIndex = this.setHighlightedIndex.bind(this);
    this.getHighlightedIndex = this.getHighlightedIndex.bind(this);
    this.shouldItemRender = this.shouldItemRender.bind(this);

    this.ignoreBlur = false;
    this.setIgnoreBlur = this.setIgnoreBlur.bind(this);
    this.getIgnoreBlur = this.getIgnoreBlur.bind(this);
  }

  handleChange(value){
    this.setState({
      value
    });
    console.log('handle change : ',value);
  }

  setIgnoreBlur(ignore){
    this.ignoreBlur = ignore;
  }

  getIgnoreBlur(){
    return this.ignoreBlur;
  }

  setIsOpen(isOpenValue){
    this.setState({
      isOpen : isOpenValue
    })
  }

  shouldItemRender(listItemData,value){
    return (
      listItemData.text.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      listItemData.value.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  filterListData(){
    const { listData, value } = this.state;
    if(listData){
      return listData.filter(listItemData =>(
        this.shouldItemRender(listItemData,value)
      ));
    }
  }

  getIsOpen(){
    return this.state.isOpen;
  }

  getHighlightedIndex(){
    return this.state.highlightedIndex;
  }

  setHighlightedIndex(newHighlightedIndex){
    this.setState({
      highlightedIndex : newHighlightedIndex
    });
  }

  render(){
    const { value, isOpen } = this.state;
    return (
      <div>
        <AutoCompleteInput
          type="text"
          value={value}
          setIgnoreBlur={this.setIgnoreBlur}
          getIgnoreBlur={this.getIgnoreBlur}
          setIsOpen={this.setIsOpen}
          getIsOpen={this.getIsOpen}
          onChange={this.handleChange}
        />
        <List
          setHighlightedIndex={this.setHighlightedIndex}
          getHighlightedIndex={this.getHighlightedIndex}
          data={this.filterListData()}
          getIsOpen={this.getIsOpen}
          getIgnoreBlur={this.getIgnoreBlur}
          setIgnoreBlur={this.setIgnoreBlur}
        />
      </div>
    )
  }
}