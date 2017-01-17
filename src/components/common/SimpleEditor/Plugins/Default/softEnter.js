import keycode from 'keycode';

export default function softEnter({ key }){
  return {
    onKeyDown(event, data, state){
      if(!event.metaKey || keycode(event.which) != key) return;
      return state
        .transform()
        .insertText('\n')
        .apply()
    }
  }
}