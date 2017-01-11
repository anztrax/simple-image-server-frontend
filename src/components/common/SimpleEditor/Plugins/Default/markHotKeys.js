import keycode from 'keycode';

export default function MarkHotKeys(options){
  const {type, key} = options;

  return {
    onKeyDown(event, data, state){
      if(!event.metaKey || keycode(event.which) != key) return;
      return state.transform().toggleMark(type).apply();
    }
  }
}