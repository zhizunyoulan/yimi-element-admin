export function iterate(array, exec, finalExec, result) {
  let item = array.pop();
  if (item) {
    exec(
      item,
      (_result) => {
        iterate(array, exec, finalExec, _result);
      },
      result
    );
  } else if (finalExec) {
    finalExec(result);
  }
}

export function iterateRecursively(array, callback, childrenProp = "children") {
  array.forEach((item) => {
    callback(item);
    let children = item[childrenProp];
    if (Array.isArray(children)) {
      iterateRecursively(children, callback, childrenProp);
    }
  });
}

export function findTargetRecursively(item, childrenProp, propKey, propVal) {
  if (item[propKey] == propVal) {
    return item;
  } else {
    if (Array.isArray(item[childrenProp])) {
      return item[childrenProp].reduce((target, current) => {
        if (target) {
          return target;
        } else {
          let _target = findTargetRecursively(
            current,
            childrenProp,
            propKey,
            propVal
          );
          return _target;
        }
      }, undefined);
    }
  }
}

export function mapRecursively(fun, thisValue, childrenProps = "children") {
  if (typeof childrenProps == "string") {
    childrenProps = childrenProps.split(":", 2);
  }
  return this.map((currentValue, index, arr) => {

    let resultItem = fun.apply(thisValue, [currentValue, index, arr]);
    let children = resultItem[childrenProps[0] || "children"];
    if (Array.isArray(children)) {
      resultItem[childrenProps[1] || "children"] = mapRecursively.apply(
        children,
        [fun, thisValue, childrenProps]
      );
    }
    return resultItem;
  });
}

export function filterRecursively(fun, thisValue, childrenProp = "children") {
  return this.filter((currentValue, index, arr) => {
    let filterStatus = fun.apply(thisValue, [currentValue, index, arr]);
    if (filterStatus) {
      let children = currentValue[childrenProp];
      if (Array.isArray(children)) {
        currentValue[childrenProp] = filterRecursively.apply(children, [
          fun,
          thisValue,
          childrenProp,
        ]);
      }
    }
    return filterStatus;
  });
}

export function OptionsMaker(
  valueProps,
  labelProps,
  childrenProps = "children"
) {
  this.valueProps = valueProps.split(":", 2);
  this.labelProps = labelProps.split(":", 2);
  this.childrenProps = childrenProps.split(":", 2);

  this.make = function (array, includes = []) {
    return mapRecursively.apply(array, [
      (item) => {
        let _item = {};
        includes.forEach((prop) => {
          _item[prop] = item[prop];
        });
        _item[this.valueProps[1] || "value"] =
          item[this.valueProps[0] || "value"];
        _item[this.labelProps[1] || "label"] =
          item[this.labelProps[0] || "label"];
        _item[this.childrenProps[1] || "children"] =
          item[this.childrenProps[0] || "children"];
        return _item;
      },
      this,
      this.childrenProps,
    ]);
  };
}
