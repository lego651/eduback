import MUtil from 'util/mm.js'
const _mm = new MUtil()

class Statistic {
  // 首页数据统计GET
  getHomeCount() {
    return _mm.request({
      url: '/manage/statistic/base_count.do',
    })
  }
}

export default Statistic
