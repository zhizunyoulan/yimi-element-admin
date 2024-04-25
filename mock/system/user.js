const { users, latestIds } = require("../db");
const { filterAndSortAndPage, findTargetRecursively } = require("../utils");
module.exports = [
  {
    url: "/user/page",
    type: "get",
    response: (config) => {
      const {
        realName,
        contactNumber,
        createTimeBegin,
        deptId,
        createTimeEnd,
        pageSize = 10,
        pageNum = 1,
      } = config.query;

      let { pageList, total } = filterAndSortAndPage(
        users,
        {
          sample: {
            realName: "~",
            contactNumber: "=",
            createTime: "[]",
            deptId: "=",
          },
          query: {
            realName,
            contactNumber,
            createTimeBegin,
            createTimeEnd,
            deptId,
          },
        },
        undefined,
        { pageSize, pageNum }
      );

      return {
        code: 200,
        random: "@integer(300, 5000)",
        data: {
          rows: pageList,
          total,
        },
      };
    },
  },
  {
    url: "/user/status",
    type: "put",
    response: (config) => {
      let { id, status } = config.body;
      if (id) {
        let targetUser = findTargetRecursively(
          {
            children: users,
          },
          "children",
          "id",
          id
        );
        if (targetUser) {
          targetUser.status = status;
          return {
            code: 200,
            data: "OK",
          };
        } else {
          return {
            code: 500,
            data: "找不到用户",
          };
        }
      } else {
        return {
          code: 500,
          data: "id不能为空",
        };
      }
    },
  },
  {
    url: "/user",
    type: "put",
    response: (config) => {
      let { id, realName, deptId } = config.body;

      if (id) {
        let targetUser = findTargetRecursively(
          {
            children: users,
          },
          "children",
          "id",
          id
        );
        if (targetUser) {
          targetUser.realName = realName;
          targetUser.deptId = deptId;
          return {
            code: 200,
            data: "OK",
          };
        } else {
          return {
            code: 500,
            data: "找不到用户",
          };
        }
      } else {
        return {
          code: 500,
          data: "id不能为空",
        };
      }
    },
  },
  {
    url: "/user",
    type: "post",
    response: (config) => {
      let newUser = config.body;
      if (newUser.username) {
        let existedUserIndex = users.findIndex(
          (user) => user.username == newUser.username
        );
        if (existedUserIndex == -1) {
          newUser.id = latestIds.userId
          latestIds.userId ++
          users.push(newUser);
          return {
            code: 200,
            data: "OK",
          };
        } else {
          return {
            code: 500,
            data: "用户名已经存在",
          };
        }
      } else {
        return {
          code: 500,
          data: "username不能为空",
        };
      }
    },
  },
  {
    url: "/user/*",
    type: "delete",
    response: (config) => {
      let id = config.url.split("/")[3];
      if (id) {
        let targetUserIndex = users.findIndex((user) => user.id == id);
        if (targetUserIndex != -1) {
          users.splice(targetUserIndex, 1);
          return {
            code: 200,
            data: "OK",
          };
        } else {
          return {
            code: 500,
            data: "找不到用户",
          };
        }
      } else {
        return {
          code: 500,
          data: "id不能为空",
        };
      }
    },
  },
];
