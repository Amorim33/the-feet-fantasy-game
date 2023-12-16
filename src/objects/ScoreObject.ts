/**
 * The score text object that can be created in the game.
 *
 * @param {Phaser.Scene} scene - The scene that this object belongs to.
 */
export class ScoreObject extends Phaser.GameObjects.Text {
  private score: number = 0;
  private level: number = 1;

  constructor(scene: Phaser.Scene) {
    super(scene, 16, 16, 'Score: 0\n\nLevel: 1', {
      fontSize: '32px',
      color: '#fff',
    });
    scene.add.existing(this);
  }

  /** Updates the score text. */
  updateScore(score: number): void {
    this.score = score + this.score;
    this.level = Math.floor(this.score / 50) + 1;
    this.setText(`Score: ${this.score} \n\nLevel: ${this.level}`);
  }

  /** Resets the score text. */
  resetScore(): void {
    this.score = 0;
    this.level = 1;
    this.setText(`Score: ${this.score} \n\nLevel: ${this.level}`);
  }

  /** Returns the current level. */
  getLevel(): number {
    return this.level;
  }
}
