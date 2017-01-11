import createInlineButton from '../utils/createInlineButton';
import CommentNode from '../../Schema/Blocks/CommentNode';

export default createInlineButton(CommentNode.nodeType,'comments');