function chaos(t,a,e){for(var h,n,o=0;1e5>o;o++)h=t.getState(),n=a[~~(Math.random()*a.length)];t.dispatch(n),e(h,t.getState(),n)||0}
// so beautiful