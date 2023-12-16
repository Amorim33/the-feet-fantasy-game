import { SCREEN_WIDTH } from '../config';
import { PlayerObject } from './PlayerObject';
import { ScoreObject } from './ScoreObject';

export const TEXTURE_KEY = 'enemy';

// TODO: Move this to a common interface
type GameSceneType = Phaser.Scene & {
  score?: ScoreObject;
};

/**
 * The enemy object that can be created in the game.
 *
 * @param {Phaser.Scene} scene - The scene that this object belongs to.
 * @param {Phaser.Physics.Arcade.StaticGroup} platforms - The platforms group
 *   that this object belongs to.
 * @param {PlayerObject} player - The player object.
 * @param {EnemyObject[]} enemies - The enemies group that this object belongs
 *   to.
 */
export class EnemyObject extends Phaser.Physics.Arcade.Sprite {
  private directions = ['enemy-left', 'enemy-right'];

  constructor(
    scene: GameSceneType,
    platforms: Phaser.Physics.Arcade.StaticGroup,
    player: PlayerObject,
    enemies: EnemyObject[] = [],
  ) {
    const x = Phaser.Math.Between(0, SCREEN_WIDTH);
    const y = Phaser.Math.Between(0, player.y - 100);

    super(scene, x, y, TEXTURE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, platforms, () => {
      if (this.body?.touching.left) {
        this.move(1);
        return;
      }
      if (this.body?.touching.right) {
        this.move(0);
      }
    });
    scene.physics.add.collider(this, player, () => {
      if (!player.body || !this.body || !scene.score) return;

      if (player.body.touching.down && this.body.touching.up) {
        this.destroy();
        enemies.splice(enemies.indexOf(this), 1);
        scene.score.updateScore(10);
        player.clearTint();
        return;
      }
      player.setTint(0xff0000);
      scene.score.resetScore();
    });

    this.setBounce(0.5, 0.5);
    this.createAnimations();
    this.setScale(1.5);

    // body can be undefined if the object is not added to the scene
    if (this.body) {
      this.setBodySize(this.body.width - 5, this.body.height);
    }
  }

  /** Creates animations for this object. */
  private createAnimations(): void {
    this.scene.anims.create({
      key: this.directions[0],
      frames: this.scene.anims.generateFrameNumbers(TEXTURE_KEY, {
        start: 7,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: this.directions[1],
      frames: this.scene.anims.generateFrameNumbers(TEXTURE_KEY, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  /**
   * Moves the enemy.
   *
   * @param {number} level - The current level of the game.
   * @param {number} givenDirection - The direction to move the enemy. 0 is
   *   left, 1 is right.
   */
  move(givenDirection?: number): void {
    const direction = givenDirection || Phaser.Math.Between(0, 1);
    if (direction === 0) {
      this.setVelocityX(-150);
      this.anims.play(this.directions[0], true);
      return;
    }
    this.setVelocityX(150);
    this.anims.play(this.directions[1], true);
  }
}
