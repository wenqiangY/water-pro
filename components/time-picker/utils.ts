import moment from 'moment';

type Value = moment.Moment | undefined | null;
type Format = string | string[] | undefined | ((val?: Value) => string | string[] | undefined);
export function formatDate(value: Value, format: Format) {
  if (!value) {
    return '';
  }
  if (Array.isArray(format)) {
    format = format[0];
  }
  if (typeof format === 'function') {
    return format(value);
  }
  return value.format(format);
}

export function generateShowHourMinuteSecond(format: string) {
  // Ref: http://momentjs.com/docs/#/parsing/string-format/
  return {
    showHour: format.includes('H') || format.includes('h') || format.includes('k'),
    showMinute: format.includes('m'),
    showSecond: format.includes('s'),
  };
}
