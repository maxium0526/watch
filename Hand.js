class Hand{
	constructor(config){
		this.name = config.name;
		this.x = config.x;
		this.y = config.y;
		this.length = config.length;
		this.degree = (config.degree+360) % 360;//
		this.color = config.color || '#000000';
		this.width = config.width || 1;
	}
	rotate(degree){
		this.degree += degree%360;
		this.degree = (this.degree+360) % 360;//
	}
	draw(ctx){
		let xp = this.x + Math.cos(this.degree * Math.PI / 180) * this.length;
		let yp = this.y - Math.sin(this.degree * Math.PI / 180) * this.length;
		ctx.color = this.color;
		ctx.lineWidth = this.width;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(xp, yp);
		ctx.stroke();
	}
}

class SingleLineHand extends Hand{
	constructor(config){
		super(config);
		this.length = {};
		if(Array.isArray(config.length)){
			this.length.head = config.length[0];
			this.length.body = config.length[1];
		} else {
			this.length.head = 0;
			this.length.body = config.length;
		}
	}
	draw(ctx){
		let xbp = this.x + Math.cos(this.degree * Math.PI / 180) * this.length.body;
		let ybp = this.y - Math.sin(this.degree * Math.PI / 180) * this.length.body;
		let xhp = this.x - Math.cos(this.degree * Math.PI / 180) * this.length.head;
		let yhp = this.y + Math.sin(this.degree * Math.PI / 180) * this.length.head;
		ctx.color = this.color;
		ctx.lineWidth = this.width;
		ctx.beginPath();
		ctx.moveTo(xhp, yhp);
		ctx.lineTo(xbp, ybp);
		ctx.stroke();
	}
}

class ImageHand extends Hand{
	constructor(config){
		super(config);
		this.image = new Image(this.length, this.width);
		this.image.src = config.image.src;
		this.handcenter = {};
		this.handcenter.x = (config.image.handCenterX * this.length / config.image.width);
		this.handcenter.y = (config.image.handCenterY * this.width / config.image.height);

		this.dgOffset = Math.sqrt(Math.pow(this.handcenter.x, 2) + Math.pow(this.handcenter.y, 2));
		this.gamma = Math.atan(this.handcenter.y / this.handcenter.x) * 180 / Math.PI;
	}
	draw(ctx){
		// let offsetX = this.x-Math.sin(this.degree * Math.PI / 180) * (this.width / 2);
		// let offsetY = this.y-Math.cos(this.degree * Math.PI / 180) * (this.width / 2);
		let offsetX = this.x-Math.cos((this.degree-this.gamma) * Math.PI / 180) * this.dgOffset;
		let offsetY = this.y+Math.sin((this.degree-this.gamma) * Math.PI / 180) * this.dgOffset;
		ctx.translate(offsetX, offsetY);
		ctx.rotate(-this.degree * Math.PI / 180);
		ctx.drawImage(this.image, 0,0, this.length, this.width);
		ctx.rotate(this.degree * Math.PI / 180);
		ctx.translate(-offsetX, -offsetY);

	}
}

