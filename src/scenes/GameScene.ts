import { SCREEN_WIDTH } from '../config';
import { EnemyObject } from '../objects/EnemyObject';
import { GroundObject } from '../objects/GroundObject';
import { PlayerObject } from '../objects/PlayerObject';
import { ScoreObject } from '../objects/ScoreObject';

export class GameScene extends Phaser.Scene {
  public score?: ScoreObject;

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private player?: PlayerObject;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private enemies: EnemyObject[] = [];
  private timer = 0;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.platforms = this.physics.add.staticGroup();
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.score = new ScoreObject(this);

    for (let i = 0; i < 6; i++) {
      new GroundObject(this, this.platforms, i * 256, 800)
        .setScale(0.5)
        .refreshBody();

      // bounds
      new GroundObject(this, this.platforms, -140, i * 256)
        .setScale(0.5)
        .refreshBody();
      new GroundObject(this, this.platforms, SCREEN_WIDTH + 140, i * 256)
        .setScale(0.5)
        .refreshBody();
    }

    this.player = new PlayerObject(this, this.platforms, 500, 450);
    this.player.setMaxVelocity(300, 400);

    this.physics.add.collider(this.player, this.platforms);
  }

  update(time: number): void {
    if (!this.player || !this.cursors || !this.platforms || !this.score) return;
    this.player.move(this.cursors);

    if (
      time - this.timer > 5000 / this.score.getLevel() &&
      this.enemies.length < 20
    ) {
      this.enemies.push(
        new EnemyObject(this, this.platforms, this.player, this.enemies),
      );
      this.enemies.forEach((enemy) => {
        enemy.move();
      });

      this.timer = time;
    }
  }
}
