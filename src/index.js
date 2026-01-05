const fs = require('fs')
const path = require('path')

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.uploader.register('goofish', {
      handle,
      name: '闲鱼图床',
      config: config
    })
  }

  const postOptions = (cookie2, image, fileName) => {
    return {
      method: 'POST',
      url: 'https://stream-upload.goofish.com/api/upload.api?_input_charset=utf-8&appkey=fleamarket',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Origin': 'https://author.goofish.com',
        'Referer': 'https://author.goofish.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        'Cookie': `cookie2=${cookie2}`
      },
      formData: {
        file: {
          value: image,
          options: {
            filename: fileName,
            contentType: null
          }
        }
      }
    }
  }

  const handle = async (ctx) => {
    let userConfig = ctx.getConfig('picBed.goofish')
    if (!userConfig || !userConfig.cookie2) {
      ctx.emit('notification', {
        title: '配置错误',
        body: '请先配置 cookie2，配置说明请查看 README.md'
      })
      return ctx
    }

    try {
      const imgList = ctx.output
      for (let i in imgList) {
        let image = imgList[i].buffer
        if (!image && imgList[i].base64Image) {
          image = Buffer.from(imgList[i].base64Image, 'base64')
        }

        if (!image) {
          ctx.emit('notification', {
            title: '上传失败',
            body: '未找到图片数据'
          })
          continue
        }

        const fileName = imgList[i].fileName || `image_${Date.now()}.jpg`
        const filePath = path.join(__dirname, fileName)
        
        fs.writeFileSync(filePath, image)
        
        try {
          const postConfig = postOptions(userConfig.cookie2, fs.createReadStream(filePath), fileName)
          let body = await ctx.Request.request(postConfig)
          
          const res = JSON.parse(body)
          
          if (res && res.success === true && res.object && res.object.url) {
            delete imgList[i].base64Image
            delete imgList[i].buffer
            imgList[i]['imgUrl'] = res.object.url
          } else {
            ctx.emit('notification', {
              title: '上传失败',
              body: res.message || '服务器返回错误'
            })
          }
        } finally {
          fs.unlink(filePath, (err) => {
            if (err) console.error('删除临时文件失败:', err)
          })
        }
      }
    } catch (e) {
      ctx.emit('notification', {
        title: '上传失败',
        body: e.message
      })
      throw new Error(e.message)
    }
    return ctx
  }

  const config = ctx => {
    let userConfig = ctx.getConfig('picBed.goofish')
    if (!userConfig) {
      userConfig = {}
    }
    return [
      {
        name: 'cookie2',
        type: 'input',
        default: userConfig.cookie2,
        alias: 'cookie2',
        required: true
      }
    ]
  }

  return {
    uploader: 'goofish',
    register
  }
}
