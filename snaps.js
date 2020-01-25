let snaps = [];

class Snapshot {
  constructor(index, snap, target, pose, score) {
    this.index = index;
    this.snap = snap;
    this.target = target;
    this.pose = pose;
    this.score = score;
  }

  show = () => {
    const s = (p) => {
      p.setup = () => {
        p.createCanvas(640, 480);
      };

      p.draw = () => {
        // Draw the video feed
        p.translate(this.snap.width, 0);
        p.scale(-1, 1);
        p.image(this.snap, 0, 0);

        // Draw the target
        this.target.draw(p);

        // Draw the players points
        // Maybe bad practice since this function
        // is defined in a later import
        drawPosePoints(this.pose, p);
      };
    };

    new p5(s, `snapCanvas${this.index}`);
  };
}
