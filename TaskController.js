class TaskController{
	constructor(config){
		this.tasks = [];
		this.currentTask = null;
		this.defaultTask = config.defaultTask;
		this.watch = config.watch;

		this.isRunningDefaultTask = false;
	}
	addTask(task){
		this.tasks.push(task);
		return this;
	}
	tick(){
		let _this = this;
		if(this.currentTask==null && this.tasks.length>0){
			this.currentTask = this.tasks.shift();
		}
		if(this.currentTask){
			if(this.isRunningDefaultTask){
				this.defaultTask.stop();
				this.watch.handLockController.unlock(this.defaultTask.getRequiredHands());
				this.isRunningDefaultTask = false;
			}
			if(this.watch.handLockController.check(this.currentTask.getRequiredHands())){
				this.watch.handLockController.lock(this.currentTask.getRequiredHands());
				this.currentTask.start(this.watch.getHandControllers(this.currentTask.getRequiredHands()), function(){
					_this.watch.handLockController.unlock(_this.currentTask.getRequiredHands());
					_this.currentTask = null;
				})
				
			}
		} else {
			if(this.watch.handLockController.check(this.defaultTask.getRequiredHands())){
				this.watch.handLockController.lock(this.defaultTask.getRequiredHands());
				this.isRunningDefaultTask = true;
				this.defaultTask.start(this.watch.getHandControllers(this.defaultTask.getRequiredHands()), function(){
					_this.watch.handLockController.unlock(_this.defaultTask.getRequiredHands());
				})
			}
		}
		
	}
}