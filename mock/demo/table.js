const Mock = require('mockjs')

let classes = [
  {
    id: 1,
    name: '一班'
  },
  {
    id: 2,
    name: '二班'
  },
  {
    id: 3,
    name: '三班'
  },
]


let scoreTable = {
  'scores|25': [
    {
      id: '@increment',
      name: '@cname',
      'class|1': [1, 2, 3],
      'age|1': [17, 18, 19],
      'gender|1': [0, 1],
      'score': '@integer(50, 100)'
    }
  ],
  'details|35': [
    {
      id: '@id',
      name: '@cname',
      'class|1': ['129班', '130班', '131班', '132班', '133班'],
      'gender|1': [0, 1],
      'age|1': [17, 18],
      'shuxue': '@integer(50, 100)',
      'wuli': '@integer(50, 100)',
      'huaxue': '@integer(50, 100)',
      'shengwu': '@integer(50, 100)',
      'yuwen': '@integer(50, 100)',
      'english': '@integer(50, 100)',
      'lishi': '@integer(50, 100)',
      'zhengzhi': '@integer(50, 100)'
    }
  ]
}

const { scores, details } = Mock.mock(scoreTable)

details.forEach(s => {
  s.total = ['shuxue', 'wuli', 'huaxue', 'shengwu', 'yuwen', 'english', 'lishi', 'zhengzhi'].reduce((total, score) => {
    return total + (s[score] || 0)
  }, 0)
})
const detailScores = details.sort((s1, s2) => {
  return s2.total - s1.total
})

module.exports = [
  {
    url: '/demo/scores',
    response: () => {
      return {
        code: 200,
        random: '@integer(300, 5000)',
        data: {
          rows: scores
        }
      }
    }
  },
  {
    url: '/demo/class-scores',
    response: () => {
      let _classes = classes.slice().map(_class => {

        let children = scores.filter(score => {
          return score.class == _class.id
        })
        if (children?.length > 0) {
          _class.children = children
          _class.score = children.reduce((total, child) => {
            total += (child.score || 0)
            return total
          }, 0)
        } else {
          _class.score = 0
        }

        return _class
      })
      return {
        code: 200,
        random: '@integer(300, 5000)',
        data: {
          rows: _classes
        }
      }
    }
  },
  {
    url: '/demo/score-details',
    response: () => {
      return {
        code: 200,
        random: '@integer(300, 5000)',
        data: {
          rows: detailScores,
        }
      }
    }
  }
]