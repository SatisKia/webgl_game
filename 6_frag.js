var fsSourceSprite = `
  precision mediump float;

  uniform sampler2D uSampler;

  varying vec3 vPosition;
  varying highp vec2 vTextureCoord;

  void main(void) {
    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  }
`;
