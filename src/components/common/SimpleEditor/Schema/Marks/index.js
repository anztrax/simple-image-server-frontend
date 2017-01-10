import React from 'react';
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import StrikethroughMark from './StrikethroughMark';
import UnderlineMark from './UnderlineMark';

let marksMap = [];
marksMap[BoldMark.markType] = BoldMark;
marksMap[ItalicMark.markType] = ItalicMark;
marksMap[StrikethroughMark.markType] = StrikethroughMark;
marksMap[UnderlineMark.markType] = UnderlineMark;
console.log('marksmap : ',marksMap);
export {
  marksMap,
  BoldMark,
  ItalicMark,
  StrikethroughMark,
  UnderlineMark
};