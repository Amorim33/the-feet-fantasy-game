import backgroundImg from '../../assets/earth-bg.png';
import groundImg from '../../assets/ground.png';
import playerSpriteSheet from '../../assets/player.png';
import enemySpriteSheet from '../../assets/pacman_by_oz_28x28.png';

import { TEXTURE_KEY as GROUND_TEXTURE_KEY } from '../objects/GroundObject';
import { TEXTURE_KEY as PLAYER_TEXTURE_KEY } from '../objects/PlayerObject';
import { TEXTURE_KEY as ENEMY_TEXTURE_KEY } from '../objects/EnemyObject';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.image('background', backgroundImg);
    this.load.image(GROUND_TEXTURE_KEY, groundImg);
    this.load.spritesheet(PLAYER_TEXTURE_KEY, playerSpriteSheet, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet(ENEMY_TEXTURE_KEY, enemySpriteSheet, {
      frameWidth: 28,
      frameHeight: 28,
    });
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
