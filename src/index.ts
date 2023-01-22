// import MainGame from './Core/MainGame';

import MainGame from "./Core/MainGame.ts";

export default new class Main {

    constructor() {
        console.log('2222222222222222222222222222');
        
        this.initGame();
    }

    async initGame() { 
        console.log('afsafsawfsawfwaf');

        const game = new MainGame({});
        
        // await this.loadFont();
        // this.game = new MainGame({
        //     width: document.documentElement.clientWidth,
        //     height: document.documentElement.clientHeight,
        //     // nickName: '',
        //     nickName: 'Alex',
        //     waitAt: 3,
        //     deadlineAt: 1585612500,
        //     isAuth: false,
        // });
    }

}

// const main = new Main();