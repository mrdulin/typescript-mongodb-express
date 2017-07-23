/**
 * Format date helper
 *
 * @param {Date} date
 * @return {String}
 * @api private
 */

function formatDate(date: string): string {
  const dateFormatted: Date = new Date(date);
  const monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[dateFormatted.getMonth()] + ' ' + dateFormatted.getDate() + ', ' + dateFormatted.getFullYear();
}

/**
 * Format date time helper
 *
 * @param {Date} date
 * @return {String}
 * @api private
 */

function formatDatetime(date: string): string {
  const dateFormatted: Date = new Date(date);
  const hour: number = dateFormatted.getHours();
  const minutes: string | number = dateFormatted.getMinutes() < 10
    ? '0' + dateFormatted.getMinutes().toString()
    : dateFormatted.getMinutes();

  return formatDate(date) + ' ' + hour + ':' + minutes;
}

export {
  formatDate,
  formatDatetime
};
