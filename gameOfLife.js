var grid;
var cols;
var rows;
var cell_size = 10;  

function setup() {
  createCanvas(5000,5000);
  cols = width/cell_size;
  rows = height/cell_size; 
  
  grid = make2DArray(cols,rows);
  fill2DArray();
  //console.table(grid);
//  drawCells();
}

function make2DArray(cols,rows){
  var arr = new Array(cols);
  for(var i = 0; i < cols ; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

function fill2DArray(){
  for(var i=0 ; i<cols ; i++){
    for(var j=0 ; j<rows ; j++){
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(255);
  drawCells();
  grid = nextGeneration();
}

function drawCells(){
  for(var i=0 ; i<cols ; i++){
    for(var j=0 ; j<rows ; j++){
        var x = i*cell_size;
        var y = j*cell_size;
        if(grid[i][j] == 1){
          //noStroke();
          fill(0);
          rect(x,y,cell_size,cell_size);
        }
        else{
          //noStroke();
          fill(255);
          rect(x,y,cell_size,cell_size);  
        }
      }
    }
  }

  function nextGeneration(){
    for(var i=0 ; i<cols ; i++){
      for(var j=0 ; j<rows ; j++){
        //alert(grid[0][0]);
        grid[i][j] = evaluate(grid,i,j);
      }
    }
    return grid;
  }
  
  function evaluate(arr,x,y){
    var sum = 0;
    for(var i=-1 ; i<2 ; i++){
      for(var j=-1 ; j<2 ; j++){
        if(x!=0 && y!=0){
          var x_pos = (x+i+cols)%cols;
          var y_pos = (y+j+rows)%rows;
          sum += arr[x_pos][y_pos];
        }
      }
    }
    var state = arr[x][y];
    if (state == 0 && sum == 3) {
      return 1;
    } else if (state == 1 && (sum < 2 || sum > 3)) {
      return 0;
    } else {
      return state;
    }
  }