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




export function findTargetRecursively(item, childrenKey, propKey, propVal) {
    if (item[propKey] == propVal) {
      return item;
    } else {
      if (Array.isArray(item[childrenKey])) {
        return item[childrenKey].reduce((target, current) => {
          if (target) {
            return target;
          } else {
            let _target = findTargetRecursively(
              current,
              childrenKey,
              propKey,
              propVal
            );
            return _target;
          }
        }, undefined);
      }
    }
  }

  export function mapRecursively(item, childrenKey, propKey, propVal) {
    if (item[propKey] == propVal) {
      return item;
    } else {
      if (Array.isArray(item[childrenKey])) {
        return item[childrenKey].reduce((target, current) => {
          if (target) {
            return target;
          } else {
            let _target = findTargetRecursively(
              current,
              childrenKey,
              propKey,
              propVal
            );
            return _target;
          }
        }, undefined);
      }
    }
  }


  export function OptionsMaker(value, label) {
    this.value = value;
    this.label = label;
    
    this.make = function(array, {r} = {}){
        function mapRecursively(item) {
            if(r && Array.isArray(item.children)) {
                return {
                    id: item.id,
                    name: item.name,
                    children: item.children.map(mapRecursively)
                }
            }else {
                return {
                    id: item.id,
                    name: item.name
                }
            }
        }

        return array?.map(mapRecursively)
    }
}