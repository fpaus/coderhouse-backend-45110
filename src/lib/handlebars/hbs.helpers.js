/**
 *
 * @function
 * @name hasStyle
 * @kind function
 * @returns {boolean}
 */
function hasStyle() {
  return this['style'] !== undefined;
}

export default {
  hasStyle,
};
