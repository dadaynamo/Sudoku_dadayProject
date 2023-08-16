class Quadrante{
    MAX_RIGHE;
    MAX_COLONNE;
    nQuadranti;
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
                    console.log("schema testino"+schematest);
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
        this.renderHTML();
        this.setInGame(false);
        this.inPause(false);
    }
    debugConsole(){
        //serie di console log
        console.log("This.schema");
        console.log(this.schema);
    }
    nascondiSchema(){
        const canvas = document.getElementById("canvas");
        if(this.inGame==true){
            canvas.setAttribute("style", "background-color: rgba(76, 81, 71, 0.4);");
            this.inGame=false;
        }else{
            canvas.setAttribute("style", "background-color: white;");
            this.inGame=true;
        }
        
    }
}

/*gen quadrante nuovo */
const quadrante = new Quadrante();

const schema = [
    ["1","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","3","","","",""],
    ["5","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""]
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
    quadrante.svuotaSchema();
});

btnPlay.addEventListener("click", (e)=>{
    console.log(e.target);
    quadrante.caricaSchema(schema);

});

btnPause.addEventListener("click",(e)=>{
    console.log(e.target);
    quadrante.nascondiSchema();
});


btnConsole.addEventListener("click",(e)=>{
    console.log(e.target);
    quadrante.debugConsole();
});



/*



    svuotaSchema(){
        this.schema = [];
        for(var i=0 ; i<this.MAX_RIGHE; i++){
            for(var j=0; j<this.MAX_COLONNE; j++){
                var str = `${i}`+`${j}`;
                const cell = document.getElementById(str);
                const span = cell.querySelectorAll("span");
                if (span.length > 0) {
                    span[0].textContent = "";
                }
            }

        }
    
    }

    caricaSchema(){
       // console.log("ciao");
        this.svuotaSchema();
        
        this.schema=JSON.parse(localStorage.getItem("schema"));
       
        //console.log("test");
        //console.log(this.schema);
        this.renderSchema();
        this.selectAllCells();
        this.setInGame(true);
    }

    selectAllCells(){
       // console.log(this.schema);
        var schematest = this.schema;
        console.log("schemate"+schematest);
       //console.log("schema test"+schematest);
        for(let i=0 ; i<this.MAX_RIGHE; i++){
            for(let j=0; j<this.MAX_COLONNE; j++){
                var str = `${i}`+`${j}`;
                const cell = document.getElementById(str);
                const span = cell.querySelectorAll("span");

                span[0].addEventListener("dblclick",(e)=>{
                    span[0].contentEditable = true;
                });

                
                // Imposta gli attributi personalizzati dataset
                span[0].dataset.i = i;
                span[0].dataset.j = j;

                span[0].addEventListener("blur", function (e) {
                    var textModified = span[0].textContent;
                    console.log(e.target);
                    console.log("i=" + e.target.dataset.i);
                    console.log("j=" + e.target.dataset.j);
                    
                    //carico valore nuovo in schema
                    this.schema[e.target.dataset.i][e.target.dataset.j] = textModified;
                    console.log("schema testino"+schematest);
                });

                //console.log(cell);
            }

        }
    }

    renderSchema(){
        for(var i=0 ; i<this.MAX_RIGHE; i++){
            for(var j=0; j<this.MAX_COLONNE; j++){
                var str = `${i}`+`${j}`;
                const cell = document.getElementById(str);
                const span = cell.querySelectorAll("span");
                if (span.length > 0) {
                    span[0].textContent = this.schema[i][j];
                }
                console.log(this.schema[i][j]);
                
            }

        }
    }

    setInGame(value){
        if(value == true) this.inGame = true;
        if(value == false) this.inGame = false;
    }
    setInPause(value){
        if(value == true) this.inPause = true;
        if(value == false) this.inPause = false;
    }

    nascondiSchema(){
        const canvas = document.getElementById("canvas");
        if(this.inGame==true){
            canvas.setAttribute("style", "background-color: rgba(76, 81, 71, 0.4);");
            this.inGame=false;
        }else{
            canvas.setAttribute("style", "background-color: white;");
            this.inGame=true;
        }
        
    }

    debugConsole(){
        console.log("inGame "+this.inGame);
        console.log("schema ");
        console.log(this.schema);
        console.log("MAX RIGHE "+this.MAX_RIGHE);
        console.log("MAX COL "+this.MAX_COLONNE);
        console.log("nQuadranti "+this.nQuadranti);
        
    }









*/