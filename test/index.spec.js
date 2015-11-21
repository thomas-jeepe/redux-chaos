// ew es5
var expect = require('chai').expect
var chaos = require('../index').chaos
var createStore = require('redux').createStore

function counter(state, action) {
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
                other: state.other.length >= 50 ? state.other : state.other + 'lo'
            }
    default:
      return state
  }
}

var mockStore = createStore(counter, {count: 0, other: ''}) 

describe('chaos', () => {
	it('should handle array and not throw', () => {
		expect(() => chaos(mockStore, [{type: 'INCREMENT_COUNTER'}])).to.not.throw()
	})
  it('should handle action object and not throw', () => {
    expect(() => chaos(mockStore, {
      increment: 
        {
          type: 'INCREMENT_COUNTER'
        },
      doot: {nested: {type: 'AYYY'}}
      })).to.not.throw()
  })
})