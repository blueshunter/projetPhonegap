// alterations par tonalité

var ref = new Array();
ref=
[
    
    ["C","Db","D","D#","Eb","E","F","F#","Gb","G","G#","Ab","A","Bbb","Bb","B"],
    ["C#","D","	D#","D##","E","E#","F#","F##","G","G#","G##","A","A#","Bb","B","B#"],
    ["Db","Ebb","Eb","E","Fb","F","Gb","G","Abb","Ab","A","Bbb","Bb","Cbb","Cb","C"],
    ["D","Eb","E","E#","F","F#","G","G#","Ab","A","A#","Bb","B","Cb","C","C#"], 
    ["D#","E","E#","E###","F#","F##","G#","G##","A","A#","A##","B","B#","C","C#","C##"],
    ["Eb","Fb","F","F#","Gb","G","Ab","A","Bbb","Bb","B","Cb","C","Dbb","Db","D"],
    ["E","F","F#","F##","G","G#","A","A#","Bb","B","B#","C","C#","Db","D","D#"],
    ["E#","F#","F##","F###","G#","G##","A#","A##","B","B#","B##","C#","C##","D","D#","D##"],
    ["Fb","Gbb","Gb","G","Abb","Ab","Bbb","Bb","Cbb","Cb","C","Dbb","Db","Ebbb","Ebb","Eb"],
    ["F","Gb","G","G#","Ab","A","Bb","B","Cb","C","C#","Db","D","Ebb","Eb","E"],
    ["F#","G","G#","G##","A","A#","B","B#","C","C#","C##","D","D#","Eb","E","E#"],
    ["Gb","Abb","Ab","A","Bbb","Bb","Cb","C","Dbb","Db","D","Ebb","Eb","Fbb","Fb","F"],
    ["G","Ab","A","A#","Bb","B","C","C#","Db","D","D#","Eb","E","Fb","F","F#"],
    ["G#","A","A#","A##","B","B#","C#","C##","D","D#","D##","E","E#","F","F#","F##"],
    ["Ab","Bbb","Bb","B","Cb","C","Db","D","Ebb","Eb","E","Fb","F","Gbb","Gb","G"],
    ["A","Bb","B","B#","C","C#","D","D#","Eb","E","E#","F","F#","Gb","G","G#"],
    ["A#","B","B#","B##","C#","C##","D#","D##","E","E#","E###","F#","F##","G","G#","G##"],
    ["Bb","Cb","C","C#","Db","D","Eb","E","Fb","F","F#","Gb","G","Abb","Ab","A"],
    ["B","C","C#","C##","D","D#","E","E#","F","F#","F##","G","G#","Ab","A","A#"],
    ["B#","C#","C##","C###","D#","D##","E#","E###","F#","F##","F###","G#","G##","A","A#","A##"],
    ["Cb","Dbb","Db","D","Ebb","Eb","Fb","F","Gbb","Gb","G","Abb","Ab","Bbbb","Bbb","Bb"]

];

var ecart =[1,1.5,2,2.5,2.5,3,3.5,4,4,4.5,5,5,5.5,5.5,6,6.5];
var menuSelect=[0,0.5,0.5,1,1.5,1.5,2,2.5,2,2.5,3,3,3.5,4,4,4.5,5,5,5.5,6,5.5];
var auto =[0,12,3,15,6,18,10,1,0,9,17,5,14,2,11,20];

/******************************************************************************/
// modèles
/******************************************************************************/



function Note(nomNote,numeroNote)
{
    this.nom = nomNote;
    this.numero = numeroNote;
}

Note.prototype.getNom = function()
{
    return this.nom;
}

Note.prototype.getNumero = function()
{
    return this.numero;
}

/**************************/
function Intervalle(nomNote,nb)
{
    this.nom = nomNote;
    this.ecart = nb;
}

Intervalle.prototype.getNom = function()
{
    return this.nom;
}

Intervalle.prototype.getEcart = function()
{
    return this.ecart;
}

/**************************/

function refNote(index)
{
    this.tabNote = new Array(16);
    if(index===undefined)
    {
       console.log("reference nulle: "+index); 
       index=0;
    }
    else
    {
        console.log("ref: "+index);
    }
    
    for(var m=0;m<=16;m++)
    {
        this.tabNote[m] = new Note(ref[index][m],ecart[m]);
    }
    
}

refNote.prototype.change = function(index)
{
    this.tabNote = new Array(16);
    if(index===undefined)
    {
       console.log("reference nulle: "+index); 
       index=0;
    }
    else
    {
        console.log("ref: "+index);
    }
    
    for(var m=0;m<=16;m++)
    {
        this.tabNote[m] = new Note(ref[index][m],ecart[m]);
    }
}

refNote.prototype.getNumeroByNom = function(nomNote)
{
    var str="XX6";
    for(var i = 0; i<this.tabNote.length;i++)
    {
        if(this.tabNote[i].getNom()==nomNote)
        {
            str=this.tabNote[i].getNumero();
        }
    }
    return str;
}

refNote.prototype.getNomByNumero = function(numero)
{
    var str="XX7";

    for(var i = 0; i<this.tabNote.length;i++)
    {
        if(this.tabNote[i].getNumero()==numero)
        {
            
            str=this.tabNote[i].getNom();
        }
    }
    return str;
}

refNote.prototype.getNomsByNumero = function(numero)
{
    var str= new Array();
    var index=0;
    for(var i = 0; i<this.tabNote.length;i++)
    {
        if(this.tabNote[i].getNumero()==numero)
        {
            str[index]=this.tabNote[i].getNom();
            index++
        }
    }
    return str.slice();
}

refNote.prototype.tirerUneNoteAuHasard = function()
{
    var nb = Math.floor((Math.random()*this.tabNote.length));
    return this.tabNote[nb];

}

refNote.prototype.getNote=function(nomNote)
{
    for(var i = 0; i<this.tabNote.length;i++)
    {
        if(this.tabNote[i].getNom()==nomNote)
        {
            return this.tabNote[i];
        }
    }
    return -1;
}

refNote.prototype.index=function(i)
{
    if(i<this.tabNote.length)
    {
        return this.tabNote[i];
    }
    else
    {
        console.log("dépassement de tableau : classe refNote");
        return -1;
    }
}

refNote.prototype.getLength=function()
{
    return this.tabNote.length;
}

/**************************/

function refIntervalle()
{
    this.tab = new Array();
    this.t = new Array();
    
    this.tab[0]= new Intervalle("l'unisson",0);
    this.tab[1]= new Intervalle("la seconde mineure",0.5);
    this.tab[2]= new Intervalle("la seconde majeure",1);
    this.tab[3]= new Intervalle("la seconde augmentee",1.5);
    this.tab[4]= new Intervalle("la tierce mineure",1.5);
    this.tab[5]= new Intervalle("la tierce majeure",2);
    this.tab[6]= new Intervalle("la quarte juste",2.5);
    this.tab[7]= new Intervalle("la quarte augmentee",3);
    this.tab[8]= new Intervalle("la quinte diminuee",3);
    this. tab[9]= new Intervalle("la quinte juste",3.5);
    this.tab[10]= new Intervalle("la quinte augmentee",4);
    this. tab[11]= new Intervalle("la sixte mineur",4);
    this.tab[12]= new Intervalle("la sixte majeure",4.5);
    this.tab[13]= new Intervalle("la septieme diminuee",4.5);
    this.tab[14]= new Intervalle("la septieme mineure",5);
    this.tab[15]= new Intervalle("la septieme majeure",5.5);

    
    this.t=["1","2m","2M","2+","3m","3M","4j","4+","5-","5j","5+","6m","6M","7-","7m","7M"];
    
    
    this.getNumeroByNom = function(nomNote)
    {
        var str="XX1";
        for(var i = 0; i<tab.length;i++)
        {
            if(tab[i].getNom()==nomNote)
            {
                str=tab[i].getEcart();
            }
        }
        return str;
    }
    
    this.getNomByEcart = function(numero)
    {
        var str="XX2";
        for(var i = 0; i<tab.length;i++)
        {
            if(tab[i].getEcart()==numero)
            {
                str=tab[i].getNom();
            }
        }
        return str;
    }
    
    this.getEcartByMacro = function(macro)
    {
        var str="XX3";
        for(var i = 0; i<this.t.length;i++)
        {
            if(this.t[i]==macro)
            {
                str=this.tab[i].getEcart();
            }
        }
        return str;
    }
    
    this.getMacroByNom=function(macro)
    {
        var str="XX0";
        for(var i = 0; i<this.tab.length;i++)
        {
            //console.log("test"+this.tab[i].getNom());
            if(this.tab[i].getNom()==macro)
            {
                str=this.t[i];
            }
        }
        return str;
    }
    
    
    //retourne un intervalle en fonction de l'acronyme
    this.get = function(macro)
    {
        var str="XX4";
        for(var i = 0; i<this.t.length;i++)
        {
            if(this.t[i]==macro)
            {
                
                str= this.tab[i];
            }
        }
        return str;
    }
    
    this.tirerUnIntervalleAuHasard = function()
    {
        var nb = Math.floor((Math.random()*this.tab.length));
        return this.tab[nb];
        
    }
    
}
/**************************/


/******************************************************************************/
/*          Variables globales*/
/******************************************************************************/
var notes = new refNote(0);
var Inter = new refIntervalle();

/************** Ensemble ************/


function Ensemble(nom,tabIntervalle)
{
    if(nom===undefined&&tabIntervalle==undefined)
    {
        this.tonique=null;
        this.nomAccord=null;
        this.tab=null;
        
    }
    else
    {
        this.nomAccord=nom;
        
        this.tab = new Array();
        for(var i=0;i<tabIntervalle.length;i++)
        {
            this.tab[i]=Inter.get(tabIntervalle[i]); // on récupère l'intervalle en fonction du macro
        }
        
        this.tonique=null;
    }
    
}

Ensemble.prototype.copy = function(obj)
{
    this.nomAccord=obj.nomAccord;
    this.tab=obj.tab;
    this.tonique=null;
   
}

Ensemble.prototype.root = function(nom)
{
    
    this.tonique = notes.getNote(nom);
    console.log("debug function root:"+this.tonique.getNom()+"--"+this.tonique.getNumero()+"tons");
}

Ensemble.prototype.getNom = function()
{
    if(this.tonique==null)
    {
        return this.nomAccord;
    }
    else
    {
        return (this.tonique.getNom() + this.nomAccord);
    }
}

Ensemble.prototype.index = function(index)
{
    return this.tab[index];
}

Ensemble.prototype.getNoteByMacro=function(macro)
{
    var nomNote="XX5";
    var note = new refNote();
    var num;
    
    for(var i=0;i<this.tab.length;i++)
    {
        if(this.tab[i]===Inter.get(macro))//on cherche un intervalle en fonction de sa macro ex:2M
        {
            
            num = Inter.getEcartByMacro(macro);// ecart en demi-tons
            
            num +=+this.tonique.getNumero();
            if(num>=7)
            {
                num-=6;
            }
            
            // il faut recupérer la bonne note en fonction de la tonalité
            nomNote= note.getNomByNumero(num);// on recupere la note
        }
    }
    return nomNote;
    
}

Ensemble.prototype.getLength=function()
{
    return this.tab.length;
}



Ensemble.prototype.getNotes=function()
{
    var notePrec="";
    var noteExist=false;
    var i=0;
    if(this.tonique!=null)
    {
        var tmp = new Array();
        for(i=0;i<this.tab.length;i++)
        {
            
            
            var num = this.tab[i].getEcart();
            
            num=num+this.tonique.getNumero();
            if(num>=7)
            {
                num-=6;
            }

            
            var tabTmp = new Array();
            tabTmp = notes.getNomsByNumero(num);
            

            
            //console.log(tabTmp);
            var macro = Inter.getMacroByNom(this.tab[i].getNom());
            
            console.log("getNotes => macro: "+macro+" - notes :"+tabTmp.toString());
            //console.log(tabTmp[0][0]+"----"+notePrec[0]);
            
            if((tabTmp.length>1&&tmp[0]!==undefined)) // enharmonie
            {
                for(var j=0;j<tmp.length;j++)
                {
                    //console.log("tmp["+i+"] = "+tmp[i]);
                    if(tmp[j][0]===tabTmp[0][0])
                    {
                        noteExist=true; //
                    }
                }
                if(noteExist===true)
                {
                    tmp[i]= tabTmp[1];
                }
                else
                {
                    tmp[i]= tabTmp[0];
                }
            }
            else // cas ou il n'y a qu'une note
            {
                tmp[i]= tabTmp[0];
            }
        }
        console.log("get Notes function: "+tmp.toString());
        return tmp;
    }
    else
    {
        return "*error ! la tonique n'est pas initialisée"    ;
    }
}

//this.t=["1","2m","2M","2+","3m","3M","4j","4+","5-","5j","5+","6m","6M","7-","7m","7M","8","9m","9M","9+","10m","10M","11","11+","12-","12","12+","13m","13M","14-","14","14+"];
/************ Grille **************/
var Accord = new Array();
Accord[0] = new Ensemble("∆ (5# 11#)",      ["1","2M","3M","4+","5+","6M","7M"]); //lydien #5
Accord[1] = new Ensemble("7 (7b 11#)",      ["1","2M","3M","4+","5j","6M","7m"]); //lydien b7
Accord[2] = new Ensemble("∆ (11#)",         ["1","2M","3M","4+","5j","6M","7M"]); //lydien #11
Accord[3] = new Ensemble("∆ (9#)",          ["1","2+","3M","4+","5j","6M","7M"]); //lydien #9
Accord[4] = new Ensemble("∆ (5#)",          ["1","2M","3M","4j","5+","6M","7M"]);   //ionien #5
Accord[5] = new Ensemble("∆",               ["1","2M","3M","4j","5j","6M","7M"]);   //ionien

Accord[6] = new Ensemble("m∆ (13b)",        ["1","2M","3m","4j","5j","6m","7M"]);   //mineur harmonique
Accord[7] = new Ensemble("m∆",              ["1","2M","3m","4j","5j","6M","7M"]);   //mineur mélodique
Accord[8] = new Ensemble("m69",             ["1","2M","3m","4j","5j","6M","7M"]);   //mineur mélodique

Accord[9]  = new Ensemble("m7 (9b 11#)",     ["1","2m","3m","4j","5j","6M","7m"]);// dorien 9b
Accord[10] = new Ensemble("m7 (13b)",        ["1","2M","3m","4j","5j","6m","7m"]);//Aeolien
Accord[11] = new Ensemble("m7 (11#)",        ["1","2M","3m","4+","5j","6M","7m"]);//Dorien
Accord[12] = new Ensemble("m7 (9b)",         ["1","2m","3m","4j","5j","6m","7m"]);//Phrygien
Accord[13] = new Ensemble("m7 (5b)",         ["1","2m","3m","4j","5-","6m","7m"]);// locrien
Accord[14] = new Ensemble("m7",              ["1","2M","3m","4j","5j","6M","7m"]);//Dorien

Accord[15] = new Ensemble("7 (9b 13b)",      ["1","2m","3M","4j","5j","6m","7m"]);//myxolindien
Accord[16] = new Ensemble("7 (13b)",           ["1","2M","3M","4j","5j","6m","7m"]);//myxolindien b9 b13
Accord[17] = new Ensemble("7",               ["1","2M","3M","4j","5j","6M","7m"]);//myxolindien


Accord[18] = new Ensemble("Ø (13♮)",         ["1","2m","3M","4j","5j","6M","7M"]);   //locrien
Accord[19] = new Ensemble("Ø (9♮)",          ["1","2M","3m","4j","5-","6m","7M"]);   //locrien

Accord[20] = new Ensemble("Ø (alt)",          ["1","2m","2+","3M","5-","6m","7m"]);   //alteré
Accord[21] = new Ensemble("°7 (alt)",         ["1","2m","2+","3M","5-","6m","7-"]);  //alteré bb7

Accord[22] = new Ensemble("Ø",                ["1","2m","3m","4j","5-","6m","7m"]);   //locrien

function Grille(nom,Accords)
{
    this.nom = nom;
    this.tab = new Array();
    if(Accords!= null)
    {
        for(var i = 0;i<Accords.length;i++) // pour tous les accords de la grille
        {
            var isCouleur = false;
            for(var j = 0;j<Accord.length;j++)
            {
                //console.log(Accords[i]+"--"+Accord[j].getNom());
                if(Accords[i].search(Accord[j].getNom())!=-1) // affectation l'accord
                {
                    isCouleur=true;
                    Accords[i]= Accords[i].substring(0,Accords[i].search(Accord[j].getNom()));
                    this.tab[i]=new Ensemble();
                    this.tab[i].copy(Accord[j]);
                    var isTonique = false
                    for(var k = 0;k<notes.getLength();k++) // affectation de la tonique
                    {
                        
                        if(Accords[i].search(notes.index(k).getNom())!=-1)
                        {
                            //console.log(" root note: "+notes.index(k).getNom());
                            this.tab[i].root(notes.index(k).getNom());
                            isTonique=true;
                            
                        }
                        
                    }
                    if(isTonique!==true)
                    {
                        console.log("la tonique n'a pas été trouvée");
                    }
                    
                    
                }
                
            }
            if(isCouleur!==true)
            {
                console.log("La couleur de l'accord n'a pas été trouvée");
            }
            else
            {
                console.log("debug réussi: ");
            }
        }
    }
}



Grille.prototype.getLength=function()
{
    return this.tab.length;
}

Grille.prototype.nom=function()
{
    return this.nom;
}

Grille.prototype.index=function(i)
{
    return this.tab[i];
}

Grille.prototype.getChords=function()
{
    var str="["+this.nom+"]\n";
    for(var i = 0;i<this.tab.length;i++)
    {
        str=str+"["+this.tab[i].getNom()+"]"+this.tab[i].getNotes()+"\n";
    }
    
    return str;
}



//**********************************************************//
//
// changer le nom de chaque accord + la tonique
//
//**********************************************************//

Grille.prototype.change = function(nom,Acc)
{
    this.Cref = new refNote(0);
    this.nom = nom;

    this.tab = new Array();
    var tonique;
    var noteFounded; // lorsque la tonique est trouvée
    var founded; // lorsque la qualité de l'accord est trouvée
    var hauteur;
    var notePrec=null;
    
    if(Acc!= null)
    {
        for(var i = 0;i<Acc.length;i++) // pour tous les accords de la grille
        {
            noteFounded=false;
            founded = false;
            var qualite="";
            var tonique="";
            
            
            for(var j = 0;(founded!=true)||(j<Accord.length);j++)
            {
                //console.log(Acc.toString());
                //console.log("Acc["+i+"]"+Acc[i]);
                //console.log("Accord["+j+"] = "+Accord[j].getNom());
                
                
                if(Acc[i][1]=="b"||Acc[i][1]=="#")
                {
                    qualite= Acc[i].substring(2,Acc[i].length);
                    tonique= Acc[i].substring(0,2);
                }
                else
                {
                     qualite= Acc[i].substring(1,Acc[i].length);
                     tonique= Acc[i].substring(0,1);
                }
                
                if(qualite===Accord[j].getNom())
                {
                    console.log("qualité: "+Accord[j].getNom())
                    console.log("tonique: "+tonique);
                    founded=true;
                    this.tab[i]=new Ensemble();
                    this.tab[i].copy(Accord[j]); // on affecter la qualité de l'accord
                    

     
                    for(var k = 0;k<this.Cref.getLength();k++) // affectation de la tonique
                    {
                        if(tonique==this.Cref.index(k).getNom())
                        {
                              hauteur = this.Cref.index(k).getNumero();
                              //console.log("hauteur initiale: "+hauteur);
                        }

                    }

                    if(hauteur>=7) hauteur=hauteur-6;

                    //console.log("hauteur transposée: "+hauteur);

                    for(var k = 0;k<notes.getLength();k++) // affectation de la tonique
                    {
                        if(hauteur==notes.index(k).getNumero())
                        {

                              tonique = notes.index(k).getNom();
                              
                              if(notePrec!=null)
                              {
                                 if(tonique[0]!=notePrec[0]&&noteFounded==false)
                                 {
                                     notePrec= tonique;
                                     this.tab[i].root(notes.index(k).getNom());
                                     console.log("transposition: "+tonique);
                                     noteFounded=true;
                                 }
                              }
                              else
                              {
                                  notePrec= tonique;
                                  this.tab[i].root(notes.index(k).getNom());
                                  console.log("transposition: "+tonique);
                              }
                              
                              
                              
                        }


                    }
                    
                 
                    
                    
                    
                    
                }//if
                 
            }//for
            
            
            
                    

        }
    }
    console.log("end point changeTone function :")
}



