/**
 * Strip script tags
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function stripScript(str: string): string {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export {
  stripScript
};
