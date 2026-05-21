F:\RESUME-BUILDER>git branch
* dev-editing
  main

F:\RESUME-BUILDER>git status
On branch dev-editing
Your branch is up to date with 'origin/dev-editing'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   frontend/src/Template/FlorenceClassic/FlorenceClassic.css
        modified:   frontend/src/Template/FlorenceClassic/FlorenceClassic.jsx
        modified:   frontend/src/Template/TemplateLayout.css
        modified:   frontend/src/Template/TemplateLayout.jsx


F:\RESUME-BUILDER>git add .

F:\RESUME-BUILDER>git commit -m "Fix Florence mobile editing"
[dev-editing 6af386d] Fix Florence mobile editing
 4 files changed, 267 insertions(+), 130 deletions(-)

F:\RESUME-BUILDER>git push origin dev-editing
Enumerating objects: 19, done.
Counting objects: 100% (19/19), done.
Delta compression using up to 8 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (10/10), 2.85 KiB | 582.00 KiB/s, done.
Total 10 (delta 7), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (7/7), completed with 7 local objects.
To https://github.com/digimind1100/RESUME-BUILDER.git
   31313f7..6af386d  dev-editing -> dev-editing

F:\RESUME-BUILDER>