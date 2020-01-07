
   function autorun()
   {


    const dlibrands= [' Oddset',' Youbet',' Swush',' Tips',' eOddset',' Dantoto','Casino','Livecasino','TivoliCasino','Spillehjørnet','Bingo','Poker','eCom','Intern','DS'];
    const dlicolor = ['#003e99','#00b5ad','#00d283','#009a60','#003e99','#dc5f11','#a78952','#294b4b','#806D3B','#7d96b4','#A0d323','#000000','#999999','#9ae5e4','#004b32'];
    
    
    const dlobrands= ['Lotto','Eurojackpot','alt eller indet','vikinglotto','keno','quick','eCom','Intern','DS'];
    const dlocolors= ['']  
    
    
    let btnwrap = document.querySelector('.card-depth');
    

    function createMarkup(brand,color) {
        return `<div class="card-btn" data-brand="${brand}">
        <div class="dot" style="background-color:${color};" ></div>
        <p>${brand}</p>
        </div>
        `
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
           gsap.to(dot, {duration: 0.4,scale: 1.4});
            
        });
        
        cardbtn[i].addEventListener("mouseleave", function( event ) { 
            let dot=cardbtn[i].childNodes[1];  
            gsap.to(dot, {duration: 0.6,scale: 1});
        });

        cardbtn[i].addEventListener("click", function( event ) { 
          
        });
    }
  



   }
   if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
   else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
   else window.onload = autorun;

