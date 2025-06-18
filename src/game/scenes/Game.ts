import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene
{
    highScore: number;
    highScoreText: Phaser.GameObjects.Text;
    
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('star', 'star.png');
        this.load.image('background', 'bg.png');
        this.load.image('logo', 'logo.png');
    }

    create ()
    {
        this.add.image(512, 384, 'background');
        this.add.image(512, 350, 'logo').setDepth(100);
        this.add.text(512, 490, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        this.highScore = 0;
        this.highScoreText = this.add.text(20, 20, `High Score: ${this.highScore}`);

        const nextButton = this.add.text(400, 400, 'Next Stage', { 
            fontSize: '24px', 
            backgroundColor: '#000',
            padding: { x: 10, y: 5 }
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('NextStage'); // Switch to next stage
        });
        
        EventBus.emit('current-scene-ready', this);

        this.events.once('shutdown', () => {
            EventBus.emit('scene-shutdown', this);
        });
    }

    update ()
    {
        this.highScoreText.setText(`High Score: ${this.highScore}`);
    }
}
