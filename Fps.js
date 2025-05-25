var _old_time;
var _total_time;
var _total_frame_count;
var _total_paint_count;
function myStartCalcFps() {
  _old_time = currentTimeMillis();
  _total_time = 0;
  _total_frame_count = 0;
  _total_paint_count = 0;
  resetFrameCount();
}
function myCalcFps() {
  var tmp = currentTimeMillis();
  var time = tmp - _old_time;
  _old_time = tmp;
  _total_time += time;
  _total_frame_count += frameCount();
  _total_paint_count++;
  var fps = 1000 / (_total_time / _total_frame_count); // 1秒間あたりのゲーム計算処理回数
  fps /= (_total_frame_count / _total_paint_count); // 1秒間あたりの描画処理回数
  return fps;
}
function myDrawFps(g) {
  var w = getWidth () - 1;
  var h = getHeight() - 1;
  g.setFont(16, "ＭＳ ゴシック");
  g.setColor(g.getColorOfRGB(0, 0, 0));
  var str = "" + _INT(myCalcFps()) + " fps";
  g.drawString(str, w - g.stringWidth(str), h);
  str = "" + frameCount();
  g.drawString(str, w - g.stringWidth(str), h - 20);
}
