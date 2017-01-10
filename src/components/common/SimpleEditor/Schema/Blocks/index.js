import BlockquoteNode from './BlockquoteNode';
import ListitemNode from './ListItemNode';
import OrderedListNode from './OrderedListNode';
import UnorderedListNode from './UnorderedListNode';
import Header1Node from './Headers/Header1Node';
import Header2Node from './Headers/Header2Node';
import Header3Node from './Headers/Header3Node';
import Header4Node from './Headers/Header4Node';
import Header5Node from './Headers/Header5Node';
import Header6Node from './Headers/Header6Node';

const blockMap = [];
blockMap[BlockquoteNode.nodeType] = BlockquoteNode;
blockMap[ListitemNode.nodeType] = ListitemNode;
blockMap[OrderedListNode.nodeType] = OrderedListNode;
blockMap[UnorderedListNode.nodeType] = UnorderedListNode;
blockMap[Header1Node.nodeType] = Header1Node;
blockMap[Header2Node.nodeType] = Header2Node;
blockMap[Header3Node.nodeType] = Header3Node;
blockMap[Header4Node.nodeType] = Header4Node;
blockMap[Header5Node.nodeType] = Header5Node;
blockMap[Header6Node.nodeType] = Header6Node;

export {
  blockMap,
  BlockquoteNode,
  ListitemNode,
  OrderedListNode,
  UnorderedListNode,
  Header1Node,
  Header2Node,
  Header3Node,
  Header4Node,
  Header5Node,
  Header6Node
}