/**
 * Created by QETHAN on 14-2-5.
 */
(function () {
	var ie = !!(window.attachEvent && !window.opera);
	var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
	var fn = [];
	var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
	var d = document;
	d.ready = function (f) {
		if (!ie && !wk && d.addEventListener)
			return d.addEventListener('DOMContentLoaded', f, false);
		if (fn.push(f) > 1) return;
		if (ie)
			(function () {
				try { d.documentElement.doScroll('left'); run(); }
				catch (err) { setTimeout(arguments.callee, 0); }
			})();
		else if (wk)
			var t = setInterval(function () {
				if (/^(loaded|complete)$/.test(d.readyState))
					clearInterval(t), run();
			}, 0);
	};
})();

document.ready(function() {
	var nyr = document.getElementById('nyr'),
	    year = document.getElementById('year'),
			month = document.getElementById('month'),
			date = document.getElementById('date');

	var lis = Array.prototype.slice.apply(document.querySelectorAll('ul.img-content li'));
	var lisLen = lis.length;
	window.onscroll = function(){
		if(nyr.getBoundingClientRect().top<=0) {
			nyr.style.position = 'fixed';
			nyr.style.left = '324px';
			nyr.style.top = '0';
			nyr.style.zIndex = 100;
		} else {
			nyr.style.position = 'static';
			nyr.style.left = '0';
			nyr.style.top = '0';
			nyr.style.zIndex = 0;
		}

		for(var i=0;i<lisLen;i++) {

			if(lis[i].getBoundingClientRect().top <= 300) {
				year.textContent = lis[i].getAttribute('data-year')+'年';
				month.textContent = lis[i].getAttribute('data-month')+'月';
				date.textContent = lis[i].getAttribute('data-date')+'日';
			} else {

			}
		};
	};
});