import { iterateRecursively } from '@/utils/recursive'

export function convertRoutesToMenu(routes) {
  function convert(route) {
    let fullPath = route.path;
    if (this.url) {
      fullPath = this.url + "/" + route.path;
    }
    fullPath = fullPath.replaceAll("//", "/");
    let component = route.component;

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
      menuItem.children = route.children.map(convert, menuItem);
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


export function convertMenuToRoutes(menu) {
  function convert(menuItem) {
    let route = {
      path: menuItem.path,
      url: menuItem.url,
      name: menuItem.name,
      permission: menuItem.permission,
      component: () => import('@/views/' + menuItem.pagePath),
      meta: {
        title: menuItem.title,
        icon: menuItem.icon,
      },
    };

    if (menuItem.type == "Directory") {
      if (menuItem.parentId) {
        route.component = () => import('@/components/DirectNestRoute')
      } else {
        route.component = () => import('@/layouts/vue-element-admin')
      }
      route.children = menuItem.children.map(convert, menuItem);
    } else {
      if (menuItem.type == "Page") {
        route.component = () => import('@/views/' + menuItem.pagePath)
      }
    }
    return route;
  }

  let routes = menu
    .map(convert, {});
  return routes;
}

//route的component异步获取函数，转化成具体的组件
export function syncRoutesComponent(...routes) {
  for (let i = 0; i < routes.length; i++) {
    iterateRecursively(routes[i], (route) => {
      if (typeof route.component == 'function') {
        route.component().then(_component => {
          route.component = _component.default
        })
      }
    })
  }
}