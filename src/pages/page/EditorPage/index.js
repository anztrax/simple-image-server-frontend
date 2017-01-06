import React from 'react';
import SimpleTextEditor from '../../../components/common/TextEditor/SimpleTextEditor';
import SimpleAutoComplete from '../../../components/common/AutoComplete/SimpleAutoComplete';

export default class EditorPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listData : [
        {text : 'data 1', value : 'data1'},
        {text : 'data 2', value : 'data2'},
        {text : 'data 3', value : 'data3'},
      ],
      autoCompleteInputText : 'data',
    }
  }

  render(){
    return (
      <div>
        <h1>Editor Page</h1>
        <SimpleAutoComplete
          open={false}
          listData={this.state.listData}
          value={this.state.autoCompleteInputText}
        />

        <SimpleTextEditor />
      </div>
    );
  }
}