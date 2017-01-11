import React from 'react';
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import StrikethroughMark from './StrikethroughMark';
import UnderlineMark from './UnderlineMark';
import ForegroundColorMark from './ForegroundColorMark';

let marksMap = [];
marksMap[BoldMark.markType] = BoldMark;
marksMap[ItalicMark.markType] = ItalicMark;
marksMap[StrikethroughMark.markType] = StrikethroughMark;
marksMap[UnderlineMark.markType] = UnderlineMark;
marksMap[ForegroundColorMark.markType] = ForegroundColorMark;

export {
  marksMap,
  BoldMark,
  ItalicMark,
  StrikethroughMark,
  UnderlineMark,
  ForegroundColorMark
};