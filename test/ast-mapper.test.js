import parse from '../lib/parse';
import AstMapper from '../lib/ast-mapper';

describe('AstMapper.toBabel', () => {
  it('converts ast to a tree compatible with babel-traverse', () => {
    let ast = parse(
      `a {
        color: blue;
      }
      @media(min-width: 0) {
        background: white
      }`,
      { from: 'a.css' }
    );
    console.log(AstMapper);
    expect(AstMapper.toBabel(ast)).toEqual({
      "type": "PostCSSRoot",
      "nodes": [{
        "type": "PostCSSRule",
        "nodes": [{
          "type": "PostCSSDeclaration",
          "prop": "color",
          "value": "blue"
        }],
        "selector": "a"
      }, {
        "type": "PostCSSAtRule",
        "name": "media",
        "params": "(min-width: 0)",
        "nodes": [{
          "type": "PostCSSDeclaration",
          "prop": "background",
          "value": "white"
        }]
      }]
    });
  });
});
