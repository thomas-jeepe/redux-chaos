# redux-chaos
Dead Simple Chaos/Property Testing with Redux

This randomly chooses actions from an array 100,000 times and dispatches it to a store and a hook on each repetition.

##chaos `(Store: ReduxStore, Actions: Array<Object | Function>, Each: ?Function)`

Store: any redux store

Actions: array of your actions

Each: `(prevState: any, nextState: any, action: Object | Function): void`

Each is executed every iteration and given the parameters above, self explanatory.

##Example

```javascript
function counter(state = {count: 0, other: ''}, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return {
				count: state.count + 1,
				other: state.other
			}
    case 'DECREMENT_COUNTER':
      return {
				count: state.count - 1,
				other: state.other
			}
		case 'AYYY': 
			return {
				count: state.count,
				other: state.other.length > 50 ? state.other : state.other + 'lo'
			}
    default:
      return state
  }
}

const mockStore = createStore(counter)

function eachTime (prevState, nextState, action) {
	if(action.type === 'INCREMENT_COUNTER')
		expect(nextState.count).to.be.above(prevState.count)
	if(action.type === 'DECREMENT_COUNTER')
		expect(nextState.count).to.be.below(prevState.count)
		
	expect(nextState.other).to.have.length.below(51)
}

describe('Redux', () => {
	it('things', () => {
		chaos(mockStore, [
			{type: 'INCREMENT_COUNTER'}, 
			{type: 'DECREMENT_COUNTER'}, 
			{type: 'AYYY'}], 
			eachTime)
	})
})
```

Very simple.
