import t from 'babel-types';
import defineType, * as def from 'babel-types/lib/definitions/index';

defineType('PostCSSRoot', {
  builder: ['nodes'],
  fields: {
    nodes: {
      validate: def.chain(
        def.assertValueType('array'),
        def.assertEach(def.assertNodeType('PostCSSRule', 'PostCSSAtRule'))
      ),
      default: []
    }
  },
  visitor: ['nodes'],
});

defineType('PostCSSRule', {
  builder: ['selectors', 'nodes'],
  fields: {
    selectors: {
      validate: def.chain(
        def.assertValueType('array'),
        def.assertEach(def.assertValueType('string'))
      ),
      default: []
    },
    nodes: {
      validate: def.chain(
        def.assertValueType('array'),
        def.assertEach(def.assertNodeType('PostCSSRule', 'PostCSSAtRule', 'PostCSSDeclaration'))
      ),
      default: []
    },
  },
  visitor: ['selectors', 'nodes']
});

defineType('PostCSSAtRule', {
  builder: ['name', 'params', 'nodes'],
  fields: {
    name: { validate: def.assertValueType('string') },
    params: {
      validate: def.chain(
        def.assertValueType('array'),
        def.assertEach(def.assertValueType('string'))
      ),
      default: []
    },
    nodes: {
      validate: def.chain(
        def.assertValueType('array'),
        def.assertEach(def.assertNodeType('PostCSSRule', 'PostCSSAtRule', 'PostCSSDeclaration'))
      ),
      default: []
    },
  },
  visitor: ['name', 'params', 'nodes']
});

defineType('PostCSSDeclaration', {
  builder: ['prop', 'value'],
  fields: {
    prop: {
      validate: def.assertValueType('string'),
    },
    value: {
      validate: def.assertValueType('string'),
    }
  },
  visitor: ['prop', 'value']
});

export default t;
