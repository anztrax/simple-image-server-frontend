import React from 'react';
import SimpleEditor from '../../../components/common/SimpleEditor';
import ComboBox from '../../../components/common/ComboBox';

class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.comboBoxValues = [
      {text : 'edit', value : { isEdit : true }},
      {text : 'suggestion', value : { isEdit : true }},
      {text : 'readonly', value : { isEdit : false }}
    ];

    this.state = {
      comboBoxValue: this.comboBoxValues[0]
    };
    this.handleComboBoxChange = this.handleComboBoxChange.bind(this);
  }

  handleComboBoxChange({value}){
    console.log('value : ',value);
    this.setState({
      comboBoxValue : value
    })
  }

  render(){
    return (
      <div>
        <ComboBox
          items={this.comboBoxValues}
          onChange={this.handleComboBoxChange}
        />
        <h1>Index Page</h1>
    <SimpleEditor
    viewMode={this.state.comboBoxValue}
  />
  </div>
  )
  }
}

export default IndexPage;