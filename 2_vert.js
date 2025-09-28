var vsSourceColor = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec4 aVertexColor;

  uniform mat4 uModelMatrix;
  uniform mat4 uViewProjMatrix;
  uniform mat4 uNormalMatrix;

  varying lowp vec4 vColor;
  varying highp vec3 vNormal;

  void main(void) {
    highp vec3 position = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
    gl_Position = uViewProjMatrix * vec4(position, 1.0);

    vColor = aVertexColor;

    vNormal = vec3(uNormalMatrix * vec4(aVertexNormal, 0.0));
  }
`;
