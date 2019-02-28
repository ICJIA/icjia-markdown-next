"use strict";

const YAML = require("js-yaml");

module.exports = function(md) {
  return meta.bind(null, md);
};

function get(state, line) {
  const pos = state.bMarks[line];
  const max = state.eMarks[line];
  return state.src.substr(pos, max - pos);
}

function meta(md, state, start, end, silent) {
  if (start !== 0 || state.blkIndent !== 0) {
    return false;
  }
  if (state.tShift[start] < 0) {
    return false;
  }
  if (!get(state, start).match(/^---$/)) {
    return false;
  }
  const data = [];
  let line = start;
  while (line < end) {
    line++;
    const str = get(state, line);
    if (str.match(/^---$/)) {
      break;
    }
    if (state.tShift[line] < 0) {
      break;
    }
    data.push(str);
  }

  // if (line >= end) {
  //   return false
  // }

  try {
    md.meta = YAML.safeLoadAll(data.join("\n\r"), { json: true }) || {};
  } catch (e) {
    /**
     * TODO: Figure out the 'block mapping' error below. For now, fail silently.
     *
     *  {name: "YAMLException", reason: "can not read a block mapping entry; a multiline key may not be an implicit key", mark: Mark, message: "can not read a block mapping entry; a multiline ke…1, column 13:↵    demographics:↵                ^", stack: "YAMLException: can not read a block mapping entry;…de_modules/markdown-it/lib/parser_block.js:79:20)"}
     *
     *
     */
    //console.log(e);
  }

  state.line = line + 1;
  return true;
}
