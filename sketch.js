/**
 * Todo when p5 updates:
 * change canvas size
 * change video.size() with
 * video.size(960, 720);
 *
 */

let video;
let poseNet;
let pose;
let target;
let loaded = false;
let started = false;
let calibrated = false;
let difficulty = "EASY";

const loadingDiv = document.getElementById("loading");
const startDiv = document.getElementById("start");
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
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", getPose);
}

const modelLoaded = () => {
  loaded = true;
  hideElement(loadingDiv);
  showElement(startDiv);
};

const getPose = (poses) => {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
};

const drawPosePoints = (pose, p) => {
  for (const point of pose.keypoints) {
    if (partSet.has(point.part)) {
      const { x, y } = point.position;
      if (p) {
        p.strokeWeight(0);
        p.fill(255, 0, 0);
        p.ellipse(x, y, 8);
      } else {
        strokeWeight(0);
        fill(255, 0, 0);
        ellipse(x, y, 8);
      }
    }
  }
};

function draw() {
  // move image by the width of image to the right
  // then scale it by -1 in the x-axis to flip the image
  // draw video capture feed as image inside p5 canvas
  translate(video.width, 0);
  scale(-1, 1);
  const frame = video.get();
  image(frame, 0, 0);

  if (loaded && started) {
    target.draw();
  }

  if (pose && !calibrated) {
    drawPosePoints(pose);
  }
}

const start = (diff) => {
  difficulty = diff;
  started = true;
  target = new TargetPose("TPOSE", starterPose, difficulty);

  hideElement(startDiv);
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

const makeNewTarget = (targets, index) => {
  const targetData = targets[index];
  target = new TargetPose(targetData.name, targetData.points, difficulty);
};

const game = () => {
  let targets = shuffle(targetList);
  let totalScore = 0;
  let currentIndex = 0;

  makeNewTarget(targets, currentIndex);
  let timeLeft = 4;
  timeDiv.innerText = "MATCH THIS!";

  const interval = setInterval(() => {
    timeLeft -= 1;
    timeDiv.innerText = timeLeft;
    if (timeLeft <= 0) {
      const targetScore = target.score(pose);
      totalScore += targetScore;
      snaps.push(new Snapshot(currentIndex, video.get(), target, pose, targetScore));
      currentIndex++;

      if (currentIndex >= targets.length) {
        clearInterval(interval);
        hideElement(timeDiv);
        showElement(infoDiv);
        infoDiv.innerText = `Your score was ${totalScore}!`;
        snaps.forEach((snap) => snap.show());
        showElement(document.getElementById("refresh"));
      } else {
        makeNewTarget(targets, currentIndex);
        timeLeft = 4;
        timeDiv.innerText = "MATCH THIS!";
      }
    }
  }, 1000);
};
