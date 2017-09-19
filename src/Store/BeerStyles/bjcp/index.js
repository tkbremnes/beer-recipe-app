import _ from 'underscore';
const bjcp = require('./bjcp.json')

export default {
  bjcp: {
    getAll() {
      const res = [];
      _.each(bjcp, (styleCategory) => {
        _.each(styleCategory.subcategories, (style, key) => {
          res.push({
            id: key,
            name: style.name,
            stats: style.stats
          });
        });
      });

      return res;
    }
  },
  getStyle: (styleString) => {
    if (!styleString) {
      return;
    }

    if (styleString === "undefined") {
      return;
    }

    // const styleRepo = styleString.split(':')[0];
    const style = styleString.split(':')[1];

    const main = /\d*/.exec(style)[0];
    // const sub = /[a-Z]/.exec(style)[0];

    return bjcp[main].subcategories[style.toUpperCase()];
  }
}
