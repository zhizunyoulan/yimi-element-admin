export function convertRoutesToMenu(routes) {
  function convert(route) {
    let fullPath = route.path;
    if (this.path) {
      fullPath = this.path + "/" + route.path;
    }
    fullPath = fullPath.replaceAll("//", "/");
    let component = route.component;

    // console.log("route item", fullPath, route, component);
    let menuItem = {
      path: route.path,
      pagePath: component.pageInfo?.path,
      url: fullPath,
      name: route.name,
      permission: component.pageInfo?.permission,
      meta: route.meta,
      title: route.meta?.title,
      icon: route.meta?.icon,
    };

    if (route.children) {
      menuItem.type = "Directory";
      menuItem.children = route.children.map(convert, route);
    } else {
      menuItem.type = "Page";
    }
    return menuItem;
  }

  let menu = routes
    .filter((route) => route.component.name == "VeaLayout")
    .map(convert, {});

  //父节点为'/'的菜单项，都移到第一级
  let rootMenuItemIndexs = menu.reduce((array, menuItem, index) => {
    if (menuItem.path == "/") {
      array.push(index);
    }
    return array;
  }, []);

  rootMenuItemIndexs.forEach((index) => {
    let rootMenuItem = menu.at(index);
    if (rootMenuItem && rootMenuItem.children) {
      let args = [index, 1].concat(rootMenuItem.children);
      [].splice.apply(menu, args);
    }
  });

  return menu;
}
