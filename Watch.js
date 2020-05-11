class Watch{
	constructor(config){
		this.canvas = config.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.width = config.width;
		this.height = config.height;

		this.hands = [];
		this.handControllers = [];
		this.handLockController = new HandLockController();
		this.taskController = new TaskController({
			defaultTask: new TimeTask(),
			watch: this
		})

		this.timer = null;
	}
	addHands(hands){
		for(let hand of hands){
			this.handControllers.push(new HandController(hand));
			this.hands.push(hand);
			this.handLockController.addHandName(hand.name);
		}
		return this;
	}
	addTask(task){
		this.taskController.addTask(task);
	}
	getHandControllers(handNames){
		let hcs = this.handControllers.filter(hc=>handNames.includes(hc.hand.name));
		let output = {};
		for(let hc of hcs){
			output[hc.hand.name] = hc;
		}
		return output;
	}
	start(){
		let _this = this;
		let render = function(){
			_this.render();
			requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
		this.timer = setInterval(function(){
			_this.tick();
		}, 10);
	}

	tick(){
		this.taskController.tick();
		for(let hc of this.handControllers){
			hc.tick();
		}
	}

	render(){
		this.ctx.clearRect(0,0, canvas.width, canvas.height);
		for(let hand of this.hands){
			hand.render(this.ctx, this.x, this.y);
		}
	}
	
}

class WatchFactory{
	constructor(){}
	static get(name, canvas){
		switch(name){
			case 'ex1':
				return new Watch({
					canvas: canvas,
				}).addHands([HandFactory.get('ex1-1'),HandFactory.get('ex1-2'),HandFactory.get('ex1-3')]);
		}
	}
}