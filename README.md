# bookmark-home

一个简洁、美观的个人书签主页，支持从 GitHub Gist 动态加载书签数据，带背景视频、多搜索引擎切换和站内搜索。
[个人专属页](bookmark.tzx.cc.cd)

## 功能特性

- 分类导航（Home / 其他自定义分类）
- 多搜索引擎切换（Google、站内搜索等）
- 站内全局搜索书签（名称 / 域名 / URL / 分类）
- 从 GitHub Gist 实时拉取书签数据（失败时降级使用本地数据）
- 响应式布局 + 背景视频
- Favicon 缓存与展示

## 数据源

书签数据托管在 [GitHub Gist](https://gist.github.com/Tengzexin0/8954a8f73d83c29ce2d87fbdd85431b0)

修改 Gist 中的 JSON 后，页面刷新即可生效（无需重新部署）

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## License

MIT
