# 白屏问题修复说明

## 问题原因

部署后出现白屏的主要原因是路由配置问题：

1. **路由类型错误**：使用了 `createBrowserRouter`，这需要服务器配置支持 SPA 路由
2. **静态文件服务器限制**：大多数静态文件服务器（如 GitHub Pages、Netlify 等）默认不支持 HTML5 History API

## 解决方案

将路由从 `createBrowserRouter` 改为 `createHashRouter`：

### 修改前
```typescript
import { createBrowserRouter } from 'react-router-dom';
export const router = createBrowserRouter([...]);
```

### 修改后
```typescript
import { createHashRouter } from 'react-router-dom';
export const router = createHashRouter([...]);
```

## HashRouter 的优势

1. **无需服务器配置**：使用 URL 的 hash 部分（`#`）进行路由
2. **兼容所有静态文件服务器**：GitHub Pages、Netlify、Vercel 等
3. **简单可靠**：不依赖服务器的路由重写规则

## URL 格式变化

### BrowserRouter（修改前）
```
https://example.com/collections/men
https://example.com/products/oxford-shirt
```

### HashRouter（修改后）
```
https://example.com/#/collections/men
https://example.com/#/products/oxford-shirt
```

## 其他修复

1. **简化 index.html**：移除了复杂的主题初始化脚本，避免干扰 React 渲染
2. **添加错误处理**：在 `main.tsx` 中添加了错误捕获和显示
3. **添加调试日志**：便于排查问题

## 验证步骤

1. 构建项目：`npm run build`
2. 部署 `dist` 文件夹到静态文件服务器
3. 访问网站，应该能看到完整的 House of Wear 电商网站

## 如果仍然出现白屏

1. **检查浏览器控制台**：打开开发者工具（F12），查看 Console 标签页的错误信息
2. **检查网络请求**：查看 Network 标签页，确认 JS 和 CSS 文件是否正确加载
3. **检查路径配置**：如果部署在子目录，需要在 `vite.config.js` 中配置 `base` 选项

## 部署到子目录（可选）

如果网站部署在子目录（如 `https://example.com/shop/`），需要修改 `vite.config.js`：

```javascript
export default defineConfig({
  base: '/shop/', // 添加这一行
  plugins: [react(), tailwindcss()],
  // ... 其他配置
});
```

然后重新构建：`npm run build`

## 技术细节

### 为什么 HashRouter 能解决问题？

1. **URL 结构**：HashRouter 使用 `#` 后面的部分作为路由
   - 例如：`example.com/#/about`
   - 服务器只会看到 `example.com/`，忽略 `#` 后面的部分

2. **服务器配置**：不需要服务器将所有请求重定向到 `index.html`
   - BrowserRouter 需要服务器配置，将所有路由指向 `index.html`
   - HashRouter 不需要，因为所有路由都在客户端处理

3. **兼容性**：所有浏览器和服务器都支持 URL hash
   - 这是最古老的客户端路由方式
   - 兼容性最好

## 总结

通过将路由从 `BrowserRouter` 改为 `HashRouter`，解决了静态文件服务器部署时的白屏问题。这是部署 React SPA 到静态托管服务的标准做法。
