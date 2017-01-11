
export default function SuggestionHandler(viewMode){
  return {
    onKeyDown(event, data, state){
      if(viewMode.text == 'suggestion'){
        console.log('keydown suggestion');
      }
      console.log('keyDown viewMode on : ', viewMode.text);
      return;
    },
    onSelect(event, data, state, editor){
      if(viewMode.text == 'suggestion'){
        console.log('select suggestion');
      }
      console.log('onSelect viewMode on : ', viewMode.text);
      return;
    }
  }
}