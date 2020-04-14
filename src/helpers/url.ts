import { isDate, isPlainObject } from "./util";

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url;
  }
  let parts: string[] = [];
  Object.keys(params).forEach(key => {
    let val: any = params[key];
    if (val === null || val === undefined) {
      return;
    }
    let values: string[];
    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString();
      }
      if (isPlainObject(val)) {
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams: string = parts.join('&');
  if (serializedParams) {
    const markIndex: number = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}