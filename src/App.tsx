import { useRef, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { Game } from './game/scenes/Game';
import { EventBus } from './game/EventBus';

function App()
{

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const addSprite = () => {

        if (phaserRef.current)
        {
            const scene = phaserRef.current.scene as Game;

            if (scene)
            {
                // Add a new sprite to the current scene at a random position
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);
    
                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                scene.add.sprite(x, y, 'star');
                scene.highScore++;
            }
        }
    }

    useEffect(() => {
        // Listen for the final highscore
        EventBus.addListener('scene-shutdown', (scene: Game) => {
            console.log('Final highscore:', scene.highScore);
            // Do something with the final score, like send it to your server
        });

        return () => {
            EventBus.removeListener('scene-shutdown');
        };
    }, []);

    const onCurrentActiveScene = (scene_instance: Phaser.Scene) => {
        // Now we can cast it to our Game type
        // const gameScene = scene_instance as Game;
        if (scene_instance instanceof Game) scene_instance.highScore = 50;
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={onCurrentActiveScene} />
            <div>
                <div>
                    <button className="button" onClick={addSprite}>Add New Sprite</button>
                </div>
            </div>
        </div>
    );
}

export default App
