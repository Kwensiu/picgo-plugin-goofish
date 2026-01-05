# picgo-plugin-goofish

PicGo 闲鱼图床插件，基于 [Tavre/goofish_img](https://github.com/Tavre/goofish_img) 提供的API实现。

## 功能特点

- 支持上传图片到闲鱼图床
- 支持多种图片格式（JPG、PNG、GIF、WebP）
- 简单易用，只需配置 cookie2 即可

## 安装

### 通过 PicGo 安装

1. 打开 PicGo
2. 点击「插件设置」 -> 「搜索插件」
3. 搜索 `picgo-plugin-goofish`
4. 点击安装

### 手动安装

```bash
npm install picgo-plugin-goofish --save
```

## 配置

### 获取 cookie2

1. 访问 [闲鱼创作者平台](https://author.goofish.com/#/)
2. 登录你的闲鱼账号
3. 按 F12 打开开发者工具
4. 刷新页面，在网络选项卡中找到任意请求
5. 查看请求头中的 Cookie 字段
6. 复制 `cookie2=` 后面的值（不包含分号）

下面这张图片就是使用在Picgo通过闲鱼API添加的，如果失效了请提交issue告诉我，非常感谢！

上传时间：2026-01-05 23:13:00

<img src="https://img.alicdn.com/imgextra/i4/O1CN01UcnNyo1ZXwVUCazhz_!!2205575593205-2-fleamarket.png" alt="cookie2">

### 在 PicGo 中配置

1. 打开 PicGo
2. 点击「图床设置」 -> 「闲鱼图床」
3. 在 `cookie2` 输入框中粘贴你获取的 cookie2 值
4. 点击「确定」保存配置

## 使用

配置完成后，选择「闲鱼图床」作为上传图床，上传图片即可。

## 注意事项

- Cookie 可能会过期，如果上传失败请重新获取
- 请妥善保管你的 cookie 信息，不要泄露给他人
- 闲鱼可能会对上传频率有限制，请合理使用
- 建议在上传成功后及时保存图片地址，否则永久丢失
- 本插件仅供个人学习交流使用，请勿滥用

## 许可证

MIT
