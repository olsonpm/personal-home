DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
geanyy "\
 ${DIR}/gulp-tasks/all.js \
 ${DIR}/gulp-tasks/js.js \
 ${DIR}/gulp-tasks/scss.js \
 ${DIR}/gulp-tasks/img.js \
 ${DIR}/gulp-tasks/fonts.js \
"
geanyy "\
 ${DIR}/src/client/index.html \
"
