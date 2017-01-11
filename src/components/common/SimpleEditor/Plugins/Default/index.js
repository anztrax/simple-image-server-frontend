import markHotKeys from './markHotKeys';
// import SoftBreak from 'slate-soft-break';
import AutoReplaceText from 'slate-auto-replace-text';
import CollapseOnEscape from 'slate-collapse-on-escape';
import { BoldMark, ItalicMark, StrikethroughMark, UnderlineMark } from '../../Schema/Marks';

const plugins = [
  markHotKeys({type : BoldMark.markType, key : 'b'}),
  markHotKeys({type : UnderlineMark.markType, key : 'u'}),
  markHotKeys({type : ItalicMark.markType, key : 'i'}),
  markHotKeys({type : StrikethroughMark.markType, key : 'd'}),
  // SoftBreak(),
  AutoReplaceText('(c)', '©'),
  AutoReplaceText('(r)', '®'),
  AutoReplaceText('(tm)', '™'),
  CollapseOnEscape()
];

export default plugins;