import {
  Application, Container, Loader,
} from 'pixi.js';
import Scene from './view/scene';
import MyLoader from './config/myLoader';
// import resource from './resource/resource';

export default class Game {
    private app: Application;
    protected mainContainer: Container;
    protected scene: Scene;
    protected resource;

    constructor() {
    //   this.resource = resource;
      this.buildGame();
    }

    public async buildGame(): Promise<void> {
      await this.loadSceneAssets();
      this.init();

    //   this.scene = Scene.getInstance();
    //   this.scene.createElements();
    //   this.mainContainer.addChild(this.scene);
    //   this.scene.sortableChildren = true;
    }

    private init(): void {
      this.app = new Application({
        transparent: true,
        width: 800,
        height: 600,
        antialias: true,
      });
      this.mainContainer = new Container();
      this.app.stage.addChild(this.mainContainer);
      document.body.appendChild(this.app.view);
    }

    public getApp(): Application {
      return this.app;
    }

    private async loadSceneAssets(): Promise<void> {
      const sceneLoader = MyLoader.createLoader();
      const sceneAssets = this.resource.sceneResource;

      await MyLoader.loadAssetsPack(sceneLoader, sceneAssets);
    }
}

const game = new Game();
