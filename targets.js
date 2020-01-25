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
    name: "A",
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
  {
    name: "V",
    points: [
      { part: "nose", position: { x: 320, y: 60 } },
      { part: "leftShoulder", position: { x: 356, y: 108 } },
      { part: "rightShoulder", position: { x: 284, y: 108 } },
      { part: "leftElbow", position: { x: 412, y: 96 } },
      { part: "rightElbow", position: { x: 228, y: 96 } },
      { part: "leftWrist", position: { x: 496, y: 48 } },
      { part: "rightWrist", position: { x: 144, y: 48 } },
      { part: "leftKnee", position: { x: 396, y: 356 } },
      { part: "rightKnee", position: { x: 244, y: 356 } },
      { part: "leftAnkle", position: { x: 432, y: 438 } },
      { part: "rightAnkle", position: { x: 208, y: 438 } },
    ],
  },
  {
    name: "DIAGONAL",
    points: [
      { part: "nose", position: { x: 388, y: 58 } },
      { part: "leftShoulder", position: { x: 394, y: 130 } },
      { part: "rightShoulder", position: { x: 328, y: 82 } },
      { part: "leftElbow", position: { x: 428, y: 162 } },
      { part: "rightElbow", position: { x: 278, y: 60 } },
      { part: "leftWrist", position: { x: 496, y: 212 } },
      { part: "rightWrist", position: { x: 196, y: 22 } },
      { part: "leftKnee", position: { x: 360, y: 340 } },
      { part: "rightKnee", position: { x: 280, y: 340 } },
      { part: "leftAnkle", position: { x: 360, y: 430 } },
      { part: "rightAnkle", position: { x: 280, y: 430 } },
    ],
  },
  {
    name: "STAPLE",
    points: [
      { part: "nose", position: { x: 320, y: 130 } },
      { part: "leftShoulder", position: { x: 356, y: 168 } },
      { part: "rightShoulder", position: { x: 284, y: 168 } },
      { part: "leftElbow", position: { x: 406, y: 168 } },
      { part: "rightElbow", position: { x: 234, y: 168 } },
      { part: "leftWrist", position: { x: 406, y: 218 } },
      { part: "rightWrist", position: { x: 234, y: 218 } },
      { part: "leftKnee", position: { x: 406, y: 356 } },
      { part: "rightKnee", position: { x: 234, y: 356 } },
      { part: "leftAnkle", position: { x: 396, y: 446 } },
      { part: "rightAnkle", position: { x: 244, y: 446 } },
    ],
  },
  {
    name: "EGYPTIAN",
    points: [
      { part: "nose", position: { x: 300, y: 80 } },
      { part: "leftShoulder", position: { x: 346, y: 114 } },
      { part: "rightShoulder", position: { x: 312, y: 130 } },
      { part: "leftElbow", position: { x: 414, y: 126 } },
      { part: "rightElbow", position: { x: 264, y: 158 } },
      { part: "leftWrist", position: { x: 408, y: 204 } },
      { part: "rightWrist", position: { x: 236, y: 102 } },
      { part: "leftKnee", position: { x: 346, y: 366 } },
      { part: "rightKnee", position: { x: 252, y: 338 } },
      { part: "leftAnkle", position: { x: 410, y: 438 } },
      { part: "rightAnkle", position: { x: 260, y: 434 } },
    ],
  },
  {
    name: "SQUAT",
    points: [
      { part: "nose", position: { x: 320, y: 188 } },
      { part: "leftShoulder", position: { x: 346, y: 224 } },
      { part: "rightShoulder", position: { x: 294, y: 224 } },
      { part: "leftElbow", position: { x: 376, y: 262 } },
      { part: "rightElbow", position: { x: 264, y: 262 } },
      { part: "leftWrist", position: { x: 360, y: 260 } },
      { part: "rightWrist", position: { x: 280, y: 260 } },
      { part: "leftKnee", position: { x: 380, y: 362 } },
      { part: "rightKnee", position: { x: 260, y: 362 } },
      { part: "leftAnkle", position: { x: 360, y: 430 } },
      { part: "rightAnkle", position: { x: 280, y: 430 } },
    ],
  },
  {
    name: "SPLIT",
    points: [
      { part: "nose", position: { x: 320, y: 130 } },
      { part: "leftShoulder", position: { x: 360, y: 184 } },
      { part: "rightShoulder", position: { x: 280, y: 184 } },
      { part: "leftElbow", position: { x: 358, y: 254 } },
      { part: "rightElbow", position: { x: 282, y: 254 } },
      { part: "leftWrist", position: { x: 356, y: 328 } },
      { part: "rightWrist", position: { x: 284, y: 328 } },
      { part: "leftKnee", position: { x: 414, y: 362 } },
      { part: "rightKnee", position: { x: 226, y: 362 } },
      { part: "leftAnkle", position: { x: 468, y: 434 } },
      { part: "rightAnkle", position: { x: 172, y: 434 } },
    ],
  },
  {
    name: "TREE",
    points: [
      { part: "nose", position: { x: 296, y: 34 } },
      { part: "leftShoulder", position: { x: 326, y: 92 } },
      { part: "rightShoulder", position: { x: 248, y: 88 } },
      { part: "leftElbow", position: { x: 368, y: 132 } },
      { part: "rightElbow", position: { x: 198, y: 134 } },
      { part: "leftWrist", position: { x: 346, y: 168 } },
      { part: "rightWrist", position: { x: 230, y: 180 } },
      { part: "leftKnee", position: { x: 390, y: 268 } },
      { part: "rightKnee", position: { x: 288, y: 336 } },
      { part: "leftAnkle", position: { x: 312, y: 318 } },
      { part: "rightAnkle", position: { x: 306, y: 430 } },
    ],
  },
  {
    name: "DAB",
    points: [
      { part: "nose", position: { x: 374, y: 46 } },
      { part: "leftShoulder", position: { x: 384, y: 84 } },
      { part: "rightShoulder", position: { x: 324, y: 78 } },
      { part: "leftElbow", position: { x: 446, y: 88 } },
      { part: "rightElbow", position: { x: 252, y: 74 } },
      { part: "leftWrist", position: { x: 380, y: 58 } },
      { part: "rightWrist", position: { x: 172, y: 50 } },
      { part: "leftKnee", position: { x: 360, y: 340 } },
      { part: "rightKnee", position: { x: 280, y: 340 } },
      { part: "leftAnkle", position: { x: 360, y: 430 } },
      { part: "rightAnkle", position: { x: 280, y: 430 } },
    ],
  },
  {
    name: "DOIT",
    points: [
      { part: "nose", position: { x: 320, y: 70 } },
      { part: "leftShoulder", position: { x: 358, y: 130 } },
      { part: "rightShoulder", position: { x: 282, y: 130 } },
      { part: "leftElbow", position: { x: 380, y: 198 } },
      { part: "rightElbow", position: { x: 260, y: 198 } },
      { part: "leftWrist", position: { x: 358, y: 258 } },
      { part: "rightWrist", position: { x: 282, y: 258 } },
      { part: "leftKnee", position: { x: 406, y: 330 } },
      { part: "rightKnee", position: { x: 234, y: 330 } },
      { part: "leftAnkle", position: { x: 392, y: 428 } },
      { part: "rightAnkle", position: { x: 248, y: 428 } },
    ],
  },
];

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

class TargetPose {
  constructor(name, points, difficulty) {
    this.name = name;
    this.points = points;
    switch (difficulty) {
      case "EASY":
        this.circleSize = 64;
        break;
      case "MEDIUM":
        this.circleSize = 48;
        break;
      case "HARD":
        this.circleSize = 32;
        break;
      default:
        this.circleSize = 64;
        break;
    }
  }

  draw = (p) => {
    for (const point of this.points) {
      const { x, y } = point.position;
      if (p) {
        p.strokeWeight(2);
        p.fill(57, 255, 20, 100);
        p.ellipse(x, y, this.circleSize);
      } else {
        strokeWeight(2);
        fill(57, 255, 20, 100);
        ellipse(x, y, this.circleSize);
      }
    }
  };

  score = (pose) => {
    let total = 0;
    for (const point of this.points) {
      const { part, position } = point;
      const { x: targetX, y: targetY } = position;
      const { x: actualX, y: actualY } = pose[part];
      const d = dist(targetX, targetY, actualX, actualY);
      if (d <= this.circleSize / 2) {
        total += 10;
      }
    }
    return total;
  };
}
