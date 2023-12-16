export const TEXTURE_KEY = 'player';

/**
 * The player object that can be created in the game.
 *
 * @param {Phaser.Scene} scene - The scene that this object belongs to.
 * @param {number} x - The x coordinate of this object.
 * @param {number} y - The y coordinate of this object.
 */
export class PlayerObject extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    platforms: Phaser.Physics.Arcade.StaticGroup,
    x: number,
    y: number,
  ) {
    super(scene, x, y, TEXTURE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, platforms);

    this.setCollideWorldBounds(true);
    this.setBounce(0.5, 0.5);
    this.createAnimations();
    this.setScale(1.5);
    // body can be undefined if the object is not added to the scene
    if (this.body) {
      this.setBodySize(this.body.width - 15, this.body.height);
    }
  }

  /** Creates animations for this object. */
  private createAnimations(): void {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers(TEXTURE_KEY, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: TEXTURE_KEY, frame: 4 }],
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers(TEXTURE_KEY, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  /**
   * Moves the player.
   *
   * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors - The cursor keys
   *   that are being pressed.
   */
  move(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    if (cursors.left?.isDown) {
      this.setVelocityX(-160);
      this.anims.play('left', true);
    } else if (cursors.right?.isDown) {
      this.setVelocityX(160);
      this.anims.play('right', true);
    } else {
      this.setVelocityX(0);
      this.anims.play('turn');
    }

    if (cursors.up?.isDown && this.body?.touching.down) {
      this.setVelocityY(-200);
    }
  }
}
