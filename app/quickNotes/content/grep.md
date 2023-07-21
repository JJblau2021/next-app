# grep

- -E: 延伸的正则匹配

```bash
# 批量删除含有 feat 的分支
git branch | grep -E 'feat' | xargs git branch -D
```

### 参考文献

[Linux grep 命令](https://www.runoob.com/linux/linux-comm-grep.html)