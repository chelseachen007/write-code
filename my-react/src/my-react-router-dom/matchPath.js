import pathToRegexp from "path-to-regexp";
// pathToRegexp()，该函数接收 3 个参数：
// path，必传参数，值可以为自定义的请求路径，如 /user/:id，也可以是正则表达式，还可以是两者组成的数组；
// keys，可选参数， 值为 数组， 数组元素为 解析 正则表达式风格的字符串或冒号开头的占位符（下文简称为“特殊字符串”） 生成的令牌 ，
// 比如字符串 /user/:id 对应的 keys 为 { name: 'id', delimiter: '/', optional: false, repeat: false } ，这个参数的值最终会被保存到返回的正则表达式对象的 keys 属性中，可用于后面的路由生成；
// options，可选参数，执行过程中的配置信息，比如是否大小写敏感。

// 函数返回值是一个带有 keys 属性的正则表达式，keys 属性值类型和 keys 参数相同，也是一个包含特殊字符串描述信息的数组。


const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
}

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname, options = {}) {
  if (typeof options === "string" || Array.isArray(options)) {
    options = { path: options };
  }

  const { path, exact = false, strict = false, sensitive = false } = options;

  const paths = [].concat(path);

  return paths.reduce((matched, path) => {
    if (!path && path !== "") return null;
    if (matched) return matched;

    const { regexp, keys } = compilePath(path, {
      end: exact,
      strict,
      sensitive,
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path, // the path used to match
      url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {}),
    };
  }, null);
}

export default matchPath;
