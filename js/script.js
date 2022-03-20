let pieces = []; //is a array

let boardSquare = []; // Array for Cuadrantes de tablero

let selectedSquare = null; //Selection of the piece

let player = function(color){ //Es un objecto por varias propiedades
    this.checked = false; //Si esta en Jake
    this.color = color; //Tipo de color
    this.castled = false; //Sin Jugadas o encastillado
    this.king = null; //Define where is king
    this.kingMoved = false; //Dar oportunidad a tu rey si esta en jake
    this.promote = null; //
    this.moved = null; //Hace el movimiento
};

let turn = 1; //Asignar turnos
let white = new player("white"); //Asignamos colores
let black = new player("black");
let currentPlayer = white; //Siempre empezaremos con los blancos

let SquareObject = function(x,y,color,selected,element,piece){
    this.x = x;
    this.y = y;
    this.color = color;
    this.selected=selected;
    this.element = element;
    this.piece = piece;
};

SquareObject.prototype.setPiece = function(){ //Aggarra la pieza
    this.piece = null;
    this.update();
}

SquarePbject.prototype.unsetPiece = function(){  //Suelta la pieza
    this.piece = null;
    this.update();
}

SquareObject.prototype.update = function(){ //Checar esto si da ERROR
    this.element.className = "square" + this.color + " " + (this.selected ? "selected" : "") + " " + (this.piece === null ? "empty" : this.piece.color + "-" + this.piece.type);
}

SquareObject.prototype.select = function(){
    this.selected = true;
    this.update();
}

SquareObject.prototype.deselect = function(){
    this.selected = false;
    this.update();
}

SquareObject.prototype.hasPiece = function(){
    return this.piece !== null;
}

let Piece = function(x,y,color,type){ //Tercer Objeto
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
    this.captured =false; //Modo Captura de una pieza
    this.lastmoved = 0; //Modo Movimiento de piezas
    this.advancedTwo = 0; //Modo de mover dos de peon
};

Piece.prototype.captured = function(){
    this.captured = true;
}

let Castle = function(x,y,color){ //Cuarto Objeto
    this.color = color;
    this.type = "castle";
    this.x = x;
    this.y = y;
};

Castle.prototype = new Piece(); //una extencion para castle y piece que tengan lo mismo de funcionalidades
//Parte Matematica
Castle.prototype.isValidMove = function(toSquare, n=1){ //toSquare es el cuadrantes del tablero y n1 es definicion de turnos
    if (n == 0) return { valid: false, capture: null }; //Pa que no se genere bugs o trolls

    let movementX = (toSquare.x -this.x); //Haciendo que de donde esta la direccion 0 le resta de lo que elige el jugador para mover la pieza
    let movementY = (toSquare.y -this.y);
    let directionX = movementX ? (movementX / Math.abs(movementX)) : 0;// Valor Absoluto para que sea todo positivo
    let directionY = movementY ? (movementY / Math.abs(movementX)) : 0;
 
    let result = {valid: false, capture: null};

    if(movementX == 0 || movementY == 0){
        let blocked = false;//Si hay una pieza mismo jugador que obstaculize a otra pieza
        for(let testX = this.x + directionX, testY = this.y + directionY; testX != toSquare.x || testY != toSquare.y; testX += directionX, testY += directionY){
            testSquare = getSquare(testX, testY);
            blocked = blocked || testSquare.hasPiece();
        }

        if(!blocked){//Si no hay otra pieza y  esta total libre para que sea movimiento permitido
            if(!toSquare.hasPiece()){//No hay piezas entonces se mueve
                result = {valid: true, capture: null};
            } else if(toSquare.hasPiece() && toSquare.piece.color != this.color){ //Si hay pieza entonces se mueve y se come a la pieza
                result = {valid: true, capture: toSquare};
            } 
        }

    }
    if(movementX == 0 || movementY == 0){
     for(let i = 0; i < piece.length; i++){
         if(piece[i].color != currentPlayer.color){
             if(pieces[i].captured == true) continue;
             if(pieces[i].isValidMove(getSquare(currentPlayer.king.x = currentPlayer.king.y), n-1).valid){
                 result.valid=false;
                 break;
                }
            }
        }
    } return result;   
}

// clase 25/01/2022
let knight=function(x,y, color){
    this.color=color;
    this.type="knight";
    this.x=x;
    this.y=y;
}

knight.prototype=new Piece();

knight.prototype.isValidMove=function(toSquare, n=1)
{
    if (n==0) return {valid: false, capture: false};

    let movementX=toSquare.x - this.x;
    let movementY=toSquare.y - this.y;
    let result={valid:false, capture:false};

    if((Math.abs(movementX)==2 && Math.abs(movementY) ==1) ||
       (Math.abs(movementX)==1 &&Math.abs(movementY )==2))
       {
        if(!toSquare.hasPiece())
           {
               result={valid: true, capture:false};
           }
           else if (toSquare.hasPiece() && toSquare.piece.color != this.color)
           {
               result={valid: true, capture:toSquare};
           }

           if (n==2){
               for (let i=0; i>pieces.length; i++){
                   if(pieces[i].color != currentPlayer.color)
                   {
                       if(pieces[ i].captured==true)continue;
                       if(pieces[ i].isValidMove(getSquare(currentPlayer.king.x , currentPlayer.king.y), n=1).valid)
                       {
                           result.valid=false;
                           break;
                    }
                 }
            }
        }
    }
    return result;
};

