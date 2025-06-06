var fsSourceColor = `
  precision mediump float;

  uniform mat4 uInvMatrix;

  uniform vec3 uDirectionalLightColor;
  uniform vec3 uDirectionalLightPosition;

  uniform vec3 uAmbientLightColor;

  uniform vec3 uEyeDirection;
  uniform vec3 uSpecularLightColor;

  uniform vec3 uDiffuse;
  uniform vec3 uAmbient;
  uniform vec3 uSpecular;
  uniform float uShininess;

  uniform int uFog;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;

  varying lowp vec4 vColor;
  varying highp vec3 vNormal;
  varying float vFogDepth;

  void main(void) {
    highp vec3 normal = normalize(vNormal);

    highp vec3 directionalLightPosition = normalize(uDirectionalLightPosition);
    highp float cosAngle = clamp(dot(normal, directionalLightPosition), 0.0, 1.0); // ベクトルの内積
    highp vec3 diffuse = (uDirectionalLightColor * uDiffuse) * cosAngle;

    lowp vec3 ambient = uAmbientLightColor * uAmbient;

    highp vec3 invLight = normalize(uInvMatrix * vec4(uDirectionalLightPosition, 0.0)).xyz;
    highp vec3 halfVector = normalize(invLight + uEyeDirection);
    highp float powCosAngle = pow(clamp(dot(normal, halfVector), 0.0, 1.0), uShininess); // 内積によって得られた結果をべき乗によって収束させる
    highp vec3 specular = (uSpecularLightColor * uSpecular) * powCosAngle;

    //if (bool(uFog)) {
    //  float fogAmount = smoothstep(uFogNear, uFogFar, vFogDepth);
    //  gl_FragColor = vec4(mix(vColor.rgb * (diffuse + ambient + specular), uFogColor, fogAmount), vColor.a);
    //} else {
    //  gl_FragColor = vec4(vColor.rgb * (diffuse + ambient + specular), vColor.a);
    //}
    gl_FragColor = bool(uFog) ? vec4(mix(vColor.rgb * (diffuse + ambient + specular), uFogColor, smoothstep(uFogNear, uFogFar, vFogDepth)), vColor.a) : vec4(vColor.rgb * (diffuse + ambient + specular), vColor.a);
  }
`;
