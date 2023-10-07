// easingにp5.funcを仕様
// https://idmnyu.github.io/p5.js-func/
let ease;

let jNum = [];
let randArray = [];
let lineNum = 6;

const speed = 0.2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ease = new p5.Ease();

  for (j = 0; j < height; j += height / lineNum) {
    let valueArray = [0, 1]
    randArray.push(random(valueArray));
  }
}

function draw() {
  window.onresize = () => resizeCanvas(windowWidth, windowHeight);
  //background('rgba(0,0,0,0.0)');
  background(60);


  for (j = 0; j < height; j += height / lineNum) {
    // 一周期の波形を描画
    let divideXvalue = 10;
    let divideYvalue = 40;
    let cycleLen = width / divideXvalue;

    // easing
    const firstPlusRatio = map(frameCount % (403 / speed), 0, 100 / speed, cycleLen / 4, cycleLen / 2);
    const firstPlusLinear = ease.linear(firstPlusRatio);
    const firstMinusRatio = map(frameCount % (403 / speed), 0, 100 / speed, -cycleLen / 4, 0);
    const firstMinusLinear = ease.linear(firstMinusRatio);

    const secondPlusRatio = map(frameCount % (403 / speed), 0, 100 / speed, cycleLen / 2, cycleLen / 4);
    const secondPlusLinear = ease.linear(secondPlusRatio);
    const secondMinusRatio = map(frameCount % (403 / speed), 0, 100 / speed, 0, -cycleLen / 4);
    const secondMinusLinear = ease.linear(secondMinusRatio);

    startValue = cycleLen / 2;
    endValue = cycleLen / 4;
    strokeWeight(3);
    noFill();
    for (i = 0; i < divideXvalue; i++) {
      beginShape();

      for (let x = 0; x <= cycleLen; x += 1) {
        let y = sin(map(x, 0, cycleLen, 0, TWO_PI));
        let yPos = map(y, -1, 1, 0, height / divideYvalue);
        let xPos = x + i * cycleLen;
        stroke(0);
        vertex(xPos, yPos + j + height / lineNum / 5 + height / lineNum / 4);
      }
      endShape();
    }

    if (randArray[j / height * lineNum] == 0) {
      for (i = -1; i < divideXvalue + 1; i++) {
        beginShape();
        for (let x = firstMinusLinear; x <= firstPlusLinear; x += 1) {
          let stroke_c = 0;
          let y = sin(map(x, 0, cycleLen, 0, TWO_PI));
          let yPos = map(y, -1, 1, 0, height / divideYvalue);
          let xPos = x + i * cycleLen;
          stroke(255);
          vertex(xPos, yPos + j + height / lineNum / 5 + height / lineNum / 4);
        }
        endShape();
      }
    } else {
      for (i = 0; i < divideXvalue + 1; i++) {
        beginShape();
        for (let x = secondMinusLinear; x <= secondPlusLinear; x += 1) {
          let stroke_c = 0;
          let y = sin(map(x, 0, cycleLen, 0, TWO_PI));
          let yPos = map(y, -1, 1, 0, height / divideYvalue);
          let xPos = x + i * cycleLen;
          stroke(255);
          vertex(xPos, yPos + j + height / lineNum / 5 + height / lineNum / 4);
        }
        endShape();
      }
    }
  }
}