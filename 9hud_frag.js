// HUD用：完全透明ピクセルは描画しない
var fsSourceSpriteHud = `
  precision mediump float;

  uniform sampler2D uSampler;

  varying vec3 vPosition;
  varying highp vec2 vTextureCoord;

  void main(void) {
    vec4 color = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    if (color.a <= 0.0) { // 完全透明だけを捨てる
      discard;
    }
    gl_FragColor = color;
  }
`;
