// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

let numImages = 100,
    imageWidth = 600,
    imageHeight = 400;

// Load the images
const images = [];
for (let i = 1; i <= numImages; i++) {
  const image = new Image();
  image.src = `path/to/image${i}.jpg`;
  images.push(image);
}

// Set the canvas size
canvas.width = imageWidth;
canvas.height = imageHeight;

/*
  This example creates a basic vertex shader that passes through the position and texture coordinate attributes,
  and a fragment shader that samples the texture using the texture coordinates and outputs the resulting color.
 */
const vertexShaderSource = `
  attribute vec2 position;
  attribute vec2 texCoord;

  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    v_texCoord = texCoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D u_texture;

  varying vec2 v_texCoord;

  void main() {
    gl_FragColor = texture2D(u_texture, v_texCoord);
  }
`;

// Create a texture for the images
const texture = gl.createTexture();

// Set the texture properties
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

// Upload the first image to the texture
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[0]);

// Create a buffer for the vertex data
const vertexBuffer = gl.createBuffer();

// Set the vertex data
const vertices = [
  -1, 1,
  -1, -1,
  1, 1,
  1, -1
];
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Create the shader program
const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

// Get the location of the vertex position attribute
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

// Enable the vertex position attribute
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Get the location of the texture coordinate attribute
const textureCoordinateAttributeLocation = gl.getAttribLocation(program, 'a_textureCoordinate');

// Enable the texture coordinate attribute
gl.enableVertexAttribArray(textureCoordinateAttributeLocation);
gl.vertexAttribPointer(textureCoordinateAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Get the location of the texture sampler uniform
const samplerUniformLocation = gl.getUniformLocation(program, 'u_sampler');

// Set the sampler uniform to use texture unit 0
gl.uniform1i(samplerUniformLocation, 0);

// Set the current image index to 0
let currentImageIndex = 0;

// Render the first frame
renderFrame();

function renderFrame() {
  // Upload the current image to the texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[currentImageIndex]);

  // Clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the quad
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // Increment the current image index
  currentImageIndex = (currentImageIndex + 1) % numImages;

  // Request the next frame
  requestAnimationFrame(renderFrame);
}

function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
  // Create the vertex shader
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  // Check if the vertex shader compiled successfully
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the vertex shader:', gl.getShaderInfoLog(vertexShader));
    return null;
  }

  // Create the fragment shader
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // Check if the fragment shader compiled successfully
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the fragment shader:', gl.getShaderInfoLog(fragmentShader));
    return null;
  }

  // Create the shader program
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Check if the shader program linked successfully
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('An error occurred linking the program:', gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

/*
  In this example, we're creating a WebGL context for the canvas using getContext('webgl').
  We then load the images, set the canvas size, create a texture for the images,
  and create a buffer for the vertex data. We then create a shader program and get the locations of the vertex
  position attribute, texture coordinate attribute, and texture sampler uniform.
  We also enable the vertex position and texture coordinate attributes and set the sampler uniform to use texture unit 0.

  In the `renderFrame` function, we upload the current image to the texture, clear the canvas, draw the quad,
  and increment the current image index. We then request the next frame using requestAnimationFrame.

  The `createProgram` function creates a shader program by compiling the vertex and fragment shaders, linking them
  together, and returning the program. This function is used to create the program used to render the quad.a
 */
