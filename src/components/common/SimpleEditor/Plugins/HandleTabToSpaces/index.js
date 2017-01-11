export default function handleTabToSpaces(){
  return {
    onBeforeInput(event, data, state){
      console.log('event : ',event);
      console.log('data : ',data);
      console.log('state : ',state);

      return state;
    },
    onKeyDown(event, data, state, editor){
      console.log('on key down : ',event);
      console.log('data : ',data);
      console.log('state : ',state);
      console.log('editor : ',editor);
      return state;
    }
  }
}