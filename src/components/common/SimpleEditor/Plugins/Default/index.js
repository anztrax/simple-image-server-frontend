import markHotKeys from './markHotKeys';
// import SoftBreak from 'slate-soft-break';
import softEnter from './softEnter';
import AutoReplaceText from 'slate-auto-replace-text';
import CollapseOnEscape from 'slate-collapse-on-escape';
import { BoldMark, ItalicMark, StrikethroughMark, UnderlineMark } from '../../Schema/Marks';

function plugins(){
  const plugins = [
    markHotKeys({type : BoldMark.markType, key : 'b'}),
    markHotKeys({type : UnderlineMark.markType, key : 'u'}),
    markHotKeys({type : ItalicMark.markType, key : 'i'}),
    markHotKeys({type : StrikethroughMark.markType, key : 'd'}),
    // softEnter({key : 'enter'}),
    AutoReplaceText('(c)', '©'),
    AutoReplaceText('(r)', '®'),
    AutoReplaceText('(tm)', '™'),
    CollapseOnEscape()
  ];
  return plugins;
}


export default plugins;