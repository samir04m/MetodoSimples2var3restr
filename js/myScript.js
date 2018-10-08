$(document).ready(function(){

    $('select').material_select();

    $( "button#btn-run" ).on( "click",  calcular);

    $("#zx1").val("-8");
    $("#zx2").val("-10");
    $("#f1x1").val("2");
    $("#f1x2").val("3");
    $("#s1").val("1");
    $("#f1r").val("600");
    $("#f2x1").val("2");
    $("#f2x2").val("1");
    $("#s2").val("1");
    $("#f2r").val("500");
    $("#f3x1").val("0");
    $("#f3x2").val("4");
    $("#s3").val("1");
    $("#f3r").val("600");

});
var tabla = [4][7];
var rs = [4], col_r = 6;
var columna_pivote, fila_pivote, elemento_pivote;

function calcular(){
    var select = $('select#select').val();
    definirTabla();
    mostarTabla();

    if (select == 1){
        console.log("Vamos a maximizar");
        // var zx1 = tabla[0][1];
        // var zx2 = tabla[0][2];
        // if (zx1 < 0 || zx2 < 0){
            // if (zx1 > zx2) columna_pivote = 2;
            // else columna_pivote = 1;

        for(;;){

            if (buscarColumnaPivote() != -1){
                columna_pivote = buscarColumnaPivote();
                console.log("la columna pivote es ", columna_pivote);
                maximizar();

            }else{
                console.log("fin del proceso");
                mostarTabla();
                break;
            }
        }

        // }

    }
    if (select == 2){
        console.log("Vamos a minimizar");
    }
}

function buscarColumnaPivote(){
    var menor = 99999999, pos=-1;
    for (c=0; c<7; c++){
        if (tabla[0][c] < 0){
            if (tabla[0][c] < menor){
                menor = tabla[0][c];
                pos = c;
            }
        }
    }
    return pos;
}

function maximizar(){
    for (i=1; i<4; i++){
        if (tabla[i][columna_pivote] > 0){
            rs[i] = tabla[i][col_r]/tabla[i][columna_pivote];
        }else{
            rs[i] = 0;
        }
        console.log("rs ", rs[i]);
    }
    var menor = 99999999, pos;
    for (i=1; i<4; i++){
        if (rs[i] < menor && rs[i] != 0){
            menor = rs[i];
            pos = i;
        }
    }
    console.log("el menor es ", rs[pos]," en la fila", pos);
    fila_pivote = pos;
    elemento_pivote = tabla[fila_pivote][columna_pivote];
    console.log("elemento_pivote ", elemento_pivote);

    if (elemento_pivote != 1){
        mult = 1/elemento_pivote;
        console.log("multiplicador en fila pivote ", mult);
        for (c=1; c<7; c++){
            tabla[fila_pivote][c] *= mult;
        }
        mostarTabla();
    }

    for (f=0; f<4; f++){
        if (tabla[f][columna_pivote] != 0 && f != fila_pivote){
            var valor = tabla[f][columna_pivote] *(-1);
            for (c=0; c<7; c++){
                result = valor *tabla[fila_pivote][c] + tabla[f][c];
                tabla[f][c] = result;
            }
        }
    }
    mostarTabla();
    // evaluar();
}

function definirTabla() {
    var zx1 = parseInt($("#zx1").val());
    var zx2 = parseInt($("#zx2").val());

    var f1x1 = parseInt($("#f1x1").val());
    var f1x2 = parseInt($("#f1x2").val());
    var s1 = parseInt($("#s1").val());
    var f1r = parseInt($("#f1r").val());

    var f2x1 = parseInt($("#f2x1").val());
    var f2x2 = parseInt($("#f2x2").val());
    var s2 = parseInt($("#s2").val());
    var f2r = parseInt($("#f2r").val());

    var f3x1 = parseInt($("#f3x1").val());
    var f3x2 = parseInt($("#f3x2").val());
    var s3 = parseInt($("#s3").val());
    var f3r = parseInt($("#f3r").val());

    tabla = [[1, zx1, zx2, 0, 0, 0, 0],
             [0, f1x1, f1x2, s1, 0, 0, f1r],
             [0, f2x1, f2x2, 0, s2, 0, f2r],
             [0, f3x1, f3x2, 0, 0, s3, f3r]];

}

function mostarTabla(){
    for (i=0; i<4; i++){
            console.log(tabla[i][0],tabla[i][1], tabla[i][2], tabla[i][3], tabla[i][4], tabla[i][5],tabla[i][6]);
    }
}
