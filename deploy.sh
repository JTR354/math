
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build:github

# 进入生成的文件夹
cd build

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:JTR354/math.git master:gh-pages
git push -f git@gitee.com:jtr354/math.git master:gh-pages

cd -