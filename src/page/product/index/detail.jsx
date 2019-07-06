import React from 'react';

import PageTitle from 'component/page-title/index.jsx'
import CategorySelector from './category-selector.jsx'
import MUtil from 'util/mm.js'
import Product from 'service/product-service.jsx'
import './save.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId        : 0,
      parentCategoryId  : 0,
      subImages         : [],
      price: '',
      stock: '',
      detail: '',
      status: 1, // 1表示在售
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  loadProduct() {
    // 表明此时是编辑状态
    if(this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        let images = res.subImages.split(',');
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        });
        this.setState(res);
      }, errMsg => {
        _mm.errorTips(errMsg);
      })
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId} />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <p className="form-control-static">{this.state.price}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <p className="form-control-static">{this.state.stock}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length ? this.state.subImages.map(
                  (image, index) => (
                    <div className="img-con" key={index}>
                      <img className="img" src={image.url} />
                    </div>
                  )
                ) : (<div> 暂无图片 </div>)
              }
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail
