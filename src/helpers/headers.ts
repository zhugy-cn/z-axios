import { isPlainObject } from "./util";


function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach(name => {
    if (name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  })
}

// post 请求时为表头设置 Content-Type
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-type'] = 'application/json; charset=utf-8';
    }
  }
  return headers;
}

// 解析响应头
export function parseResponseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toUpperCase();
    if (!key) {
      return;
    }
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  })
  return parsed;
}