const NODE_TYPE_MAP = new Map([
  ['root', 'PostCSSRoot'],
  ['decl', 'PostCSSDeclaration'],
  ['atrule', 'PostCSSAtRule'],
  ['rule', 'PostCSSRule'],
  ['comment', 'PostCSSComment'],
  ['warning', 'PostCSSWarning'],
]);

const jsonNodeToBabel = (node) => {
  const babelNode = {};
  for (let key in node) {
    let value = node[key];
    // TODO: What to do with the source and raws?
    // Are they part of AST or Source Map?
    if (key === 'source' || key === 'raws') {
      continue;
    }
    if (key === 'type') {
      babelNode[key] = NODE_TYPE_MAP.get(value);
      continue;
    }

    if (Array.isArray(value)) {
      babelNode[key] = value.map((child_node) => nodeToBabel(child_node));
    } else if (typeof value === 'object') {
      babelNode[key] = nodeToBabel(value);
    } else {
      babelNode[key] = value;
    }
  }
  return babelNode;
};

export default {
  toBabel(ast) { return nodeToBabel(ast.toJSON()); },
  fromBabel(ast) {}
};
