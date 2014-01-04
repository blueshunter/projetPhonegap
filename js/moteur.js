

/*******variables globales relatives a la gestion des evenements *******/

var ex1=["C∆","Dm7","Em7 (9b)","F∆ (11#)","G7","Am7 (13b)","BØ"];
var ex2=["Cm7","DØ","Eb∆","Fm7","Gm7","Ab∆","Bb7"];
var ex3=["Cm∆ (13b)","DØ (13♮)","Eb∆ (5#)","Fm7 (11#)","G7 (9b 13b)","Ab∆ (9#)","B°7 (alt)"];
var ex4=["Cm∆","Dm7 (9b 11#)","Eb∆ (5# 11#)","F7 (7b 11#)","G7 (13b)","AØ (9♮)","BØ (alt)"];

var g1=new Grille("ex1",ex1.slice());


var autoIncrement; // pour la transposition automatique
var iChord=null;
var accordActuel=null;
var noteIndex=0;
var ID;
var BPM;
var freq;
var isStopped;
var paramExo;
var barValue;
var menuGrille;
var alt;
var noteAccord;
var mode;

/******************************************************************************/
/*          Gestion des évenements                                            */
/******************************************************************************/


/*
document.addEventListener("deviceready", function()
{
       //alert("phonegap bind");
       init();
});
*/
init();

function init()
{
    
    if(localStorage.grille==null){window.localStorage.setItem("sound","off");}
    if(localStorage.mode==null){window.localStorage.setItem("mode","asc");}
    if(localStorage.grille==null){window.localStorage.setItem("grille",0);}
    if(localStorage.exercice==null){window.localStorage.setItem("exercice",0);}
    if(localStorage.config==null){window.localStorage.setItem("config",false);}
    if(window.localStorage.tone==null){window.localStorage.setItem("tone",999);}
    if(localStorage.mode=="alt"){alt=true;mode="asc"}else{alt=false;mode=localStorage.mode;}
    

    autoIncrement=-1;
    barValue=0;
    paramExo=0;
    noteIndex=0;
    iChord=null;
    isStopped= true;
    document.getElementById("bar").value=0;
    choix();
    next();

    
    
    
}


function progress()
{
    if (barValue<100)
    {
        barValue++;
    }
    else
    {
        barValue=0;
        
        next();
    }
    document.getElementById("value").style.width=barValue+"%";
}

function reset()
{
    iChord=null;
    document.getElementById("bar").value=0;
}

function choix()
{
    if(window.localStorage.tone==999)
    {
        notes.change(auto[autoIncrement]);
    }
    else
    {
          notes.change(window.localStorage.tone);  
    }
    
    
    var str="";
    for(var i = 0;i<16;i++)
    {
       str +=" "+notes.index(i).getNom();
    }
 
    console.log("referentiel initialisé: "+str);
    
    menuGrille=localStorage.grille;
    menuGrille++;
    menuGrille--;
    
    if(localStorage.exercice!=null)
    {
        paramExo=localStorage.exercice;
        paramExo++;
        paramExo--;
        
    }
    
    else
    {
        window.localStorage.setItem("exercice",0);
        paramExo=localStorage.exercice;
        paramExo++;
        paramExo--;
    }

    //alert(menuSelect[localStorage.tone]);
    switch(menuGrille)
    {
        
        case 0:
            g1.change("ex1",ex1.slice());
            break;
        case 1:
            g1.change("ex2",ex2.slice());
            break;
        case 2:
             g1.change("ex3",ex3.slice());
            break;
        case 3:
             g1.change("ex3",ex4.slice());
            break;
        default:
             g1.change("ex4",ex1.slice());
            break;
            
    }
    
    
}



function starter()
{
    if(localStorage.mode=="alt"){alt=true;mode="asc"}else{alt=false;mode=localStorage.mode;}//update mode
    if(localStorage.config==true)
    {
        document.getElementById("bar").value=0;
        barValue;
        init();
        reset();
        localStorage.config==false;
        
    }
    choix();
    
    if(isStopped)
    {

        if(mode=="asc"){document.getElementById("starter").style.backgroundImage="url('img/play_pause_up.png')";}
        else{document.getElementById("starter").style.backgroundImage="url('img/play_pause_down.png')";}
        
        if(localStorage.bpm==null)
        {
            freq = (4*(60000/BPM))/100;
        }
        else
        {
            
            BPM=localStorage.bpm;
            freq = (4*(60000/BPM))/100;
        }

        
        ID = setInterval("progress();", freq);
        
        
        
    }
    else
    {
        document.getElementById("starter").style.backgroundImage="url('img/play_pause.png')";
        clearInterval(ID);
    }
    isStopped = !isStopped;
    
}




function next()
{

    
    if(alt == true)
    {
        if(mode=="asc"){mode="desc";}
        else{mode="asc";}
    }
    
    if(isStopped==false)
    {
        if(mode=="asc"){document.getElementById("starter").style.backgroundImage="url('img/play_pause_up.png')";}
        else{document.getElementById("starter").style.backgroundImage="url('img/play_pause_down.png')";}
    }
    noteIndex=0;
    document.getElementById("chord").style.color="white";
    if(iChord==null)
    {
        iChord=0;
    }
    else
    {
        iChord++
    }
    
    console.log("Debug : fonction next => index="+iChord+"of "+g1.getLength());
    if(iChord==0)
    {
        if(autoIncrement<auto.length-1)
        {
            autoIncrement++;
        }
        else
        {
            autoIncrement=0;
        }
        choix();//on change la grille dans si mode auto
        accordActuel = g1.index(iChord);
    	document.getElementById("prec").innerHTML="-";
        document.getElementById("chord").innerHTML=g1.index(iChord).getNom();
        document.getElementById("suiv").innerHTML=g1.index(iChord+1).getNom();
        
    }
    else if(iChord>=g1.getLength()-1)
    {
        accordActuel = g1.index(iChord);
        document.getElementById("prec").innerHTML=g1.index(iChord-1).getNom();
        console.log("test: "+g1.index(iChord).getNotes());
        document.getElementById("chord").innerHTML=g1.index(iChord).getNom();
        document.getElementById("suiv").innerHTML="-";
        
        iChord=null; 
        //fin de la séquence
    }
    else
    {
    	accordActuel = g1.index(iChord);
        document.getElementById("prec").innerHTML=g1.index(iChord-1).getNom();
        document.getElementById("chord").innerHTML=g1.index(iChord).getNom();
        document.getElementById("suiv").innerHTML=g1.index(iChord+1).getNom();
        
        
    }
    noteAccord = accordActuel;
    //noteAccord.getNotes();
}


function push(inter)
{

    var hT=0;
    
    var sequence;
    
    switch(paramExo)
    {
        case 0 : sequence = [0];break;
        case 1 : sequence = [2];break;
        case 2 : sequence = [4];break;
        case 3 : sequence = [6];break;
        case 4 : if(mode=="asc"){sequence = [0,2,4];}else{sequence = [4,2,0];}break;
        case 5 : if(mode=="asc"){sequence = [0,2,4,6];}else{sequence = [6,4,2,0];}break;
        case 6 : if(mode=="asc"){sequence = [0,2,4,6,1,3,5];}else{sequence = [5,3,1,6,4,2,0];}break;
        case 7 : if(mode=="asc"){sequence = [0,1,2,3,4,5,6];}else{sequence = [6,5,4,3,2,1,0];}break;
        default: sequence = [0];
            
            
    }
    //alert("note: "+noteAccord.index(sequence[noteIndex]).getNom());
    
    var hIntervalle = noteAccord.index(sequence[noteIndex]).getEcart();
    
    if(window.localStorage.tone==999)
    {
        hT = menuSelect[auto[autoIncrement]]+(noteAccord.tonique.getNumero()-1);
    }
    else
    {
       hT = menuSelect[localStorage.tone]+(noteAccord.tonique.getNumero()-1); 
    }
   
    
    
    var hNote = hT + hIntervalle;
    if(hNote>=6)
    {
        hNote-=6;
    }
    
    console.log(hNote+"---"+inter);
    console.log(noteAccord.getNotes());
    
    if(inter==hNote)
    {
        document.getElementById("chord").style.color="green";
        noteIndex++;
    }
    else
    {
        document.getElementById("chord").style.color="red";
    }
    if(noteIndex>=sequence.length)
    {
        noteIndex=0;
    }
    
    
}

function endPush()
{
    
    document.getElementById("chord").style.color="white";
    
}


