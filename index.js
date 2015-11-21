function objToArray (obj) {
	var keys = Object.keys(obj)
	var finalArray = keys.map(function(v) {
		if(obj[v].type != undefined || typeof obj[v] === 'function') {
			return obj[v]	
		} else {
			return objToArray(obj[v])
		} 
	})
	return [].concat.apply([], finalArray)
}

exports.chaos = function chaos (store, actions, each) {
	actions = Array.isArray(actions) ?
		actions : 
		objToArray(actions)
 	for(var i = 0; i < 10000; i++) {
 		var prevState = store.getState()
 		var action = actions[Math.floor(Math.random() * actions.length)]
 		store.dispatch(action)
 		if(each != undefined) {
			 each(prevState, store.getState(), action)
		 } 
 	}
}