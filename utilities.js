var RandomThreshold = function() {
	return Math.random() * 0.2 + 0.9;
};

var anyInclude = function(arr, str) {
	for (var i in arr) {
		if (arr[i].includes(str)) {
			return true;
		}
	}
	return false;
};

var Roll = function(number, type) {
	var n = 0;
	for (i = 0; i < number; i++) {
		n += Math.floor(Math.random() * type) + 1;
	}
	return n;
};

var randomChoice = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};