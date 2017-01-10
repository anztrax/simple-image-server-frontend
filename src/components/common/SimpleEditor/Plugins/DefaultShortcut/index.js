import markHotKeys from './markHotKeys';
import softBreakKey from './softBreakKey';
import { BoldMark, ItalicMark, StrikethroughMark, UnderlineMark } from '../../Schema/Marks';

const plugins = [
  markHotKeys({type : BoldMark.markType, key : 'b'}),
  markHotKeys({type : UnderlineMark.markType, key : 'u'}),
  markHotKeys({type : ItalicMark.markType, key : 'i'}),
  markHotKeys({type : StrikethroughMark.markType, key : 'd'}),
  softBreakKey()
];

export default plugins;