

export default class Context {
	actions: any = {};
	addNewAction(name: string, action: any) {
		this.actions[name] = action;
	}
	getAction(name: string = "getEditMode"): (value:any) => any {
		return this.actions[name] ? this.actions[name] : () => {return null};
	}
}