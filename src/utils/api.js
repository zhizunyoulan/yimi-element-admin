export function getApiSign(api) {
  if (typeof api == "function") {
    api = api();
  }
  if (!api.url) {
    throw "api格式错误，api返回值不能是Promise，必须有字段url";
  }
  api.antPattern = api.url.replaceAll("undefined", "*");
  api.method = api.method || "GET";
  return api.antPattern + "_" + api.method;
}

const apiPaths = require
  .context("@/apis", true, /\.js$/)
  .keys()
  .map((i) => {
    return i.match(/\.\/(.*)\.js/)[1];
  });

const parseModule = (root, path) => require("@/" + root + "/" + path + ".js");

let apiMap = {};
apiPaths.forEach((apiPath) => {
  let apiDir,
    index = apiPath.lastIndexOf("/");
  if (index != -1) {
    apiDir = apiPath.substring(0, index);
  } else {
    apiDir = "";
  }
  const pageModule = parseModule("apis", apiPath);
  Object.keys(pageModule).forEach((apiName) => {
    let api = pageModule[apiName];
    // console.log("api", api, apiDir);
    if (typeof api == "function" || typeof api == "object") {
      try {
        let apiSign = getApiSign(api);
        if(apiMap[apiSign]) {
          console.error('api扫描被覆盖，存在重复api', apiSign);
        }
        apiMap[apiSign] = apiDir;
      } catch (error) {
        console.error(error, apiPath, apiName);
      }
    }
  });
});

//微服务环境，接口在网关背后时，开启此方法，关闭下面的方法
// export function convertApi(api) {
//   let apiDir = apiMap[getApiSign(api)];
//   if (typeof api == "object") {
//     let _api = { ...api };
//     _api.url = "/" + apiDir + _api.url;
//     return _api;
//   } else if (typeof api == "function") {
//     return function (...args) {
//       let _api = api.apply(null, args)
//       _api.url = "/" + apiDir + _api.url;
//       return _api;
//     };
//   }
// }

//单体应用，直接访问服务的api时，使用此方法，关闭上面的方法
export function convertApi(api) {
  return api
}


export function convertApis(apis) {
  let _apis = {}
  Object.keys(apis).forEach(apiName => {
    _apis[apiName] = convertApi(apis[apiName])
  })
  return _apis
}
