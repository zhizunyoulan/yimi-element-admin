
module.exports = [
    {
      url: '/demo/sayhello',
      type: 'post',
      response: () => {
        return {
          code: 200,
          data: 'ok'
        }
      }
    },
    {
      url: '/demo/test-score',
      type: 'post',
      response: () => {
        return {
          code: 200,
          random: '@integer(300, 5000)',
          data: {
            rows: [
              {
                id: 1,
                name: "blue",
                age: 20,
                sex: 1,
                // hasChildren: true,
                children: [
                  {
                    id: 3,
                    name: "yimi",
                    age: 3,
                    sex: 0,
                    yuwen: 100,
                    shuxue: 100,
                  },
                ],
                yuwen: 60,
                shuxue: 80,
              },
              {
                id: 2,
                name: "red",
                age: 18,
                sex: 0,
                yuwen: 85,
                shuxue: 80,
              },
            ],
          }
        }
      }
    }
]