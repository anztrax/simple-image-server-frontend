import React from 'react';
import ComboBoxItem from './ComboBoxItem';

export default class ComboBox extends React.Component{
  constructor(props){
    super(props);
    this.generateComboBoxItems = this.generateComboBoxItems.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getDefaultValue = this.getDefaultValue.bind(this);
  }

  /**
   * {text : 'edit', value : { isEdit : true }},
   {text : 'suggestion', value : { isEdit : true }},
   {text : 'readonly', value : { isEdit : false }}
   * @param event
   * @param data
   * @param state
   */
  generateComboBoxItems(){
    const { items } = this.props;
    return items.map((item, index) => {
      return (
        <ComboBoxItem
          key={index}
          value={index}
          text={item.text}
        />
      )
    });
  }

  handleOnChange(event){
    const { onChange, items } = this.props;
    const currentIndex = event.target.value;
    const item = items[currentIndex];

    onChange({
      value : item
    });
  }

  getDefaultValue(){
    const { defaultValue, items } = this.props;
    if(typeof defaultValue !== 'undefined'){
      return defaultValue.value;
    }else{
      if(typeof items !== 'undefined'){
        if(items.length > 0){
          return items[0].value || '';
        }
      }
    }

    return '';
  }

  render(){
    const generatedComboBoxItems = this.generateComboBoxItems();
    return (
      <select onChange={this.handleOnChange}>
        {generatedComboBoxItems}
      </select>
    )
  }
}