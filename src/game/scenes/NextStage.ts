import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class NextStage extends Scene {
  constructor() {
      super('NextStage');
  }

  create() {
      // Your next stage content here
      this.add.text(400, 300, 'Next Stage!', {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          stroke: '#000000',  // optional: adds outline
          strokeThickness: 4  // optional: controls outline thickness
      });
      
      // Add a button to go back
      const backButton = this.add.text(400, 400, 'Back to Main', { 
          fontSize: '24px', 
          backgroundColor: '#000',
          padding: { x: 10, y: 5 }
      })
      .setInteractive()
      .on('pointerdown', () => {
          this.scene.start('Game'); // Switch back to main game scene
      });

      // Still emit the event for Next.js integration
      EventBus.emit('current-scene-ready', this);
  }
}