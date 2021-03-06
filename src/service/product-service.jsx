import MUtil from 'util/mm.js'
const _mm = new MUtil()

class Product {
  // 获取产品列表
  getProductList(listParam) {
    let url  = '',
        data = {};

    if(listParam.listType === 'list') {
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    } else if(listParam.listType === 'search') {
      url = '/manage/product/search.do';
      data.pageNum               = listParam.pageNum;
      data[listParam.searchType] = listParam.keyword;

    }

    return _mm.request({
      type  :  'post',
      url   :  url,
      data  :  data
    })
  }
  // 获取商品详情
  getProduct(productId) {
    return _mm.request({
      type  :  'post',
      url   :  '/manage/product/detail.do',
      data  :  {
        productId: productId || 0
      }
    })
  }

  // 变更商品销售状态
  setProductStatus(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    })
  }
  // 检查保存商品的表单数据
  checkProduct(product) {
    let result = {
      status: true,
      msg: '验证通过'
    }
    // 判断商品名称为空
    if(typeof product.name !== 'string' || product.name.length === 0) {
      return {
        status: false,
        msg: '商品名称不能为空'
      }
    }
    // 判断商品描述为空
    if(typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
      return {
        status: false,
        msg: '商品描述不能为空'
      }
    }
    // 判断商品价格为数字，且大于等于0
    if(typeof product.price !== 'number' || !(product.price >= 0) ) {
      return {
        status: false,
        msg: '商品价格不能为空'
      }
    }
    // 判断商品库存为数字，且大于等于0
    if(typeof product.stock !== 'number' || !(product.stock >= 0)) {
      return {
        status: false,
        msg: '商品库存数量不能为空'
      }
    }
    // 品类ID
    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
      return {
        status: false,
        msg: '商品品类不正确'
      }
    }
    return result;
  }
  // 保存商品
  saveProduct(product) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    })
  }

  /**
   * 品类相关
  */
  getCategoryList(parentCategoryId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCategoryId || 0
      }
    })
  }
  // 加载二级分类
  loadSecondCategory() {

  }
}

export default Product
