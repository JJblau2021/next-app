# Vite Tips

## FAQ

1. 包引入报错

```powershell
server error: Failed to resolve entry for package "vue-pro-cpns". The package may have incorrect main/module/exports specified in its package.json.
```

- 开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。[详见原文](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2Fguide%2Fdep-pre-bundling.html%23dependency-pre-bundling)
    
    ```jsx
    export default defineConfig({
      optimizeDeps: {
        include: ['pica', 'tinycolor2'],
      },
    });
    ```