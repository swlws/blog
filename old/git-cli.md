Git 规范：

```
<type>(<scope>): <subject>
```

```
feat：新功能（feature）。
fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。
	fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
	to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix
docs：文档（documentation）。
style：格式（不影响代码运行的变动）。
refactor：重构（即不是新增功能，也不是修改bug的代码变动）。
perf：优化相关，比如提升性能、体验。
test：增加测试。
chore：构建过程或辅助工具的变动。
revert：回滚到上一个版本。
merge：代码合并。
sync：同步主线或分支的Bug。
```

Git 命令：

```
git add
git commit
git push
git log // 查看提交历史
git reflog // 查看命令历史
git reset --hard <commit id> // 版本回退
git reset HEAD <file> // 从暂缓区撤销
git checkout -- <file> // 丢弃工作区的修改

git checkout -b <branch>	// 创建并切换分支
git checkout  <branch>	// 切换分支
git branch <branch> 		// 新建本地分支
git branch -d <branch>	// 删除本地分支
git push origin --delete <branch> // 删除远程分支
git branch -dr <branch> // 删除本地和远程分支
git merge <branch>			// 合并到当前分支
git cherry-pick <commit id>	// 将某次提交复制到分支上
git branch --set-upstream-to=<romote>/<branch> localBranchName // 创建本地分支与远程分支的关联
git branch --unset-upstream // 撤销关联
git branch -vv // 查看本地分支与远程分支关联

git stash	// 保留现场
git stash list // 查看现场列表
git stash pop // 恢复现场，并删除stash内容

git tag <tagName> <commit id> // 轻量标签。为某次提交生成Tag，某次为最新一次提交。
git tag -a <tagName> -m <msg> <comiit id> // 附注标签。带有描述信息的tag
git show <tagName>		// 查看标签信息
git push origin <tagName> // 推送为远程标签
git push origin --tags // 推送本地所有的标签
git tag -d <tagName> // 删除本地Tag
git push origin --delete tag <tagName> // 删除远程Tag

git check-ignore -v <fileName> // 检查文件对应的规则
```

Unix 的哲学：没有消息就是好消息。
