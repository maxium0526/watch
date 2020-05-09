class Action{
	constructor(type, degree, age, step){
		this.type = type;
		this.degree = degree;
		this.age = age;
		this.step = step;
	}
	setCallback(callback){
		this.callback = callback;
		return this;
	}
	toString(){
		return this.type + ",&emsp;degree:"+Math.round(this.degree*100)/100+",&emsp;age:"+this.age;
	}
}
