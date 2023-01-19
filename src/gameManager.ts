/* eslint-disable indent */
/* eslint-disable no-tabs */
	import { Sprite, Text, Texture } from 'pixi.js';
	// import { resolve } from 'dns';
	import * as nearAPI from 'near-api-js';
	// import { nearAPI } from 'near-api-js';
	import { WalletConnection } from 'near-api-js';
	import Button from './components/button';
	import FinishGamePopUp from './components/finishGamePopUp';
	import ScoreBoard from './components/scoreBoard';
	import MyLoader from './config/myLoader';
	import Scene from './view/scene';
	import GameField from './viewComponents/gameField';
	import WindArrow from './viewComponents/windArrow';
	import config from './config/config';

    export default class GameManager {
	protected scene: Scene;
	protected finishGamePopUp: FinishGamePopUp

	protected windVector: string;
	protected windArrow: WindArrow;
	protected gameField: GameField;
	protected scoreBoard: ScoreBoard;
	protected nearSignInBtn: Button;
	protected nearSignOutBtn: Button;
	protected nearBoard: Sprite;
	protected checkersType: any;
	nearConnect;
	protected nearLabel;
    private static instance: GameManager;

	public checkersColorArr = ['cookieGreen', 'cookieRed'];
	// protected checkersColorArr = ['cookieGreen', 'cookieRed', 'cookieBlue', 'cookieOrange'];
	constructor() {
		this.scene = Scene.getInstance();
		this.scene.sortableChildren = true;
		this.checkersType = config.cookiesType;
		// console.log(WalletConnection);
		// console.log(nearAPI);
	}

	public init(): void {
		this.createWindArrow();
		this.createFinishGamePopUp();
		this.createGameField();
		this.createScoreBoard();
		// this.createNearBoard();
		// this.createNearButton();
		this.checkLocal();
		// this.addGameCheckers();
	}

	public addGameCheckers(): void {
		console.log('this.checkersColorArr', this.checkersColorArr);
		console.log('this.checkersType', this.checkersType);
		// if (score >= 200 || score >= 600) {
		const typeIndex = this.checkersColorArr.length;
			if (this.checkersColorArr.length <= this.checkersType.length) {
				this.checkersColorArr.push(this.checkersType[typeIndex]);
			}
		// }
	}

	protected async checkLocal() {
		const local = localStorage.getItem('my-app_wallet_auth_key');

		if (local) {
			const localObj = JSON.parse(local);
			const nearAccount = localObj.accountId;
			const { keyStores } = nearAPI;
			const keyStore = new keyStores.BrowserLocalStorageKeyStore();

			const { connect } = nearAPI;

			const config = {
				headers: { },
				networkId: 'testnet',
				keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
				nodeUrl: 'https://rpc.testnet.near.org',
				walletUrl: 'https://wallet.testnet.near.org',
				helperUrl: 'https://helper.testnet.near.org',
				explorerUrl: 'https://explorer.testnet.near.org',
			};
			this.nearConnect = await connect(config);
			const wallet = new WalletConnection(this.nearConnect, 'my-app');
			const account = await this.nearConnect.account(`${nearAccount}`);
			const accountId = wallet.getAccountId();
			console.log('wallet', wallet);
			console.log('account', account);

			console.log('accountId', accountId);
			const a = await account.state();
			console.log(a);

			const walletDetails = await account.getAccountBalance();
			console.log('walletDetails ::', walletDetails);
			this.createNearLabel(walletDetails.total);
		}
		// console.log('this.nearLabel', this.nearLabel);
		if (this.nearLabel) {
			this.nearSignInBtn.visible = false;
			this.nearSignInBtn.interactive = false;

			this.createNearSignOutBtn();
			this.nearSignOutBtn.visible = true;
		}
	}

	private getRandomNumber(min: number, max: number): number {
		return Math.floor(min - 0.5 + Math.random() * (max - min + 1));
	}

	public createWindVector() {
		const randomNumber = this.getRandomNumber(0, 100);

		switch (true) {
			case randomNumber <= 25:
				this.windVector = 'north';
				this.windArrow.arrowNorth();
				break;
			case randomNumber > 25 && randomNumber <= 50:
				this.windVector = 'south';
				this.windArrow.arrowSouth();
				break;
			case randomNumber > 50 && randomNumber <= 75:
				this.windVector = 'west';
				this.windArrow.arrowWest();
				break;
			default:
				this.windVector = 'east';
				this.windArrow.arrowEast();
			}

			// this.windVector = 'east';
			// this.windArrow.arrowEast();
			return this.windVector;
	}

	protected createWindArrow(): void {
		this.windArrow = new WindArrow();
		this.windArrow.x = this.scene.width - this.windArrow.width + 100;
		this.windArrow.y = 500;

		this.scene.addChild(this.windArrow);
	}

	protected createGameField(): void {
		this.gameField = GameField.getInstance();
		this.gameField.init();
		this.gameField.zIndex = 4;
		this.scene.addChild(this.gameField);
		// this.gameField.createTableLegs();
	}

	public getChecker(): string {
		const checker = this.getRandomNumber(1, this.checkersColorArr.length - 1);
		const checkerColor = this.checkersColorArr[checker];
		return checkerColor;
	}

	protected createFinishGamePopUp(): void {
		this.finishGamePopUp = FinishGamePopUp.getInstance();
	}

	protected createScoreBoard() {
		this.scoreBoard = ScoreBoard.getInstance();
		this.scene.addChild(this.scoreBoard);
	}

	protected createNearBoard() {
		this.nearBoard = new Sprite(MyLoader.getRecourse('nearBoard'));
		this.createNearSignInButton();
		this.nearBoard.x = (this.scene.width - this.nearBoard.width) / 2;
		this.scene.addChild(this.nearBoard);
	}

	protected createNearSignInButton = () => {
		this.nearSignInBtn = new Button({
			label: 'near',
			btnTexture: MyLoader.getRecourse('blueCellBg'),
		});

		// this.nearBtn.y =
		this.nearSignInBtn.x = this.nearBoard.width - this.nearSignInBtn.width - 10;
		this.nearSignInBtn.addEventBtn(this.nearConnection);
		this.nearBoard.addChild(this.nearSignInBtn);
	}

	protected createNearSignOutBtn() {
		this.nearSignOutBtn = new Button({
			label: 'OuT',
			btnTexture: MyLoader.getRecourse('blueCellBg'),
		});
		this.nearBoard.addChild(this.nearSignOutBtn);
		this.nearSignOutBtn.visible = false;
		this.nearSignOutBtn.addEventBtn(this.nearConnection);
		this.nearSignOutBtn.x = this.nearBoard.width - this.nearSignInBtn.width - 10;
		this.nearSignOutBtn.addEventBtn(this.a);
	}

	a() {
		const wallet = new WalletConnection(this.nearConnect, 'my-app');
		wallet.signOut();
	}

	protected async nearConnection() {
		const { keyStores } = nearAPI;
		const keyStore = new keyStores.BrowserLocalStorageKeyStore();

		const { connect } = nearAPI;

		const config = {
			headers: {

			},
			networkId: 'testnet',
			keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
			nodeUrl: 'https://rpc.testnet.near.org',
			walletUrl: 'https://wallet.testnet.near.org',
			helperUrl: 'https://helper.testnet.near.org',
			explorerUrl: 'https://explorer.testnet.near.org',
		};
		this.nearConnect = await connect(config);
		const wallet = new WalletConnection(this.nearConnect, 'my-app');

		wallet.requestSignIn();
	}

	protected async createNearLabel(nearTotal) {
		const style = {
            fontFamily: 'MuseoSlab-900',
            fontSize: 50,
            fill: '#ffffff',
            fontWeight: 'bold',
        };
		nearTotal = nearTotal.slice(0, 10);

		this.nearLabel = new Text(`${nearTotal}`, style);
		this.nearLabel.x = this.nearSignInBtn.x - this.nearLabel.width - 30;
		this.nearLabel.y = this.nearSignInBtn.y + (this.nearSignInBtn.height / 2);
		this.nearBoard.addChild(this.nearLabel);

		// return await new Promise(async (resolve) => {
		// 	console.log('------');
		// 	debugger;
		// 	const account = await this.nearConnect.account('neartestforme.testnet');
		// 	const walletDetails = await account.getAccountBalance();
		// 	console.log('walletDetails ::', walletDetails);
		// 	resolve(true);
		// });
	}

	// protected nearContract() {
	// 	window.nearInitPromise = initContract()
	// 		.then(() => {
	// 			if (window.walletConnection.isSignedIn()) signedInFlow();
	// 			else signedOutFlow();
	// 		})
	// 		.catch(console.error);
	// }

	public static getInstance(): GameManager {
		if (!GameManager.instance) GameManager.instance = new GameManager();
		return GameManager.instance;
	}
 }
