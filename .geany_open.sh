DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
c_geany_open "${DIR}/gulp-tasks"
geanyy "\
 ${DIR}/src/client/index.html \
 ${DIR}/src/client/app/components/static/about.html \
 ${DIR}/src/client/app/components/static/home.html \
 ${DIR}/src/client/app/components/static/linux-thangs.html \
 ${DIR}/src/client/app/components/static/misc-music-tool.html \
 ${DIR}/src/client/app/components/static/my-node-tools.html \
 ${DIR}/src/client/app/components/static/my-stack.html \
 ${DIR}/src/client/app/components/static/twitter-api-tester.html \
"
