import {
  Container, Sprite,
} from 'pixi.js';

import MyLoader from '../config/myLoader';

export default class Scene extends Container {
	protected bg: Sprite;
	private window: Sprite;
	protected config;
	private static instance: Scene;

	constructor() {
	  super();
	}

	//  public createElements(): void {
	//     this.createBg();
	//     this.gameManager = GameManager.getInstance();
	//     this.gameManager.init();
	//  }

	//  private createBg(): void {
	//     this.bg = new Sprite();
	//     // this.bg = new Sprite();
	//     this.bg.height = this.config.heightView;
	//     this.bg.width = this.config.widthView;
	//     this.bg.name = 'bg';
	//     this.addChild(this.bg);
	//     // this.createWindow();
	//  }

	//  private createWindow(): void {
	//     this.window = new Sprite(MyLoader.getRecourse('window'));
	//     this.addChild(this.window);
	//  }
	 public static getInstance(): Scene {
	    if (!Scene.instance) Scene.instance = new Scene();
	    return Scene.instance;
	 }
}
