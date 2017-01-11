
export default function KeydownHandler(){
  return {
    onKeyDown(event, data, state){
      console.log('event : ',event);
      console.log('data : ',data);
      console.log('state : ',state);
      return;
    }
  }
}