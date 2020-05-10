class Hand{
	constructor(config){
		this.name = config.name;
		this.x = config.x;
		this.y = config.y;
		this.length = config.length;
		this.degree = (config.degree+360) % 360;//
		this.color = config.color;
	}
	rotate(degree){
		this.degree += degree%360;
		this.degree = (this.degree+360) % 360;//
	}
	draw(ctx){
		var xp = this.x + Math.cos(this.degree * Math.PI / 180) * this.length;
		var yp = this.y - Math.sin(this.degree * Math.PI / 180) * this.length;
		ctx.color = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(xp, yp);
		ctx.stroke();
	}
}