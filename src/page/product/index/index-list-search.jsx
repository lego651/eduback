import React from 'react';

class ListSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: 'productId', // productId or productName,
      searchKeyword: ''
    }
  }
  // 数据变化的时候
  onValueChange(e) {
    let name = e.target.name
    let value = e.target.value.trim()
    this.setState({
      [name] : value
    })
  }
  // 点击搜索按钮的时候
  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword)
  }
  // 如果是回车也搜索
  onSearchKeywordKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSearch()
    }
  }
  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control"
                      name="searchType"
                      onChange={(e)=>{this.onValueChange(e)}}>
                <option value="productId">按商品ID查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     placeholder="输入关键词"
                     onKeyUp = {(e)=>{this.onSearchKeywordKeyUp(e)}}
                     name="searchKeyword"
                     onChange={(e)=>{this.onValueChange(e)}}/>
            </div>
            <button className="btn btn-primary"
                    onClick={(e)=>{this.onSearch()}}>
              Search
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListSearch
