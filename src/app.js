
   function autorun()
   {
    console.log("Autorun")
    /*load settings file*/ 




    const shell = require('shelljs');
    const fs = require('fs');
    const os = require ('os');
    const uinfo = os.userInfo().homedir;
    const path = require('path');
    const { clipboard } = require('electron')
    const keyCodes = {
        V: 86,
    }


    


    const dlibrands= ['Oddset','Youbet','Swush','Tips','eOddset','Dantoto','Casino','Livecasino','TivoliCasino','Spillehjørnet','Bingo','Poker','eCom','Intern','DS'];
    const dlicolor = ['#003e99','#00b5ad','#00d283','#009a60','#003e99','#dc5f11','#a78952','#294b4b','#806D3B','#7d96b4','#A0d323','#000000','#999999','#9ae5e4','#004b32'];
    
    
    const dlobrands= ['Lotto','Eurojackpot','alt eller indet','vikinglotto','keno','quick','DLO-på-tværs','Intern','DS'];
    const dlocolors= ['#c50005', '#910006','#191339','#0000ff','#00a5eb','#7f4488','#c50005','#9ae5e4','#004b32']  
    
    
    let btnwrap = document.querySelector('.card-depth');
    

    function createMarkup(brand,color) {
        return `<div class="card-btn" data-brand="${brand}">
        <div class="dot" style="background-color:${color};" ></div>
        <p>${brand}</p><input type="checkbox" class="check" title="Inkluder PSD template" name="psd" value="template">
        </div>`
    };
    


    
    let i = 0;
    for (;dlibrands[i];) {
        btnwrap.innerHTML+=createMarkup(dlibrands[i],dlicolor[i])
        i++;
      }



    console.log("woopa")
    
    const card = document.querySelector('.card');
    const settingbar = document.querySelector('.setting-bar>svg');
    
    const save=document.querySelector('.save')

    const cardbtn = document.querySelectorAll('.card-btn');


    function clickRotate() {
        
      card.classList.toggle('rotated');
    }
    settingbar.addEventListener('click', clickRotate);
    save.addEventListener('click', clickRotate);


    for (let i = 0; i < cardbtn.length; i++) {
        
        cardbtn[i].addEventListener("mouseenter", function( event ) { 
            let dot=cardbtn[i].childNodes[1];  
            gsap.to(cardbtn[i], {duration: 0.2,scale: 0.95});

            gsap.to(dot, {duration: 0.4,x:"2px",scale: 1.5});
            
        });
        
        cardbtn[i].addEventListener("mouseleave", function( event ) { 
            let dot=cardbtn[i].childNodes[1];
            gsap.to(cardbtn[i], {duration: 0.2,scale: 1});

            gsap.to(dot, {duration: 0.6,x:"0px",scale: 1});
        });

    

        cardbtn[i].addEventListener("click", function( e ) { 
            e.stopPropagation();
       
            let targ=e.target;
           
            console.log(targ) 
                
            if(targ.className=='card-btn'){
               
                const targbrand=targ.getAttribute('data-brand')
                const upath=uinfo; 
                
                const basepath=upath+'/desktop/'+targbrand
               
                let work=basepath+'/Arbejdsfiler/'; 
                let proof=basepath+'./Godkendt/';
                let assets=basepath+'./Assets/';
                
                 const thedir=work+proof+assets;
                    //shell.openItem(basepath)
                 
                 
                   // shell.mkdir('-p',folder,work,proof,assets);
                }else{
                        console.log('dumb fuck')
            }    

        });
    };
  


function getthedate(){

    let now = new Date();
    let day = date.format(now, 'DD'); 
    let month = date.format(now, 'MM_MMMM'); 
    let mm = date.format(now, 'MM'); 
    let year = date.format(now, 'Y'); 

    return '/'+month+'/'+day+'_'+mm+'_'+year;
}
                 

}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;




