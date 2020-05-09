class HandLockController{
	constructor(){
		this.handNames = [];
		this.handLockStatus = {};
	}
	addHandName(handName){
		this.handNames.push(handName);
		this.handLockStatus[handName] = false;
		return this;
	}
	lock(handNames){
		for(let handName of handNames){
			if(this.handLockStatus[handName]!=undefined){
				this.handLockStatus[handName] = true;
				return true;
			}
			return false;
		}
	}
	unlock(handNames){
		for(let handName of handNames){
			if(this.handLockStatus[handName]!=undefined){
				this.handLockStatus[handName] = false;
				return true;
			}
			return false;
		}
	}
	check(handNames){
		let output = false;
		for(let handName of handNames){
			output = output || this.handLockStatus[handName];
		}
		return !output;
	}

}