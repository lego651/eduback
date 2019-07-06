import React from 'react'
import FileUpload from './react-fileupload.jsx'

// 通用分页组件
class FileUploader extends React.Component {
    render() {
      const options = {
        baseUrl         : '/manage/product/upload.do',
        fileFieldName   : 'upload_file',
        dataType        : 'json',
        chooseAndUpload : true,
        uploadSuccess   : (res) => {
          this.props.onSuccess(res.data)
        },
        uploadError     : (err) => {
          this.props.onError(err.message || '上传图片失败')
        }
      }

      return (
        <FileUpload options={options}>
          <button className="btn btn-primary" ref="chooseAndUpload"> chooose </button>
        </FileUpload>
      )
    }
}

export default FileUploader
