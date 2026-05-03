var vsSourceShadowmap = `
  attribute vec3 aVertexPosition;

  uniform mat4 uModelMatrix;
  uniform mat4 uLightMatrix;

  void main(void) {
    vec3 position = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
    gl_Position = uLightMatrix * vec4(position, 1.0);
  }
`;

var vsSourceShadowmapSprite = `
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelMatrix;
  uniform mat4 uLightMatrix;

  varying highp vec2 vTextureCoord;

  void main(void) {
    vec3 position = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
    gl_Position = uLightMatrix * vec4(position, 1.0);
    vTextureCoord = aTextureCoord;
  }
`;

var vsSourceColor = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec4 aVertexColor;

  uniform mat4 uModelMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uViewProjMatrix;
  uniform mat4 uNormalMatrix;

  // 影
  uniform lowp int uShadow;
  uniform mat4 uTextureMatrixShadowmap;
  uniform mat4 uLightMatrix;

  varying lowp vec4 vColor;
  varying highp vec3 vNormal;
  varying float vFogDepth;

  // 影
  varying vec4 vTextureCoordShadowmap;
  varying vec4 vDepth;

  void main(void) {
    highp vec3 position = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
    gl_Position = uViewProjMatrix * vec4(position, 1.0);

    vColor = aVertexColor;

    vNormal = vec3(uNormalMatrix * vec4(aVertexNormal, 0.0));

    vFogDepth = -(uModelViewMatrix * vec4(aVertexPosition, 1.0)).z;

    // 影
    if (bool(uShadow)) {
      vTextureCoordShadowmap = uTextureMatrixShadowmap * vec4(position, 1.0);
      vDepth = uLightMatrix * vec4(position, 1.0);
    }
  }
`;
