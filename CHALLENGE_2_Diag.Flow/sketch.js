let punti = [];
let dens = 50;
let molt = 0.02;
let alphaVal = 8;
let colR = 200, colG = 150, colB = 100;

let densSlider, moltSlider, alphaSlider, rSlider, gSlider, bSlider;

function setup() {
  createCanvas(600, 800);
  pixelDensity(4);
  angleMode(DEGREES);
  noiseDetail(8);


  //select=query selector/getelementby per p5!!! 
  densSlider = select('#dens-slider');
  moltSlider = select('#molt-slider');
  alphaSlider = select('#alpha-slider');
  rSlider = select('#r-slider');
  gSlider = select('#g-slider');
  bSlider = select('#b-slider');

  generaPunti(); 
  background(0);
}

function draw() {
  dens = densSlider.value();
  molt = moltSlider.value();
  alphaVal = alphaSlider.value();
  colR = rSlider.value();
  colG = gSlider.value();
  colB = bSlider.value();

  noStroke();

  for (let i = 0; i < punti.length; i++) {
    let r = map(punti[i].x, 0, width, colR/2, colR);
    let g = map(punti[i].y, 0, height, colG/2, colG);
    let b = map(punti[i].x, 0, width, colB/2, colB);

    fill(r, g, b, alphaVal);

    let angle = map(noise(punti[i].x * molt, punti[i].y * molt), 0, 1, 0, random(180, 360));

    punti[i].add(createVector(cos(angle), sin(angle)));
    ellipse(punti[i].x, punti[i].y, 1);
  }
}

// Rigenera i punti se cambia densità
densSlider.input(() => generaPunti());

function generaPunti() {
  punti = [];
  for (let x = 0; x <= width; x += width / dens) {
    for (let y = 0; y <= height; y += width / dens) {
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      punti.push(p);
    }
  }
}
