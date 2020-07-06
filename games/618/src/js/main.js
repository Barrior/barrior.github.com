import configTitleBg from './sprite_config/title_bg.json';
import configTitlePacket from './sprite_config/title_red_packet.json';
import configTitleCube from './sprite_config/title_cube.json';
import configTitleCharacter from './sprite_config/title_character.json';
import configRope from './sprite_config/rope.json';
import configHitButton from './sprite_config/hit_button.json';
import configPacketFly from './sprite_config/red_packet_fly.json';
import configPacketSleep from './sprite_config/red_packet_sleep.json';
import configPacketTongue from './sprite_config/red_packet_tongue.json';
import configPacketCharm from './sprite_config/red_packet_charm.json';
import configHoldRedPacket from './sprite_config/hold_red_packet.json';
import configGold from './sprite_config/gold.json';
import showingQueue from './showing_queue';

class Game {
    constructor(loader) {
        this.loader = loader;
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
        if (this.screenWidth > 414) {
            this.screenWidth = 414;
            this.screenHeight = 736;
        }
        this.scale = this.screenWidth / 750;
        this.createStage();
        this.renderBackground();
        this.renderConctroller();
        this.increaseTotal();
        this.popupTitle();
    }
    
    createStage() {
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = this.screenWidth;
        canvas.height = this.screenHeight;
        document.querySelector('body').appendChild(canvas);
        
        this.stage = new createjs.Stage(canvas);
        createjs.Touch.enable(this.stage);
        
        // update stage automatically
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', this.stage);
    }
    
    // set common scale of display object
    setScale(displayObject) {
        displayObject.scaleX = this.scale;
        displayObject.scaleY = this.scale;
    }
    
    // set display object real width and height in current canvas
    resetBounds(displayObject) {
        const bounds = displayObject.getBounds();
        displayObject.setBounds(0, 0, bounds.width * this.scale, bounds.height * this.scale);
        return displayObject.getBounds();
    }
    
    renderBackground() {
        // set background image
        const bgBitmap = new createjs.Bitmap(this.loader.getResult('img_bg'));
        const bounds = bgBitmap.getBounds();
        bgBitmap.scaleX = this.screenWidth / bounds.width;
        bgBitmap.scaleY = this.screenHeight / bounds.height;
        this.stage.addChild(bgBitmap);
        
        // set background sound
        createjs.Sound.play('sound_bg', {loop: -1});
    }
    
    renderConctroller() {
        // setup game controller
        const controllerBitmap = new createjs.Bitmap(this.loader.getResult('img_controller'));
        const ctrlBounds = this.resetBounds(controllerBitmap);
        this.setScale(controllerBitmap);
        controllerBitmap.y = this.screenHeight - ctrlBounds.height;
        
        // ropes & flash gold
        const ropeSprite = new createjs.SpriteSheet({
            images: [this.loader.getResult('img_rope')],
            framerate: 10,
            frames: configRope.frames,
            animations: configRope.animations
        });
        const holdRedPacketSprite = new createjs.SpriteSheet({
            images: [this.loader.getResult('img_hold_red_packet')],
            framerate: 10,
            frames: configHoldRedPacket.frames,
            animations: configHoldRedPacket.animations
        });
        const goldSprite = new createjs.SpriteSheet({
            images: [this.loader.getResult('img_gold')],
            framerate: 10,
            frames: configGold.frames,
            animations: configGold.animations
        });
        
        this.staticRope = new createjs.Sprite(ropeSprite, 'staticRope');
        this.activeRope = new createjs.Sprite(ropeSprite, 'rope');
        this.hitch = new createjs.Bitmap(this.loader.getResult('img_hitch'));
        this.holdRedPacketAnimation = new createjs.Sprite(holdRedPacketSprite, 'run');
        this.flashGold = new createjs.Sprite(goldSprite, 'run');
        this.setScale(this.flashGold);
        
        const displayObjects = [
            this.staticRope, this.activeRope, this.hitch,
            this.holdRedPacketAnimation
        ];
        displayObjects.forEach((displayObject) => {
            const bounds = this.resetBounds(displayObject);
            this.setScale(displayObject);
            displayObject.x = (this.screenWidth - bounds.width) / 2;
            displayObject.y = this.screenHeight - bounds.height - 304 * this.scale;
        });
        
        this.stage.addChild(this.staticRope, controllerBitmap);
        
        this.startButton();
    }
    
    startButton() {
        const hitBtn = new createjs.SpriteSheet({
            framerate: 4,
            images: [this.loader.getResult('img_hit_button')],
            frames: configHitButton.frames,
            animations: configHitButton.animations
        });
        
        const start = new createjs.Sprite(hitBtn, 'start');
        this.pressedHitBtn = new createjs.Sprite(hitBtn, 'pressed');
        this.initialHitBtn = new createjs.Sprite(hitBtn, 'initial');
        [this.pressedHitBtn, this.initialHitBtn, start].forEach((displayObject) => {
            const bounds = this.resetBounds(displayObject);
            this.setScale(displayObject);
            displayObject.x = (this.screenWidth - bounds.width) / 2;
            displayObject.y = this.screenHeight - 298 * this.scale;
            this.stage.addChild(displayObject);
        });
        
        // click once only
        start.on('click', () => {
            this.stage.removeChild(start);
            this.moveTitle(() => {
                this.packetsShowing();
            });
            this.startGame();
        }, null, true);
    }
    
    popupTitle() {
        const redPacket = new createjs.SpriteSheet({
            images: [this.loader.getResult('img_title_red_packet')],
            frames: configTitlePacket.frames,
            animations: configTitlePacket.animations
        });
        const cube = new createjs.SpriteSheet({
            images: [this.loader.getResult('img_title_cube')],
            frames: configTitleCube.frames,
            animations: configTitleCube.animations
        });
        const bg = new createjs.SpriteSheet({
            images: [this.loader.getResult('img_title_bg')],
            frames: configTitleBg.frames,
            animations: configTitleBg.animations
        });
        const character = new createjs.SpriteSheet({
            images: [this.loader.getResult('img_title_character')],
            frames: configTitleCharacter.frames,
            animations: configTitleCharacter.animations
        });
        const packet1 = new createjs.Sprite(redPacket, 'packet1');
        const packet2 = new createjs.Sprite(redPacket, 'packet2');
        const packet3 = new createjs.Sprite(redPacket, 'packet3');
        const packet4 = new createjs.Sprite(redPacket, 'packet4');
        const packet5 = new createjs.Sprite(redPacket, 'packet5');
        const packet6 = new createjs.Sprite(redPacket, 'packet6');
        const packet7 = new createjs.Sprite(redPacket, 'packet7');
        const packet8 = new createjs.Sprite(redPacket, 'packet8');
        const cube1 = new createjs.Sprite(cube, 'cube1');
        const cube2 = new createjs.Sprite(cube, 'cube2');
        const cube3 = new createjs.Sprite(cube, 'cube3');
        const cube4 = new createjs.Sprite(cube, 'cube4');
        const cube5 = new createjs.Sprite(cube, 'cube5');
        const cube6 = new createjs.Sprite(cube, 'cube6');
        const bg1 = new createjs.Sprite(bg, 'bg1');
        const bg2 = new createjs.Sprite(bg, 'bg2');
        const bg3 = new createjs.Sprite(bg, 'bg3');
        const bg4 = new createjs.Sprite(bg, 'bg4');
        const bg5 = new createjs.Sprite(bg, 'bg5');
        const bg6 = new createjs.Sprite(bg, 'bg6');
        const bg7 = new createjs.Sprite(bg, 'bg7');
        const quan = new createjs.Sprite(character, 'quan');
        const ming = new createjs.Sprite(character, 'ming');
        const ping = new createjs.Sprite(character, 'ping');
        const shou = new createjs.Sprite(character, 'shou');
        const su = new createjs.Sprite(character, 'su');
        const qiang = new createjs.Sprite(character, 'qiang');
        const yi = new createjs.Sprite(character, 'yi');
        const wan = new createjs.Sprite(character, 'wan');
        const hong = new createjs.Sprite(character, 'hong');
        const bao = new createjs.Sprite(character, 'bao');
        const description = new createjs.Bitmap(this.loader.getResult('img_title_description'));
        
        this.willRemovedTitleWidget = [
            packet1, packet2, packet3, packet4, packet5, packet6, packet7, packet8,
            cube1, cube2, cube3, cube4, cube5, cube6,
            bg1, bg2, bg3, bg4, bg5, bg6, bg7,
            description,
        ];
        this.titleCharacters = {quan, ming, ping, shou, su, qiang, yi, wan, hong, bao};
        
        const bgs = [
            {
                displayObject: bg1,
                // x, y, wait, duration
                coords: [70, 474, 0, 2000],
                animations: [
                    {x: this.scale * 60, y: this.scale * 484},
                    {x: this.scale * 70, y: this.scale * 474},
                ],
                durations: [1000, 1000]
            },
            {
                displayObject: bg2,
                coords: [592, 553, 0, 2400],
                animations: [
                    {x: this.scale * 622, y: this.scale * 583},
                    {x: this.scale * 592, y: this.scale * 553},
                    {x: this.scale * 562, y: this.scale * 523},
                    {x: this.scale * 592, y: this.scale * 553},
                ],
                durations: [2000, 2000, 2000, 2000]
            },
            {
                displayObject: bg3,
                coords: [-34, 230, 0, 2000],
                animations: [
                    {x: this.scale * -22},
                    {x: this.scale * -34},
                ],
                durations: [1200, 1200]
            },
            {
                displayObject: bg4,
                coords: [420, 484, 0, 1800],
                animations: [
                    {x: this.scale * 430, y: this.scale * 494},
                    {x: this.scale * 420, y: this.scale * 484},
                ],
                durations: [2000, 2000]
            },
            {
                displayObject: bg5,
                coords: [144, 78, 0, 2000],
                animations: [
                    {x: this.scale * 94, y: this.scale * 28},
                    {x: this.scale * 144, y: this.scale * 78},
                    {x: this.scale * 174, y: this.scale * 108},
                    {x: this.scale * 144, y: this.scale * 78},
                ],
                durations: [2500, 2500, 1500, 1500]
            },
            {
                displayObject: bg6,
                coords: [70, 180, 0, 2200],
                animations: [
                    {y: this.scale * 190},
                    {y: this.scale * 170},
                    {y: this.scale * 180}
                ],
                durations: [1000, 2000, 1000]
            },
            {
                displayObject: bg7,
                coords: [228, 140, 100, 1800],
                animations: [
                    {y: this.scale * 130},
                    {y: this.scale * 150},
                    {y: this.scale * 140}
                ],
                durations: [1000, 2000, 1000]
            },
            {
                displayObject: packet1,
                coords: [269, 560, 0, 2000],
                animations: [
                    {x: this.scale * 254, y: this.scale * 584},
                    {x: this.scale * 269, y: this.scale * 560},
                ],
                durations: [4000, 4000]
            },
            {
                displayObject: packet2,
                coords: [300, 120, 0, 1400],
                animations: [
                    {x: this.scale * 258, y: this.scale * 20},
                    {x: this.scale * 300, y: this.scale * 120},
                ],
                durations: [4000, 4000]
            },
            {
                displayObject: packet3,
                coords: [425, 60, 0, 2000],
                animations: [
                    {x: this.scale * 445, y: this.scale * 30},
                    {x: this.scale * 425, y: this.scale * 60},
                ],
                durations: [3400, 3400]
            },
            {
                displayObject: packet5,
                coords: [680, 180, 0, 2000],
                animations: [
                    {x: this.scale * 700, y: this.scale * 160},
                    {x: this.scale * 680, y: this.scale * 180},
                    {x: this.scale * 660, y: this.scale * 200},
                    {x: this.scale * 680, y: this.scale * 180},
                ],
                durations: [3400, 3400, 3400, 3400]
            },
            {
                displayObject: packet7,
                coords: [12, 366, 0, 1800],
                animations: [
                    {x: this.scale * -12, y: this.scale * 386},
                    {x: this.scale * 12, y: this.scale * 366},
                    {x: this.scale * 22, y: this.scale * 356},
                    {x: this.scale * 12, y: this.scale * 366},
                ],
                durations: [3200, 3200, 1600, 1600]
            },
            {
                displayObject: packet8,
                coords: [24, 140, 0, 2200],
                animations: [
                    {x: this.scale * -4, y: this.scale * 120},
                    {x: this.scale * 24, y: this.scale * 140},
                ],
                durations: [3600, 3600]
            },
            {
                displayObject: cube1,
                coords: [618, 80, 0, 2200],
                animations: [
                    {x: this.scale * 628, y: this.scale * 70, rotation: 180},
                    {x: this.scale * 618, y: this.scale * 80, rotation: 360},
                ],
                durations: [2200, 2200]
            },
            {
                displayObject: cube2,
                coords: [184, 584, 0, 2200],
                animations: [
                    {x: this.scale * 164, y: this.scale * 604, rotation: 180},
                    {x: this.scale * 184, y: this.scale * 584, rotation: 360},
                ],
                durations: [2200, 2200]
            },
            {
                displayObject: cube3,
                coords: [633, 135, 0, 1800],
                animations: [
                    {x: this.scale * 638, y: this.scale * 130, rotation: 180},
                    {x: this.scale * 633, y: this.scale * 135, rotation: 0},
                ],
                durations: [2200, 2200]
            },
            {
                displayObject: cube4,
                coords: [700, 322, 0, 2000],
                animations: [
                    {x: this.scale * 706, y: this.scale * 324, rotation: 30},
                    {x: this.scale * 700, y: this.scale * 322, rotation: 0},
                ],
                durations: [2600, 2600]
            },
            {
                displayObject: cube5,
                coords: [86, 310, 100, 2300],
                animations: [
                    {x: this.scale * 80, y: this.scale * 316, rotation: 180},
                    {x: this.scale * 86, y: this.scale * 310, rotation: 360},
                ],
                durations: [4000, 4000]
            },
            {
                displayObject: cube6,
                coords: [700, 520, 50, 2000],
                animations: [
                    {x: this.scale * 720, y: this.scale * 540, rotation: 32},
                    {x: this.scale * 700, y: this.scale * 520, rotation: 0},
                ],
                durations: [3000, 3000]
            },
        ];
        bgs.forEach(({displayObject, coords, animations, durations}) => {
            // scale according to the center of the whole background box model
            displayObject.x = this.screenWidth / 2;
            displayObject.y = this.scale * 300;
            displayObject.scaleX = 0;
            displayObject.scaleY = 0;
            createjs.Tween.get(displayObject)
                .wait(coords[2])
                .to({
                    x: this.scale * coords[0],
                    y: this.scale * coords[1],
                    scaleX: this.scale,
                    scaleY: this.scale,
                }, coords[3], createjs.Ease.elasticOut)
                .call(() => {
                    const element = createjs.Tween.get(displayObject, {loop: true});
                    animations.forEach((item, i) => {
                        element.to(item, durations[i], createjs.Ease.linear);
                    });
                });
            this.stage.addChild(displayObject);
        });
        
        // coords: [x, y, wait, duration]
        const characters = [
            {displayObject: description, coords: [54, 450, 100, 1800]},
            {displayObject: quan, coords: [60, 150, 100, 2000]},
            {displayObject: ming, coords: [216, 170, 130, 2000]},
            {displayObject: su, coords: [500, 164, 120, 2100]},
            {displayObject: shou, coords: [400, 150, 150, 2100]},
            {displayObject: ping, coords: [300, 140, 200, 2200]},
            {displayObject: qiang, coords: [78, 300, 120, 2100]},
            {displayObject: yi, coords: [224, 306, 140, 2300]},
            {displayObject: bao, coords: [540, 320, 200, 2400]},
            {displayObject: hong, coords: [430, 290, 280, 2600]},
            {displayObject: wan, coords: [316, 290, 260, 3000]},
        ];
        characters.forEach(({displayObject, coords}) => {
            const bounds = this.resetBounds(displayObject);
            displayObject.x = this.scale * coords[0] + bounds.width / 2;
            displayObject.y = this.scale * coords[1] + bounds.height / 2;
            displayObject.scaleX = 0;
            displayObject.scaleY = 0;
            createjs.Tween.get(displayObject)
                .wait(coords[2])
                .to({
                    x: this.scale * coords[0],
                    y: this.scale * coords[1],
                    scaleX: this.scale,
                    scaleY: this.scale,
                }, coords[3], createjs.Ease.elasticOut)
            this.stage.addChild(displayObject);
        });
        
        // set cube6 onto high layer
        this.stage.addChild(cube6);
    }
    
    moveTitle(callback) {
        // remove litter component
        this.removeChild(...this.willRemovedTitleWidget);
        
        // character board
        const board = new createjs.Bitmap(this.loader.getResult('img_title_board'));
        const boardBounds = this.resetBounds(board);
        this.setScale(board);
        board.x = 30 * this.scale;
        board.y = -boardBounds.height;
        this.stage.addChild(board);
        createjs.Tween.get(board, {override: true})
            .to({y: 0}, 600, createjs.Ease.backOut);
        
        // characters
        const {quan, ming, ping, shou, su, qiang, yi, wan, hong, bao} = this.titleCharacters;
        const characters = [
            // coords: [x, y, wait, duration]
            {displayObject: quan, coords: [69, 26, 0, 600]},
            {displayObject: ming, coords: [147, 38, 50, 600]},
            {displayObject: su, coords: [287, 34, 200, 600]},
            {displayObject: shou, coords: [239, 28, 150, 600]},
            {displayObject: ping, coords: [189, 24, 100, 600]},
            {displayObject: qiang, coords: [378, 34, 0, 600]},
            {displayObject: yi, coords: [444, 38, 50, 600]},
            {displayObject: bao, coords: [602, 42, 200, 600]},
            {displayObject: hong, coords: [544, 29, 150, 600]},
            {displayObject: wan, coords: [488, 31, 100, 600]},
        ];
        characters.forEach(({displayObject, coords}, i) => {
            const animateObject = createjs.Tween.get(displayObject, {override: true})
                .wait(coords[2])
                .to({
                    x: this.scale * coords[0],
                    y: this.scale * coords[1],
                    scaleX: this.scale * 0.48,
                    scaleY: this.scale * 0.48,
                }, coords[3], createjs.Ease.backOut);
            
            if (i === 2) {
                animateObject.call(callback);
            }
            
            this.stage.addChild(displayObject);
        });
    }
    
    packetsShowing() {
        const packets = [
            {name: 'fly', spriteConfig: configPacketFly},
            {name: 'sleep', spriteConfig: configPacketSleep},
            {name: 'tongue', spriteConfig: configPacketTongue},
            {name: 'charm', spriteConfig: configPacketCharm},
        ];
        packets.forEach((item) => {
            const sprite = new createjs.SpriteSheet({
                framerate: 10,
                images: [this.loader.getResult(`img_packet_${item.name}`)],
                frames: item.spriteConfig.frames,
                animations: item.spriteConfig.animations
            });
            const displayObject = new createjs.Sprite(sprite, 'run');
            const bounds = this.resetBounds(displayObject);
            this.setScale(displayObject);
            
            // 304: controller height
            // 508: long rope height
            // 70: adjust position detail
            displayObject.y = this.screenHeight - (508 + 304) * this.scale - bounds.height + 70;
            displayObject.x = this.screenWidth;
            displayObject.rightX = displayObject.x;
            
            showingQueue.enqueue(displayObject);
        });
        
        this.displayRedPackets = {};
        let displayIndex = 0;
        
        const start = () => {
            const redPacket = showingQueue.dequeue();
            const bounds = redPacket.getBounds();
            
            // fill showing queue
            showingQueue.enqueue(redPacket);
            
            // record display red packet
            displayIndex++;
            redPacket.displayIndex = displayIndex;
            this.displayRedPackets[displayIndex] = redPacket;
            
            createjs.Tween.get(redPacket)
                .to({x: -bounds.width}, 3400, createjs.Ease.linear)
                .call(() => this.hideRedPacket(redPacket));
            
            this.addChild(redPacket);
            
            // dequeue timely
            setTimeout(() => {
                start();
            }, 1000);
        };
        start();
    }
    
    hideRedPacket(redPacket) {
        redPacket.x = redPacket.rightX;
        this.removeChild(redPacket);
        delete this.displayRedPackets[redPacket.displayIndex];
    }
    
    toggleDisplay(display, ...hidden) {
        this.removeChild(...hidden);
        this.addChild(display);
    }
    
    addChild(...chilren) {
        chilren.forEach((child) => {
            this.stage.addChild(child);
        });
    }
    
    removeChild(...chilren) {
        chilren.forEach((child) => {
            this.stage.removeChild(child);
        });
    }
    
    increaseTotal() {
        if (typeof this.redPacketTotal === 'undefined') {
            this.redPacketTotal = 0;
        } else {
            this.redPacketTotal++;
        }
        this.removeChild(this.totalText);
        const fontSize = 28 * this.scale;
        this.totalText = new createjs.Text(`您共套住了 ${this.redPacketTotal} 个红包`, `${fontSize}px Arial`, '#b83ef3');
        const bounds = this.totalText.getBounds();
        this.totalText.x = (this.screenWidth - bounds.width) / 2;
        this.totalText.y = this.screenHeight - (61 / 2) * this.scale;
        this.totalText.textBaseline = 'middle';
        this.addChild(this.totalText);
    }
    
    startGame() {
        // rope running
        this.toggleDisplay(this.activeRope, this.staticRope);
        this.stage.setChildIndex(this.activeRope, 1);
        
        let loosened = false;
        let flashGoldNumber = 0;
        
        // hitch rope circle info
        const circleLeftX = this.hitch.x + 10 * this.scale;
        const circleRightX = this.hitch.x + 200 * this.scale;
        
        // half width of red packet
        const rphw = 224 / 2 * this.scale;
        
        const initialHandler = () => {
            if (flashGoldNumber === 0) {
                this.addChild(this.activeRope);
                this.stage.setChildIndex(this.activeRope, 1);
            }
        };
        
        const holdRedPacket = () => {
            if (!this.displayRedPackets) return false;
            return Object.values(this.displayRedPackets).some((redPacket) => {
                const centerX = redPacket.x + rphw;
                if (centerX > circleLeftX && centerX < circleRightX) {
                    this.hideRedPacket(redPacket);
                    return true;
                }
            });
        };
        
        this.hitBtnHandler = () => {
            loosened = false;
            createjs.Sound.play('sound_click_btn');
            
            this.removeChild(this.initialHitBtn, this.activeRope);
            this.addChild(this.pressedHitBtn, this.hitch);
            this.stage.setChildIndex(this.hitch, 1);
            
            // loosen button automatically
            setTimeout(() => {
                this.loosenBtnHandler();
            }, 150);
        };
        
        this.loosenBtnHandler = () => {
            if (loosened) return;
            loosened = true;
            
            this.removeChild(this.pressedHitBtn, this.hitch);
            this.addChild(this.initialHitBtn);
            
            // if hold red packet
            if (holdRedPacket()) {
                this.addChild(this.holdRedPacketAnimation);
                this.stage.setChildIndex(this.holdRedPacketAnimation, 1);
                
                createjs.Sound.play('sound_hitch_packet');
    
                let animationHandlerExecuted = false;
                const holdRedPacketAnimationHandler = () => {
                    if (animationHandlerExecuted) return;
                    animationHandlerExecuted = true;
                    const flashGold = this.flashGold.clone();
                    this.toggleDisplay(flashGold, this.holdRedPacketAnimation);
                    this.increaseTotal();
                    createjs.Sound.play('sound_pick_gold');
                    flashGoldNumber++;
                    flashGold.on('animationend', () => {
                        flashGoldNumber--;
                        this.removeChild(flashGold);
                        initialHandler();
                    });
                };
    
                this.holdRedPacketAnimation.on('animationend', holdRedPacketAnimationHandler);
            } else {
                initialHandler();
            }
        };
        
        this.initialHitBtn.on('mousedown', this.hitBtnHandler);
        this.initialHitBtn.on('touchstart', this.hitBtnHandler);
        this.initialHitBtn.on('pressup', this.loosenBtnHandler);
    }
}

export default Game;


