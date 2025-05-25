md tmp
md out

mqo2gl -s ground.mqo    5 1 texture.txt 99999 > out\model_ground.txt
mqo2gl -s jiki.mqo      5 1 texture.txt 99999 > out\model_jiki.txt
mqo2gl -s jiki_shot.mqo 5 1 texture.txt 99999 > out\model_jiki_shot.txt
mqo2gl -s enemy01.mqo   5 1 texture.txt 99999 > out\model_enemy01.txt
mqo2gl -s enemy02.mqo   5 1 texture.txt 99999 > out\model_enemy02.txt

certutil -f -encode jet.png  tmp\texture_jet.txt
certutil -f -encode baku.png tmp\texture_baku.txt
certutil -f -encode shot.png tmp\texture_shot.txt
type tmp\texture_jet.txt  | dataurl png >  out\texture.txt
type tmp\texture_baku.txt | dataurl png >> out\texture.txt
type tmp\texture_shot.txt | dataurl png >> out\texture.txt

pause
