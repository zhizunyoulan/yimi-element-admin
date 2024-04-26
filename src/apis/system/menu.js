// 查询菜单树
export const getMenuTree = {
  url: "/menu",
  method: "get",
};

export const initMenu = {
  url: "/menu",
  method: "post",
};

export const addMenu = {
  url: "/menu-item",
  method: "post",
};

export const updateMenu = {
  url: "/menu-item",
  method: "put",
};

// 删除菜单
export function removeMenu(id) {
  return {
    url: `/menu-item/${id}`,
    method: "DELETE",
  };
}

export const getMenuPageApis = {
  url: "/menu-item/api",
  method: "get",
};