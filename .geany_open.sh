DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
c_geany_open "${DIR}/gulp-tasks"
geanyy "\
 ${DIR}/src/client/index.html \
"
