var solved = [[],[],[],[],[],[],[],[],[]];
var type="";
// console.log(type);

var arr = [[],[],[],[],[],[],[],[],[]];
var s = [];
var t = [];


$("#submit1").click(function(){
	var col = document.getElementsByTagName("td");
	// console.log(col);
	var count=0;
	var t = [];
	for(var a=0;a<col.length;a++){
		var j = col[a];
		//console.log(j);
		var l = $(j).html();
		//console.log(l);
		var m = $(l).attr('value');
		// console.log("M = "+m);
		t.push(m);
		count++;
		if(count==9){
			count=0;
			s.push(t);
			t = [];
		}
	}
//console.log("our input");
//console.log(s);
	var flag=0;
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(s[i][j]!=solvedBoard[i][j]){
				alert("Wrong Answer");
				s=[];
				flag=1;
				show_board(board);
				break;
			}
		}
	}
	if(flag==0) alert("Congratulation You Solved Sudoku Correctly");
});

$(".cell").change(function(){
	var z = $(this).val();
	$(this).attr("value",z);
});



$("#create").click(function(){
	console.log(board);
	if(type=="Select Difficulty Level" || type==""){
		// console.log("Yes");
		//console.log(type);
		alert("Please Select the Difficulty Level");
		$("#container").css("display","none");		
	}
	else{
		
		$.ajax({
			url: 'https://sugoku.herokuapp.com/board?difficulty='+type+'',
			type: 'GET',
			dataType: "json",
			success: function(data){
				// console.log("Generate SuccesFully");
				arr = data.board;
				solved = data.board;
				console.log(data);
				show_board(arr);
				solveSudoku(solved);
			},
			error: function(data){
				console.log("error");
			}
		});
	}
});

var board = [[],[],[],[],[],[],[],[],[]];
function show_board(arr){
	for(var a=0;a<9;a++){
		for(var b=0;b<9;b++){
			board[a][b] = arr[a][b];
		}
	}

	createBoard(board);
}


function createBoard(board){
	var col = document.getElementsByTagName("td");
	var b=0;
	var c=0;
	while(b<9){
		for(var a=0;a<9;a++){

			if(board[b][a]!="0") {
				document.getElementById(c).setAttribute("readonly", true);
				$("#"+c).attr('value',board[b][a]);
				$("#"+c).css("color","black");
				$("#"+c).css("font-size","14px");
				$("#"+c).css("font-weight","bold");
				$("#"+c).css("background-color","rgb(191, 159, 187)");
			}
			c++;
		}
		b++;
	}
	$("#container").css("display","block");
	$("#submit1").css("display","block");
	$("#clear").css("display","block");
}


$("#clear").click(function(){
	$("#container").css("display","none");	
	$("#submit1").css("display","none");
	$("#clear").css("display","none");
	$("#type").val("Select").change();
	// for(var i=0;i<9;i++){
	// 	for(var j=0;j<9;j++){
	// 		board[i][j]=0;
	// 		arr[i][j]=0;
	// 		solved[i][j]=0;
	// 	}
	// }
	var b=0;
	var c=0;
	while(b<9){
		for(var a=0;a<9;a++){

			if(board[b][a]!="0") {
				document.getElementById(c).setAttribute("readonly", false);
				$("#"+c).attr('value','');
				$("#"+c).css("color","#6d7985f2");
				$("#"+c).css("font-size","14px");
				$("#"+c).css("font-weight","bold");
				$("#"+c).css("background-color","rgb(191, 159, 187)");
			}
			c++;
		}
		b++;
	}


	//data.board = [[],[],[],[],[],[],[],[],[]];
	arr = [[],[],[],[],[],[],[],[],[]];
	solved = [[],[],[],[],[],[],[],[],[]];
	solvedBoard = [[],[],[],[],[],[],[],[],[]];
	s = [];
	t = [];
	console.log("Solved");
	console.log(board);
	console.log(arr);
	console.log(solved);
})


$("#type").change(function(){

	type = $("#type option:selected").text();

	if(type=="Select Difficulty Level" || type==""){
		//alert("Please Choose Difficulty Level");
		$("#container").css("display","none");
		$("#submit1").css("display","none");
	}
	

});
//console.log("board");


//Algorithm to solve sudoku 
function isPossible(arr,sr,sc,val){
	for(var row=0;row<9;row++){
		if(arr[row][sc]==val){
			return false;
		}
	}

	for(var col=0;col<9;col++){
		if(arr[sr][col]==val){
			return false;
		}
	}

	var r = sr - sr%3;
	var c = sc - sc%3;

	for(var cr = r;cr<r+3;cr++){
		for(var cc = c;cc<c+3;cc++){
			if(arr[cr][cc]==val){
				return false;
			}
		}
	}

	return true;

}
solvedBoard = [[],[],[],[],[],[],[],[],[]];
function solveSudokuHelper(t,sr,sc){
	if(sr==9){
		for (var i = 0; i < 9; i++) {
			for(var j=0;j<9;j++){
				solvedBoard[i][j] = t[i][j];
			}
		}
		//console.log(solvedBoard);
		return;
	}
	if(sc==9){
		solveSudokuHelper(t,sr+1,0);
		return;
	}
	if(t[sr][sc]!=0){
		solveSudokuHelper(t,sr,sc+1);
		return;
	}

	for(var i=1;i<=9;i++){
		if(isPossible(t,sr,sc,i)){
			t[sr][sc] = i;
			solveSudokuHelper(t,sr,sc+1);
			t[sr][sc] = 0;
		}
	}
}

function solveSudoku(){
	solveSudokuHelper(solved,0,0);
}