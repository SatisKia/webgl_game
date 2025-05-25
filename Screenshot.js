var screenshotFlag = false;

function myImageFromImageData(imageData/*ImageData*/, func) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  context.putImageData(imageData, 0, 0);

  var image = new Image();
  image.onload = function() {
    func(image);
  };
  image.src = canvas.toDataURL();
}

var saveElement = null;
function mySaveCanvas(canvas) {
  if (saveElement == null) {
    var data = canvas.toDataURL("image/png").replace("image/png", "application/octet-stream");
    if (screenshotSimple) {
      window.open(data, "save");
    } else {
      var now = new Date();
      var month   = now.getMonth() + 1;
      var date    = now.getDate();
      var hours   = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      var strMonth   = ((month   < 10) ? "0" : "") + month;
      var strDate    = ((date    < 10) ? "0" : "") + date;
      var strHours   = ((hours   < 10) ? "0" : "") + hours;
      var strMinutes = ((minutes < 10) ? "0" : "") + minutes;
      var strSeconds = ((seconds < 10) ? "0" : "") + seconds;

      saveElement = document.createElement("a");
      saveElement.href = data;
      saveElement.download = "webgl_game-" + now.getFullYear() + strMonth + strDate + "-" + strHours + strMinutes + strSeconds + ".png";
      document.body.appendChild(saveElement);
      saveElement.click();
      document.body.removeChild(saveElement);
      saveElement = null;
    }
  }
}

function myScreenshot(width, height, id, id2D) {
  if (width == undefined) {
    screenshotFlag = true;
    return;
  }

  // 3D用canvas
  var canvas3d = document.getElementById(id);
  var gl = canvas3d.getContext("webgl");

  // 3D用canvasからピクセルデータを取得
  var pixels = new Uint8Array(canvas3d.width * canvas3d.height * 4);
  gl.flush();
  gl.readPixels(0, 0, canvas3d.width, canvas3d.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  // ImageDataを構築
  var image3d = new ImageData(canvas3d.width, canvas3d.height);
  for (var y = 0; y < canvas3d.height; y++) {
    var dy = y * canvas3d.width * 4;
    var sy = (canvas3d.height - 1 - y) * canvas3d.width * 4;
    for (var x = 0; x < canvas3d.width * 4; x++) {
      image3d.data[dy + x] = pixels[sy + x];
    }
  }

  var canvas2d;
  var context2d;
  var image2d;
  if (id2D != undefined) {
    // 2D用canvas
    canvas2d = document.getElementById(id2D);
    context2d = canvas2d.getContext("2d");

    // 2D用canvasからImageDataを取得
    image2d = context2d.getImageData(0, 0, canvas2d.width, canvas2d.height);
  }

  // SS画像用canvasを構築
  var ss = document.createElement("canvas");
  var context = ss.getContext("2d");
  ss.width = width;
  ss.height = height;

  myImageFromImageData(image3d, function(image) {
    // SS画像用canvasにImageを描画
    context.drawImage(image, 0, 0, canvas3d.width, canvas3d.height, 0, 0, ss.width, ss.height);

    if (id2D == undefined) {
      // ファイルに保存する
      mySaveCanvas(ss);
    } else {
      myImageFromImageData(image2d, function(image) {
        // SS画像用canvasにImageを描画
        context.drawImage(image, 0, 0, canvas2d.width, canvas2d.height, 0, 0, ss.width, ss.height);

        // ファイルに保存する
        mySaveCanvas(ss);
      });
    }
  });
}

function myScreenshot3D() {
  if (screenshotFlag) {
    screenshotFlag = false;
    myScreenshot(640, 480, "hoge_canvas");
  }
}
function myScreenshot2D() {
  if (screenshotFlag) {
    screenshotFlag = false;
    myScreenshot(640, 480, "hoge_canvas", "fuga_canvas");
  }
}
