// import request from '@/utils/request'
// import { OptionsMaker } from "@/utils/recursive";

export const getDepartmentTree = {
  url: "/department/tree",
  method: "get",
};

export const addDepartment = {
  url: "/department",
  method: "post",
};

export const updateDepartment = {
  url: "/department",
  method: "put",
};


// export function getDeptOptionTree(query) {
//   return new Promise((resolve, reject) => {
//     request({
//       url: '/department/tree',
//       method: 'get',
//       params: query
//     }).then(res => {
//       let depts = new OptionsMaker('id', 'name').make(res?.data?.rows, { r: true })
//       resolve(depts)
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }

