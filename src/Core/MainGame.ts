import { Application, Container } from 'pixi.js';
// import MyLoader from './MyLoader';
// import MainScene from './MainScene'

export default class MainGame {

    protected mainContainer: Container;
    protected app: Application;
    
    constructor(options: any){

        // this.width = options.width;
        // this.height = options.height;
        // this.waitAt = options.waitAt;
        // this.deadlineAt = options.deadlineAt;
        // this.nickName = options.nickName;
        // this.isAuth = options.isAuth;
        // this.baseWidth = 1125;
        // this.baseHeight = 2436;

        this.mainContainer = new Container();

        // this.mainLoader = MyLoader.loader();

        // this.createGame();

        this.init()
    }

    // async createGame() {

    //     this.mainLoader
    //     .add('logo', './assets/logo.png')

    //     for (let i = 1; i < 41; i++) {
    //         const val = i < 10 ? `0${i}` : i;
    //         this.mainLoader.add(`pilot_${val}`, `./assets/pilot_${val}.png`)
    //     }

    //     for (let i = 0; i < 10; i++) {
    //         const val = i < 10 ? `0${i}` : i;
    //         this.mainLoader.add(`bomb_${val}`, `./assets/bomb_${val}.png`)
    //     }

    //     for (let i = 0; i < 6; i++) {
    //         const val = i < 10 ? `0${i}` : i;
    //         this.mainLoader.add(`explosion_pilot_${val}`, `./assets/Explosion_Crash_${val}.png`)
    //     }

    //     for (let i = 0; i < 7; i++) {
    //         const val = i < 10 ? `0${i}` : i;
    //         this.mainLoader.add(`explosion_bomb_${val}`, `./assets/Explosion_bomb_${val}.png`)
    //     }
    //     for (let i = 0; i < 6; i++) {
    //         const val = i < 10 ? `0${i}` : i;
    //         this.mainLoader.add(`coin_explosion_${val}`, `./assets/coin_explosion_${val}.png`)
    //     }
    //     for (let i = 0; i < 7; i++) {
    //         const val = i < 10 ? `0${i}` : i;
    //         this.mainLoader.add(`coin_large_explosion_${val}`, `./assets/coin_large_explosion_${val}.png`)
    //     }

    //     await MyLoader.loadAssets(this.mainLoader);

    //     this.init();
    // }

    protected init() {
        
        // this.app = new PIXI.Application({ 
        //     width: this.baseWidth,
        //     height: this.baseHeight,
        //     antialias: true
        // });

        this.app = new Application({ 
            width: 800,
            height: 800,
            antialias: true
        });

        // let div = document.createElement('div');
        // div.style.width = `${this.width}px`;
        // div.style.height = `${this.height}px`;
        // div.style.position = 'relative';
        document.body.append(this.app.view);
        // div.append(this.app.view);

        // const clientWidth = this.width;
        // const clientHeight = this.height;
        // const screenProportions = clientHeight / clientWidth;
        // this.screenHeight = this.baseWidth * screenProportions;
        // this.shift = (this.baseHeight - this.screenHeight) / 2;

        // const canvas = document.getElementsByTagName("canvas");
        // canvas[0].style.position = "absolute";
        // canvas[0].style.transform = "translate(-50%, -50%)";
        // canvas[0].style.top = "50%";
        // canvas[0].style.left = "50%";
        // canvas[0].style.maxHeight = "unset";
        // canvas[0].style.maxWidth = "100%";
        
        // this.mainContainer;
        this.app.stage.addChild(this.mainContainer);
        // this.game = new MainScene({
        //     game: this,
        //     container: this.mainContainer,
        // });
    }
}