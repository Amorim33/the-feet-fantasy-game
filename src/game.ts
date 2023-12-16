import 'phaser';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './config';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const cfg: Phaser.Types.Core.GameConfig = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, GameScene],
    input: {
      keyboard: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 150,
        },
        debug: false,
      },
    },
    backgroundColor: '#222',
    render: {
      pixelArt: true,
      antialias: false,
    },
  };

  new Game(cfg);
});
