/**
 * Todo when p5 updates:
 * change canvas size
 * change video.size()
 */

let video;
let poseNet;
let pose;
let target;
let loaded = false;
let started = false;
let calibrated = false;

const startButton = document.getElementById("start");
const timeDiv = document.getElementById("time");
const infoDiv = document.getElementById("info");

const hideElement = (element) => {
  if (!element.classList.contains("hide")) {
    element.classList.toggle("hide");
  }
};

const showElement = (element) => {
  if (element.classList.contains("hide")) {
    element.classList.toggle("hide");
  }
};

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.parent("canvasContainer");
  video = createCapture(VIDEO);
  // video.size(960, 720);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", getPose);
}

const modelLoaded = () => {
  loaded = true;
  const loadingDiv = document.getElementById("loading");
  loadingDiv.classList.toggle("hide");
  const startButton = document.getElementById("start");
  startButton.classList.toggle("hide");
};

const getPose = (poses) => {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
};

function draw() {
  // move image by the width of image to the right
  translate(video.width, 0);
  // then scale it by -1 in the x-axis to flip the image
  scale(-1, 1);
  // draw video capture feed as image inside p5 canvas
  image(video, 0, 0);

  if (loaded && started) {
    target.draw();
  }

  if (pose && !calibrated) {
    for (const point of pose.keypoints) {
      if (partSet.has(point.part)) {
        const { x, y } = point.position;
        strokeWeight(0);
        fill(255, 0, 0);
        ellipse(x, y, 8);
      }
    }
  }
}

const start = () => {
  started = true;
  target = new TargetPose("TPOSE", starterPose);

  hideElement(startButton);
  showElement(infoDiv);
  infoDiv.innerText = "Match the pose to start!";
  calibrate();
};

const calibrate = () => {
  showElement(timeDiv);
  let onTargetTime = 4;

  const interval = setInterval(() => {
    const score = target.score(pose);
    if (score === 110) {
      onTargetTime -= 1;
      hideElement(infoDiv);
      timeDiv.innerText = onTargetTime;
    } else {
      onTargetTime = 4;
      showElement(infoDiv);
      timeDiv.innerText = "";
    }

    if (onTargetTime <= 0) {
      clearInterval(interval);
      calibrated = true;
      game();
    }
  }, 1000);
};

const game = () => {
  let targets = shuffle(targetList);
  let score = 0;
  let currentIndex = 0;

  const targetData = targets[currentIndex];
  target = new TargetPose(targetData.name, targetData.points);

  let timeLeft = 4;
  timeDiv.innerText = "MATCH THIS!";
  const interval = setInterval(() => {
    timeLeft -= 1;
    timeDiv.innerText = timeLeft;
    if (timeLeft <= 0) {
      score += target.score(pose);
      currentIndex++;

      if (currentIndex >= targets.length) {
        clearInterval(interval);
        hideElement(timeDiv);
        showElement(infoDiv);
        infoDiv.innerText = `Your score was ${score}!`;
      } else {
        const targetData = targets[currentIndex];
        target = new TargetPose(targetData.name, targetData.points);
        timeLeft = 4;
        timeDiv.innerText = "MATCH THIS!";
      }
    }
  }, 1000);
};
