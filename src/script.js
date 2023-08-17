class Quadrante{
    MAX_RIGHE;
    MAX_COLONNE;
    nSettore;
    schema;
    inGame;
    inPause;

    constructor(){
        this.MAX_COLONNE = 9;
        this.MAX_RIGHE = 9;
        this.nQuadranti = 9;
        this.schema = [];
        this.inGame = false;
        this.inPause = false;
        this.emptytoArraylist();
        this.renderHTML();
        this.gestCells();
    }
    setEditable(value){
        if(value == true){
            for(let i=0 ; i<this.MAX_RIGHE; i++){
                for(let j=0; j<this.MAX_COLONNE; j++){
                    
                    var str = `${i}`+`${j}`;
                    const cell = document.getElementById(str);
                    const span = cell.querySelectorAll("span");
                    const self = this; // Conserva il riferimento all'oggetto della classe
    
                    span[0].addEventListener("dblclick",(e)=>{
                        span[0].contentEditable = true;
                    });
                }
            }
        }else if(value == false){
            for(let i=0 ; i<this.MAX_RIGHE; i++){
                for(let j=0; j<this.MAX_COLONNE; j++){
                    
                    var str = `${i}`+`${j}`;
                    const cell = document.getElementById(str);
                    const span = cell.querySelectorAll("span");
                    const self = this; // Conserva il riferimento all'oggetto della classe
    
                    span[0].removeEventListener("dblclick",(e)=>{
                        span[0].contentEditable = true;
                    }); 
                }
            }
        }else{
            console.log("Errore inserimento value!! Riprova...");
        }
    }
    emptytoArraylist(){
        if(this.schema.length == 0){
            for(var i=0; i<this.MAX_RIGHE; i++){
                var riga = [];
                for(var j=0; j<this.MAX_COLONNE; j++){
                    riga.splice(j,0,"");
                }
                this.schema.splice(i,0,riga);
            }
        }
    }
    renderHTML(){
        if(this.schema.length != 0){
            for(var i=0 ; i<this.MAX_RIGHE; i++){
                for(var j=0; j<this.MAX_COLONNE; j++){
                    var str = `${i}`+`${j}`;
                    const cell = document.getElementById(str);
                    const span = cell.querySelectorAll("span");
                    if (span.length > 0) {
                        if(this.schema[i][j] == "") span[0].textContent = "."; 
                        else span[0].textContent = this.schema[i][j];
                    }
                }

            }
        }
    }
    setInSchema(i,j,value){
        this.schema[i][j] = value;
        console.log("Aggiunto ");
        console.log(this.schema);
    }
    getInSchema(i,j){
        console.log(this.schema[i][j]);
        return this.schema[i][j];
    }
    deleteInSchema(i,j){
        this.schema[i][j] = "";
        console.log("Eliminato ");
        console.log(this.schema);
    }
    svuotaSchema(){
        //svuoto tutta la variabile schema
        this.schema = [];
        console.log(this.schema);
    }
    caricaSchema(schema){
        //carico tutto uno schema nella variabile schema
        this.schema = schema;
        console.log(this.schema);
        this.renderHTML();
    }
    gestCells(){
        //attribuisco a ogni cella html la possibilità di essere modificata
        //console.log(this.schema);
        
        let schematest = this.schema;
        //console.log(schematest);
        
        

        for(let i=0 ; i<this.MAX_RIGHE; i++){
            for(let j=0; j<this.MAX_COLONNE; j++){
                
                var str = `${i}`+`${j}`;
                const cell = document.getElementById(str);
                const span = cell.querySelectorAll("span");
                const self = this; // Conserva il riferimento all'oggetto della classe

                span[0].addEventListener("dblclick",(e)=>{
                    span[0].contentEditable = true;
                });


                // Imposta gli attributi personalizzati dataset
                span[0].dataset.i = i;
                span[0].dataset.j = j;

                span[0].addEventListener("blur", function (e) {
                    var textModified = span[0].textContent;
                    console.log(textModified);
                    console.log("i=" + e.target.dataset.i);
                    console.log("j=" + e.target.dataset.j);
                    console.log(this.schematest);
                    //carico valore nuovo in schema
                    schematest[e.target.dataset.i][e.target.dataset.j] = textModified;
                    self.setInSchema(e.target.dataset.i,e.target.dataset.j,textModified);
                    console.log("schema testino"+schematest);
                    self.checkNumber(i,j);
                });
            }

        }
    }
    setInGame(value){
        //gest inGame
        if(value == true && this.inGame == false) this.inGame = value;
        if(value == false && this.inGame == true) this.inGame = value;   
    }
    setInPause(value){
        //gest inPause
        if(value == true && this.inPause == false) this.inPause = value;
        if(value == false && this.inPause == true) this.inPause = value;
    }
    play(schema){
        this.caricaSchema(schema);
        this.setInGame(true);
        this.renderHTML();

    }
    reset(){
        //per il pulsante reset
        this.svuotaSchema();
        this.emptytoArraylist();
        this.renderHTML();
        this.setInGame(false);
        this.setInPause(false);
    }
    debugConsole(){
        //serie di console log
        console.log("This.schema");
        console.log(this.schema);
    }
    nascondiSchema(){
        const canvas = document.getElementById("canvas");
        if(this.inGame==true){
            if(this.inPause == false){
                canvas.setAttribute("style", "background-color: rgba(76, 81, 71, 0.4);");
                this.setInPause(true);
                this.setEditable(false);
            }
            else{
                canvas.setAttribute("style", "background-color: white;");
                this.setInPause(false);
            }
           
      
            
        }
        
    }
    //meccaniche di gioco
    getNSettore(riga,colonna){
        if(riga>=0 && riga<=2 && colonna>=0 && colonna<=2){ return 0;}
        else if(riga>=0 && riga<=2 && colonna>=3 && colonna<=5){ return 1;}
        else if(riga>=0 && riga<=2 && colonna>=6 && colonna<=8){ return 2;}
        else if(riga>=3 && riga<=5 && colonna>=0 && colonna<=2){ return 3;}
        else if(riga>=3 && riga<=5 && colonna>=3 && colonna<=5){ return 4;}
        else if(riga>=3 && riga<=5 && colonna>=6 && colonna<=8){ return 5;}
        else if(riga>=6 && riga<=8 && colonna>=0 && colonna<=2){ return 6;}
        else if(riga>=6 && riga<=8 && colonna>=3 && colonna<=5){ return 7;}
        else if(riga>=6 && riga<=8 && colonna>=6 && colonna<=8){ return 8;}
    }
    checkRiga(riga,colonna){
        console.log("elementi stessa riga di "+riga+" "+colonna);
        for(var i=0; i<this.MAX_COLONNE; i++){
            if(this.schema[riga][colonna] == this.schema[riga][i] && i != colonna)
                return true;
        }
        return false;
    }
    checkColonna(riga,colonna){
        console.log("elementi stessa riga di "+riga+" "+colonna);
        for(var i=0 ; i<this.MAX_RIGHE;i++){
            if(this.schema[riga][colonna] == this.schema[i][colonna] && i != riga)
                return true;
        }
        return false;
    }
    checkSettore(riga,colonna){
        var settore = this.getNSettore(riga,colonna);
      
        console.log("cella "+riga+":"+colonna+" = "+this.schema[riga][colonna]);
        console.log("settore= "+settore);
        //numeri nel settore
        for(var i=0; i<this.MAX_RIGHE; i++){
            for(var j=0;j<this.MAX_COLONNE;j++){
                //console.log(this.schema[i][j]);
                if(this.getNSettore(i,j) == settore){
                    //valori nel quadrante di riga colonna
                    if(riga == i && colonna == j){
                        console.log("valore identico");
                    }else{
                        if(this.schema[riga][colonna] == this.schema[i][j]){
                            console.log("match in "+i+" "+j);
                            return true;
                        }
                    }
                }

                }
            }
        return false;
        
    }
    checkNumber(riga,colonna){
        if(this.checkRiga(riga,colonna) == true || this.checkColonna(riga,colonna) == true || this.checkSettore(riga,colonna) == true){
            this.schema[riga][colonna] = "";
            var str = `${riga}`+`${colonna}`;
            console.log(str);
            const cell = document.getElementById(str);
            console.log(cell);
            const span = cell.getElementsByTagName("span");
            console.log(span[0]);
            span[0].textContent = ".";
            console.log("ciasc");
        }else{
            console.log("Tutto ok!!");
        }
    }
}

/*gen quadrante nuovo */
const quadrante = new Quadrante();

const schema = [
    [ "1" , "" , "" , "" , "" , "" , "" , "2" , "" ],
    [ "" , "" , "3" , "" , "" , "" , "" , "" , "" ],
    [ "" , "" , "" , "" , "" , "" , "" , "" , "" ],
    [ "" , "" , "" , "" , "" , "" , "" , "8" , "" ],
    [ "" , "" , "" , "" , "1" , "5" , "" , "" , "" ],
    [ "" , "" , "" , "" , "" , "" , "" , "" , "" ],
    [ "" , "1" , "" , "" , "" , "" , "" , "" , "" ],
    [ "" , "" , "" , "" , "" , "" , "4" , "" , "" ],
    [ "" , "" , "" , "" , "" , "" , "" , "" , "3" ]
]; 

//localStorage.setItem("schema",JSON.stringify(schema));



/*btn html selection */
const btnPlay = document.getElementById('btnPlay');
const btnReset = document.getElementById('btnReset');
const btnPause = document.getElementById('btnPause');
const btnConsole = document.getElementById('btnConsole');

/*event listener di bottoni */
btnReset.addEventListener("click", (e)=>{
    console.log(e.target);
    quadrante.reset();
});

btnPlay.addEventListener("click", (e)=>{
    console.log(e.target);
    quadrante.play(schema);

});

btnPause.addEventListener("click",(e)=>{
    console.log(e.target);
    if(quadrante.inGame == true){
        quadrante.nascondiSchema();
    }
    
});


btnConsole.addEventListener("click",(e)=>{
    console.log(e.target);
    quadrante.debugConsole();
});



/*
gest cell generale
     gestCells(){
        //attribuisco a ogni cella html la possibilità di essere modificata
        //console.log(this.schema);
        
        let schematest = this.schema;
        //console.log(schematest);
        
        

        for(let i=0 ; i<this.MAX_RIGHE; i++){
            for(let j=0; j<this.MAX_COLONNE; j++){
                
                var str = `${i}`+`${j}`;
                const cell = document.getElementById(str);
                const span = cell.querySelectorAll("span");
                const self = this; // Conserva il riferimento all'oggetto della classe

                span[0].addEventListener("dblclick",(e)=>{
                    span[0].contentEditable = true;
                });


                // Imposta gli attributi personalizzati dataset
                span[0].dataset.i = i;
                span[0].dataset.j = j;

                span[0].addEventListener("blur", function (e) {
                    var textModified = span[0].textContent;
                    console.log(textModified);
                    console.log("i=" + e.target.dataset.i);
                    console.log("j=" + e.target.dataset.j);
                    console.log(this.schematest);
                    //carico valore nuovo in schema
                    schematest[e.target.dataset.i][e.target.dataset.j] = textModified;
                    self.setInSchema(e.target.dataset.i,e.target.dataset.j,textModified);
                    console.log("schema testino"+schematest);
                    self.checkNumber(i,j);
                });
            }

        }
    }

*/