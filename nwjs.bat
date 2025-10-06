md build
md build\tmp
md build\tmp\mp3
copy 8.html             build\tmp
copy _Gamepad.js        build\tmp
copy Fps.js             build\tmp
copy Screenshot.js      build\tmp
copy d2js.js            build\tmp
copy d2js_gl.js         build\tmp
copy 4_vert.js          build\tmp
copy 4_frag.js          build\tmp
copy 6_vert.js          build\tmp
copy 6_frag.js          build\tmp
copy model_ground.js    build\tmp
copy model_jiki.js      build\tmp
copy model_jiki_shot.js build\tmp
copy model_enemy01.js   build\tmp
copy model_enemy02.js   build\tmp
copy texture.js         build\tmp
copy nwjs\index.js      build\tmp
copy nwjs\package.json  build\tmp
copy mp3\*.*            build\tmp\mp3

set NODE_TLS_REJECT_UNAUTHORIZED=0

cd build\tmp
call npm install --production
@echo on
cd ..
copy ..\nwjs\app.json tmp\package.json
call nwbuild --version=0.79.1 --platform=win --arch=x64 --glob=false tmp
@echo on
cd ..

pause
