class Task{
	constructor(config){
		this.config = config;
	}
	getRequiredHands(){
		return this.config.requiredHands;
	}
	start(hcs, callback){
		this.config.onStart(hcs, callback);
	}
}

class DefaultTask extends Task{
	constructor(config){
		super(config);
	}
	stop(){

	}
}

class TimeTask extends Task{
	constructor(config){
		super(config);
		this.timer = null;
	}
	getRequiredHands(){
		return ['hour', 'min', 'sec'];
	}
	start(hcs, callback){
		this.timer = setInterval(function(){
			let date = new Date();
			var datesecond = date.getSeconds();
			var datemin = date.getMinutes();
			var datehour = date.getHours();

			hcs.sec.pushAction(new Action(0,(360+90-6*(datesecond))%360,1,1));
			hcs.min.pushAction(new Action(0,(360+90-6*(datemin)-(datesecond/60)*6)%360,1,1));
			hcs.hour.pushAction(new Action(0,(360+90-30*(datehour%12)-(datemin/60)*30)%360,1,1));
		}, 1000)
	}
	stop(){
		clearInterval(this.timer);
	}
}