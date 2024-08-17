//Question 1: Clean the room function: 
//given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], 
//make a function that organizes these into individual array that is ordered. 
//For example answer(ArrayFromAbove) should return: 
//[[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
//Bonus: Make it so it organizes strings differently from number types. 
//i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

//What I Want To Do:
// X Create a function called cleanRoom that
// X Accepts an array which
// X (ideally) Separates strings and nums, and then
// X Creates arrays of identical values, and then
// X Sorts those values from 'lowest' to 'highest', and finally
// X Returns an array of the sorted values

function cleanRoom(arr) {
	let arraysByType = sortIntoArraysByType(arr);
	let sortedArraysByType = sortMultipleTypedArrays(arraysByType);
	let allTheBoxes = createSubArraysByValueOfMultipleArrays(sortedArraysByType);
	let noBoxesForSingleItems = removeSingleItemArraysInArrayOfArrayOfArrays(allTheBoxes);
	let cleanedArray = removeEmptyArrays(noBoxesForSingleItems);
	return cleanedArray;
}

//STEP 1 : Sort Arrays Into 3 Arrays (Now called 2nd Level Arrays) By Type
	function sortIntoArraysByType(arr) {
		let arrayOfTypedArrays = [];
		let numArr = [];
		let strArr = [];
		let othrArr = [];

		for (let i = 0; i < arr.length; i++) {
			valType = typeof arr[i];

			switch (valType) {
			case 'number' : numArr.push(arr[i]);
				break;
			case 'string' : strArr.push(arr[i]);
				break;
			default : othrArr.push(arr[i]);
				break;
			}
		}
		arrayOfTypedArrays = arrayOfTypedArrays.concat([numArr], [strArr], [othrArr]);
		return arrayOfTypedArrays;
	}


//STEP 2 : Sort Each 2nd Level Array from Lowest to Highest Value
	function sortMultipleTypedArrays(arr) {
		for (let i = 0; i < arr.length; i++) {
			sortTypedArray(arr[i]);
		}
		return arr;
	}

	function sortTypedArray(arr) {
		if (typeof arr[0] === 'number') {
			arr.sort((a, b) => a-b);
		}
		else arr.sort();
		return arr;
	}

//STEP 3 : Group Each Value in the 2nd Level Arrays Such That Each Value Has Its Own Array (3rd Level)
	function createSubArraysByValueOfMultipleArrays(arr) {
		let concatArray = [];
		for (let i = 0; i < arr.length; i++) {
			concatArray.push(createSubArraysByValue(arr[i]));
		}
		return concatArray;
	}

	function createSubArraysByValue(arr) {
		let dividedArrays = [];
			while (arr.length > 0) {
			let lengthOfSubArray = arr.lastIndexOf(arr[0]) - arr.indexOf(arr[0]) + 1
			let newArr = arr.slice(arr.indexOf(arr[0]), arr.lastIndexOf(arr[0])+1);
			dividedArrays = dividedArrays.concat([newArr]);
			arr.splice(0, lengthOfSubArray);
		}
		return dividedArrays;
	}

//STEP 4 : If A 3rd Level Array Has a Length Of 1, Replace the Array With the Value
	function pullOutValueInSingleItemArrays(arr) {
		let valueToReturn;
		if (arr.length === 1) {
			valueToReturn = arr[0];
		}
		else valueToReturn = arr;
		return valueToReturn;
	}

	function removeSingleItemArraysInArrayOfArrays(arr) {
		let noSingleItemArraysInArray = [];
		for (let i = 0; i < arr.length; i++) {
			noSingleItemArraysInArray.push(pullOutValueInSingleItemArrays(arr[i]));
			}
		return noSingleItemArraysInArray;
	}

	function removeSingleItemArraysInArrayOfArrayOfArrays(arr) {
		let fewerArraysInArray = [];
		for (let i = 0; i < arr.length; i++) {
			fewerArraysInArray.push(removeSingleItemArraysInArrayOfArrays(arr[i]));
		}
		return fewerArraysInArray;
	}

//STEP 5 : Remove Any 2nd Level Arrays With a Length of 0
	function removeEmptyArrays(arr) {
		let noEmptyBoxes = [];
		for (let i=0; i < arr.length; i++) {
			if (arr[i].length > 0) {
				noEmptyBoxes.push(arr[i]);
			}
		}
		return noEmptyBoxes;
	}

//TESTING GROUNDS

let testArr = [1, "2", "3", 2];
let testArr2 = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20, 201, 35];
let testArr3 = ["green", "blue", "sepia", "red", "white"];
let testArr4 = [1,1,1,1,3,3,5,6,7,7,7,20];
let testArr5 = [1, "2", "3", 2, 4,591,392,391,2,5,10,2,1,1,1,20,20, 201, 35, "green", "blue", "sepia", "red", "white"]
let testArr6 = [[1, 1, 1, 1, 2, 2, 2, 4, 5, 10, 20, 20, 35, 201, 391, 392, 591], ['2', '3', 'blue', 'green', 'red', 'sepia', 'white'], []];
let testArr7 = [2];
let testArr8 = [[[1, 1, 1, 1], [2, 2, 2], [4], [5], [10], [20, 20], [35], [201], [391], [392], [591]], [['2'], ['3'], ['blue'], ['green'], ['red'], ['sepia'], ['white']], []]
let testArr9 = [[1, 1, 1, 1], [2, 2, 2], [4], [5], [10], [20, 20], [35], [201], [391], [392], [591]]

console.log(cleanRoom(testArr5));