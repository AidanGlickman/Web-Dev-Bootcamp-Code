function printReverse(arr){
	for(var i = arr.length-1; i >= 0; i--){
		console.log(arr[i]);
	}
}

function isUniform(arr){
	var initVal = arr[arr.length-1];
	arr.forEach(function(val){
		if(!initVal===val){
			return false;
		}
	})
	return true;
}

function sumArray(arr){
	var total = 0;
	arr.forEach(function(val) {
		total += val;
	})
	return total;
}

function max(arr){
	var max = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if(arr[i]>max){
			max = arr[i];
		}
	}
	return max;
}

