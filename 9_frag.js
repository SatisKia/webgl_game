var fsSourceShadowmap = `
  precision mediump float;

  uniform int uHighPrecision;
  uniform int uTextureFloat;

  void main(void) {
    float z = gl_FragCoord.z;
    gl_FragColor = (!bool(uHighPrecision) || bool(uTextureFloat)) ? vec4(z, 0.0, 0.0, 1.0) : vec4(
      clamp((z - 0.75) * 4.0, 0.0, 1.0),
      clamp((z - 0.5 ) * 4.0, 0.0, 1.0),
      clamp((z - 0.25) * 4.0, 0.0, 1.0),
      clamp((z - 0.0 ) * 4.0, 0.0, 1.0));
  }
`;

var fsSourceColor = `
  precision mediump float;

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

  // 影
  uniform lowp int uShadow;
  uniform lowp int uReceiveShadow;
  uniform float uTolerance;
  uniform sampler2D uSamplerShadowmap;
  uniform int uHighPrecision;
  uniform int uTextureFloat;

  varying lowp vec4 vColor;
  varying highp vec3 vNormal;
  varying float vFogDepth;

  // 影
  varying vec4 vTextureCoordShadowmap;
  varying vec4 vDepth;

  void main(void) {
    highp vec3 normal = normalize(vNormal);
    highp vec3 directionalLightPosition = normalize(uDirectionalLightPosition);

    highp float cosAngle = clamp(dot(normal, directionalLightPosition), 0.0, 1.0); // ベクトルの内積
    highp vec3 diffuse = (uDirectionalLightColor * uDiffuse) * cosAngle;

    lowp vec3 ambient = uAmbientLightColor * uAmbient;

    highp vec3 halfVector = normalize(directionalLightPosition + uEyeDirection);
    highp float powCosAngle = pow(clamp(dot(normal, halfVector), 0.0, 1.0), uShininess); // 内積によって得られた結果をべき乗によって収束させる
    highp vec3 specular = (uSpecularLightColor * uSpecular) * powCosAngle;

    vec4 color = bool(uFog) ? vec4(mix(vColor.rgb * (diffuse + ambient + specular), uFogColor, smoothstep(uFogNear, uFogFar, vFogDepth)), vColor.a) : vec4(vColor.rgb * (diffuse + ambient + specular), vColor.a);

    if (bool(uShadow)) {
      // 影
      vec4 depthColor = vec4(1.0);
      if (bool(uReceiveShadow)) {
        if (vDepth.w > 0.0) {
          vec4 lightCoord = vDepth / vDepth.w;
          lightCoord = lightCoord * 0.5 + vec4(0.5); // -1.0～1.0の値を0.0～1.0の値に変換
          // ライト直交視錘のXY（および近すぎ/遠すぎのZ）の外側ではCLAMP参照が一定値になり、画面上に長大な変な三角形状の疑似影になりやすい
          float m = 0.02;
          bool inAtlas = lightCoord.x >= m && lightCoord.x <= 1.0 - m && lightCoord.y >= m && lightCoord.y <= 1.0 - m && lightCoord.z >= m && lightCoord.z <= 1.0 - m;
          if (inAtlas) {
            vec4 shadowmapColor = texture2DProj(uSamplerShadowmap, vTextureCoordShadowmap);
            float z = (!bool(uHighPrecision) || bool(uTextureFloat)) ? shadowmapColor.r : (shadowmapColor.r + shadowmapColor.g + shadowmapColor.b + shadowmapColor.a) / 4.0;
            if (lightCoord.z > z + uTolerance) {
              depthColor = vec4(0.5, 0.5, 0.5, 1.0);
            }
          }
        }
      }

      gl_FragColor = color * depthColor;
    } else {
      gl_FragColor = color;
    }
  }
`;
