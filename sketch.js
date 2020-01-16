/**
 * Todo when p5 updates:
 * change canvas size
 * change video.size()
 */

let video;
let poseNet;
let pose;
let loaded = false;
let target;

class TargetPose {
  // eventually use name and difficulty?
  constructor() {
    this.targetPoints = [
      { part: "nose", position: { x: 320, y: 32 } },
      { part: "leftShoulder", position: { x: 360, y: 94 } },
      { part: "rightShoulder", position: { x: 280, y: 94 } },
      { part: "leftElbow", position: { x: 400, y: 150 } },
      { part: "rightElbow", position: { x: 240, y: 150 } },
      { part: "leftWrist", position: { x: 420, y: 200 } },
      { part: "rightWrist", position: { x: 220, y: 200 } },
      { part: "leftKnee", position: { x: 360, y: 330 } },
      { part: "rightKnee", position: { x: 280, y: 330 } },
      { part: "leftAnkle", position: { x: 360, y: 420 } },
      { part: "rightAnkle", position: { x: 280, y: 420 } },
    ];
  }

  draw = () => {
    for (const point of this.targetPoints) {
      const { x, y } = point.position;
      strokeWeight(2);
      fill(255, 0, 0, 100);
      ellipse(x, y, 64);
    }
  };

  score = (pose) => {
    let total = 0;
    for (const point of this.targetPoints) {
      const { part, position } = point;
      const { x: targetX, y: targetY } = position;
      const { x: actualX, y: actualY } = pose[part];
      const d = dist(targetX, targetY, actualX, actualY);
      console.log(`Distance from target ${part}: ${d}`);
      if (d <= 32) {
        total += 10;
      }
    }
    return total;
  };
}

const countdown = () => {
  const startButton = document.getElementById("start");
  startButton.classList.toggle("hide");
  const timeDiv = document.getElementById("time");
  timeDiv.classList.toggle("hide");
  timeDiv.classList.toggle("timeText");
  const scoreDiv = document.getElementById("score");
  scoreDiv.innerText = "";

  let time = 3;
  timeDiv.innerText = time;

  const interval = setInterval(() => {
    time -= 1;
    timeDiv.innerText = time;
    if (time <= 0) {
      clearInterval(interval);
      startButton.classList.toggle("hide");
      timeDiv.classList.toggle("hide");
      timeDiv.classList.toggle("timeText");
      const score = target.score(pose);
      scoreDiv.innerText = `Your score: ${score}`;
    }
  }, 1000);
};

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.parent("canvasContainer");
  video = createCapture(VIDEO);
  // video.size(960, 720);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", getPoses);
  target = new TargetPose();
}

const modelLoaded = () => {
  loaded = true;
  const loadingDiv = document.getElementById("loading");
  loadingDiv.classList.toggle("hide");
  const startButton = document.getElementById("start");
  startButton.classList.toggle("hide");
};

const getPoses = (poses) => {
  if (poses.length > 0) {
    pose = poses[0].pose;
    console.log(pose);
  }
};

function draw() {
  // move image by the width of image to the right
  translate(video.width, 0);
  // then scale it by -1 in the x-axis to flip the image
  scale(-1, 1);
  // draw video capture feed as image inside p5 canvas
  image(video, 0, 0);

  if (loaded) {
    target.draw();
  }

  if (pose) {
    // && pose.score > 0.5
    // console.log(pose);
    for (const point of pose.keypoints) {
      const { x, y } = point.position;
      // strokeWeight(0);
      // fill(255, 0, 0);
      // ellipse(x, y, 16);
    }
  }
}
