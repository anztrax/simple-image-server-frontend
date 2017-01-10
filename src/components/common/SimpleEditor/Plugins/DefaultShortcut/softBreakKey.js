export default function softBreakKey(){
  return {
    onKeyDown(event, data, state) {
      if (data.key == 'enter' && data.isShift) {
        return state
          .transform()
          .insertText('\n')
          .apply();
      }
    }
  }
}