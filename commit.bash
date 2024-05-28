# Add changes to git.
git config --local user.email "github-actions[bot]@users.noreply.github.com"
git config --local user.name "github-actions[bot]"
git add .

# Commit changes.
git commit --allow-empty -m "数据更新 - $(date +'%Y/%m/%d %I:%M%p')"
