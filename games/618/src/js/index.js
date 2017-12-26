import './createjs-2015.11.26.min';
import '../scss/package.scss';
import Game from './main';

const manifest = [
    {src: require('../img/bg.jpg'), id: 'img_bg'},
    {src: require('../img/controller.png'), id: 'img_controller'},
    {src: require('../img/hit_button.png'), id: 'img_hit_button'},
    {src: require('../img/rope.png'), id: 'img_rope'},
    {src: require('../img/hitch.png'), id: 'img_hitch'},
    {src: require('../img/gold.png'), id: 'img_gold'},
    {src: require('../img/hold_red_packet.png'), id: 'img_hold_red_packet'},
    
    // red packet
    {src: require('../img/red_packet/fly.png'), id: 'img_packet_fly'},
    {src: require('../img/red_packet/charm.png'), id: 'img_packet_charm'},
    {src: require('../img/red_packet/tongue.png'), id: 'img_packet_tongue'},
    {src: require('../img/red_packet/sleep.png'), id: 'img_packet_sleep'},
    
    // title images
    {src: require('../img/title/bg.png'), id: 'img_title_bg'},
    {src: require('../img/title/board.png'), id: 'img_title_board'},
    {src: require('../img/title/character.png'), id: 'img_title_character'},
    {src: require('../img/title/description.png'), id: 'img_title_description'},
    {src: require('../img/title/red_packet.png'), id: 'img_title_red_packet'},
    {src: require('../img/title/cube.png'), id: 'img_title_cube'},
    
    // sound
    {src: require('../media/bg.mp3'), id: 'sound_bg'},
    {src: require('../media/click_btn.mp3'), id: 'sound_click_btn'},
    {src: require('../media/hitch_packet.mp3'), id: 'sound_hitch_packet'},
    {src: require('../media/pick_gold.mp3'), id: 'sound_pick_gold'},
];

const loadingElement = document.querySelector('.loading');
const progressElement = loadingElement.querySelector('.loading .progress');
const loader = new createjs.LoadQueue(true);
loader.installPlugin(createjs.Sound);

loader.addEventListener('complete', () => {
    loadingElement.parentElement.removeChild(loadingElement);
    new Game(loader);
});

loader.addEventListener('progress', () => {
    progressElement.innerHTML = `${loader.progress * 100 | 0}%`;
});

loader.loadManifest(manifest, true);