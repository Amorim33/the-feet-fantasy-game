export const TEXTURE_KEY = 'ground';

/**
 * The ground object that can be created in the game.
 *
 * @param {Phaser.Scene} scene - The scene that this object belongs to.
 * @param {Phaser.Physics.Arcade.StaticGroup} platforms - The platforms group
 *   that this object belongs to.
 * @param {number} x - The x coordinate of this object.
 * @param {number} y - The y coordinate of this object.
 */
export class GroundObject extends Phaser.Physics.Arcade.Image {
  constructor(
    scene: Phaser.Scene,
    platforms: Phaser.Physics.Arcade.StaticGroup,
    x: number,
    y: number,
  ) {
    super(scene, x, y, TEXTURE_KEY);
    return platforms.create(x, y, 'ground');
  }
}
