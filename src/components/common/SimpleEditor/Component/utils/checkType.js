export function hasBlockType(editorState, type){
  return editorState.blocks.some(node => node.type == type);
}
