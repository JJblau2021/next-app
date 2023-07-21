# git

`git reset HEAD` ：清空暂存区回退到工作区

`git reset .`：清空暂存区回退到工作区

`git checkout .`：清空工作区文件改动

`git checkout HEAD .`: 清空工作区以及暂存区文件改动

`git clean -df`: 清空工作区新建的文件以及文件夹

`git clean -f`:清空工作区新增的文件

`git clean -n`：显示即将删除的文件或文件夹

`git clean -xdf`：删除新增的文件和文件夹以及被 .gitignore 过滤的问价和文件夹

`git cherry-pick <commitHash>` : 在当前分支合并指定提交

## 相关文献

[git cherry-pick 教程](https://baijiahao.baidu.com/s?id=1757715688212769266&wfr=spider&for=pc)

[Git Worktree 高级使用](https://zhuanlan.zhihu.com/p/437874926)