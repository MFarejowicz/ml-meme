const partSet = new Set([
  "nose",
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle",
]);

const starterPose = [
  { part: "nose", position: { x: 320, y: 42 } },
  { part: "leftShoulder", position: { x: 360, y: 104 } },
  { part: "rightShoulder", position: { x: 280, y: 104 } },
  { part: "leftElbow", position: { x: 430, y: 104 } },
  { part: "rightElbow", position: { x: 210, y: 104 } },
  { part: "leftWrist", position: { x: 484, y: 104 } },
  { part: "rightWrist", position: { x: 156, y: 104 } },
  { part: "leftKnee", position: { x: 360, y: 340 } },
  { part: "rightKnee", position: { x: 280, y: 340 } },
  { part: "leftAnkle", position: { x: 360, y: 430 } },
  { part: "rightAnkle", position: { x: 280, y: 430 } },
];

const targetList = [
  { name: "TPOSE", points: starterPose },
  {
    name: "BORING",
    points: [
      { part: "nose", position: { x: 320, y: 42 } },
      { part: "leftShoulder", position: { x: 360, y: 104 } },
      { part: "rightShoulder", position: { x: 280, y: 104 } },
      { part: "leftElbow", position: { x: 400, y: 160 } },
      { part: "rightElbow", position: { x: 240, y: 160 } },
      { part: "leftWrist", position: { x: 420, y: 210 } },
      { part: "rightWrist", position: { x: 220, y: 210 } },
      { part: "leftKnee", position: { x: 360, y: 340 } },
      { part: "rightKnee", position: { x: 280, y: 340 } },
      { part: "leftAnkle", position: { x: 360, y: 430 } },
      { part: "rightAnkle", position: { x: 280, y: 430 } },
    ],
  },
];

class TargetPose {
  // eventually use difficulty?
  constructor(name, points) {
    this.name = name;
    this.points = points;
  }

  draw = () => {
    for (const point of this.points) {
      const { x, y } = point.position;
      strokeWeight(2);
      fill(57, 255, 20, 100);
      ellipse(x, y, 64);
    }
  };

  score = (pose) => {
    let total = 0;
    for (const point of this.points) {
      const { part, position } = point;
      const { x: targetX, y: targetY } = position;
      const { x: actualX, y: actualY } = pose[part];
      const d = dist(targetX, targetY, actualX, actualY);
      if (d <= 32) {
        total += 10;
      }
    }
    return total;
  };
}

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
