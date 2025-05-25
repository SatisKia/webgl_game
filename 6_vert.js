var vsSourceSprite = `
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelMatrix;
  uniform mat4 uViewProjMatrix;

  varying vec3 vPosition;
  varying highp vec2 vTextureCoord;

  void main(void) {
    vPosition = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
    gl_Position = uViewProjMatrix * vec4(vPosition, 1.0);

    vTextureCoord = aTextureCoord;
  }
`;
