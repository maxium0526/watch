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
	render(ctx, offsetX, offsetY){
		let x = this.x + offsetX;
		let y = this.y + offsetY;
		let xp = x + Math.cos(this.degree * Math.PI / 180) * this.length;
		let yp = y - Math.sin(this.degree * Math.PI / 180) * this.length;
		ctx.color = this.color;
		ctx.lineWidth = this.width;
		ctx.beginPath();
		ctx.moveTo(x, y);
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
	render(ctx, offsetX, offsetY){
		let x = this.x + offsetX;
		let y = this.y + offsetY;
		let xbp = x + Math.cos(this.degree * Math.PI / 180) * this.length.body;
		let ybp = y - Math.sin(this.degree * Math.PI / 180) * this.length.body;
		let xhp = x - Math.cos(this.degree * Math.PI / 180) * this.length.head;
		let yhp = y + Math.sin(this.degree * Math.PI / 180) * this.length.head;
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
	render(ctx, offsetX, offsetY){
		// let offsetX = this.x-Math.sin(this.degree * Math.PI / 180) * (this.width / 2);
		// let offsetY = this.y-Math.cos(this.degree * Math.PI / 180) * (this.width / 2);
		let x = this.x + offsetX;
		let y = this.y + offsetY;
		let gOffsetX = x-Math.cos((this.degree-this.gamma) * Math.PI / 180) * this.dgOffset;
		let gOffsetY = y+Math.sin((this.degree-this.gamma) * Math.PI / 180) * this.dgOffset;
		ctx.translate(gOffsetX, gOffsetY);
		ctx.rotate(-this.degree * Math.PI / 180);
		ctx.drawImage(this.image, 0,0, this.length, this.width);
		ctx.rotate(this.degree * Math.PI / 180);
		ctx.translate(-gOffsetX, -gOffsetY);

	}
}

class HandFactory{
	static get(name){
		switch(name){
			case 'ex1-1':
				return new ImageHand({
						name: 'hour',
						x: 150,
						y: 150,
						length: 89,
						degree: 0,
						width: 20,
						image:{
							src: 'img/ch1.png',
							handCenterX: 43,
							handCenterY: 45,
							width: 396,
							height: 89,
						}
					});
			case 'ex1-2':
				return new ImageHand({
						name: 'min',
						x: 150,
						y: 150,
						length: 120,
						degree: 0,
						width: 20,
						image:{
							src: 'img/ch2.png',
							handCenterX: 42,
							handCenterY: 49,
							width: 578,
							height: 96,
						},
					});
			case 'ex1-3':
				return new ImageHand({
						name: 'sec',
						x: 150,
						y: 150,
						length: 114,
						degree: 0,
						width: 20,
						image:{
							src: 'img/ch3.png',
							handCenterX: 43,
							handCenterY: 44,
							width: 485,
							height: 85,
						},
					});
			default:
				return null;
		}
	}
}