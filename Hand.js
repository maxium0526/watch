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
		this.image = new Image(this.width, this.length);
		this.image.src = config.image_src;
	}
	draw(ctx){
		let offsetX = this.x-Math.cos(this.degree * Math.PI / 180) * (this.width / 2);
		let offsetY = this.y+Math.sin(this.degree * Math.PI / 180) * (this.width / 2);
		ctx.translate(offsetX, offsetY);
		ctx.rotate(-this.degree * Math.PI / 180);
		ctx.drawImage(this.image, 0,0, this.width, this.length);
		ctx.rotate(this.degree * Math.PI / 180);
		ctx.translate(-offsetX, -offsetY);

	}
}