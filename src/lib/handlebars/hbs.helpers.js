/**
 * @export
 * @return {Boolean}
 */
function hasStyle(property) {
  return this['style'] !== undefined;
}

export default {
  hasStyle,
};
