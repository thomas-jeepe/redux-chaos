exports.chaos = function chaos (store, actions, each) {
 	for(var i = 0; i < 10000; i++) {
 		var prevState = store.getState()
 		var action = actions[Math.floor(Math.random() * actions.length)]
 		store.dispatch(action)
 		if(each)
		 each(prevState, store.getState(), action)
 	}
}