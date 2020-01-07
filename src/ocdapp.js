const path = require('path');
const date = require('date-and-time');
const os = require('os');
const { shell } = require('electron')
const shelljs = require('shelljs');
const currentWeekNumber = require('current-week-number');
const fs = require('fs');
const { app } = require('electron')
const { ipcRenderer } = require('electron');
const { clipboard} = require('electron')
const keyCodes = {
    V: 86,
}

function autorun() {


    function loadsettings(settingsPath) {

        fs.stat(settingsPath, function (err, stat) {
            if (err == null) {
                console.log('File exists ');
                readsettings(settingsPath)
            } else if (err.code === 'ENOENT') {
                console.log('file does not existbe bum eater-making it');
                showsettings(settingsPath)
            } else {
                console.log('Some other error: ', err.code);
            }
        });

    };


    function showsettings(settingsPath) {

        const card = document.querySelector('.card');
        card.classList.toggle('rotated');

        const save = document.querySelector('.save');
        const quitit = document.querySelector('.quitit');
       
        quitit.addEventListener("click", function (e) {
            ipcRenderer.send('request-mainprocess-action', 'wuub');
       
        })

        save.addEventListener("click", function (e) {
           
            const cbox = document.querySelectorAll('.checkbox');

            createsettings(settingsPath, cbox)

            card.classList.toggle('rotated');
        })

      




    }





    //create settings from settings input
    function createsettings(settingsPath, cbox) {

        const settingsObj = {};

        var elements = Array.prototype.slice.call(cbox);

        elements.forEach((el) => {
            if (el.type == "checkbox") {
               
                settingsObj[el.name] = el.checked;
            }
        });

        const settingsjson = JSON.stringify(settingsObj);
        writesettings(settingsPath, settingsjson)
    }


    function writesettings(settingsPath, settingsjson) {

        fs.writeFile(settingsPath, settingsjson, function (err) {
            // If an error occurred, show it and return
            if (err) return console.error(err);
            // Successfully wrote to the file!
            readsettings(settingsPath)
        });

    }




    function readsettings(settingsPath) {


        fs.readFile(settingsPath, (err, data) => {
            if (err) throw err;
            let settings = JSON.parse(data);

            buildui(settings)
        });

        console.log('This is after the read call');
    }



    function buildui(settings) {

        let brandjson = path.join(__dirname + '/brand.json');

        fs.readFile(brandjson, (err, data) => {
            if (err) throw err;
            
            let brands = JSON.parse(data);
            let cloudstorrage;

            if(settings.GoogleDrive == true){
                cloudstorrage ='Google Drive'
            }
            if(settings.Dropbox == true){
                cloudstorrage ='Dropbox'
            }
            if(settings.OneDriveDanskeSpil== true){
                cloudstorrage ='OneDrive - DanskeSpil'
            }
            if(settings.Mega == true){
                cloudstorrage ='Mega'
            }

           

            if (settings.DLI == true) {
                brands.DLI
                makehtml(brands.DLI, 'DLI',cloudstorrage)
            }
            if (settings.DLO == true) {

                makehtml(brands.DLO, 'DLO',cloudstorrage)
            }

            if (settings.DLI == false ||settings.DLO == true) {
                showsettings(settingsPath)
            }
            


        });




        const btnwrap = document.querySelector('.card-depth');

        function createMarkup(brand, color, dlidlo, shortname,cloudstorrage) {
            return `<div class="card-btn" data-brand="${brand}" data-dlidlo="${dlidlo}" data-short="${shortname}" data-cloud="${cloudstorrage}">
        <div class="dot" style="background-color:${color};" ></div>
        <p>${brand}</p> 
        </div>`
        };
//to do : select templates
/*<!-- <input type="checkbox" class="psdcheck" title="Inkluder PSD template" name="PSD" value="template"> <input type="checkbox" class="wwwcheck" title="Inkluder WWW template" name="WWW" value="template">*/
       

function makehtml(brands, dlidlo,cloudstorrage) {
            btnwrap.innerHTML = '';

            for (var key in brands) {

                let value = brands[key];
                
                let shortbrand = key.split("_")
                console.log(shortbrand[1])

                if (dlidlo == 'DLI') {
                    
                    btnwrap.innerHTML += createMarkup(shortbrand[0], value, dlidlo, shortbrand[1],cloudstorrage)
                } else {
                    btnwrap.innerHTML += createMarkup(shortbrand[0], value, dlidlo, '_',cloudstorrage)
                }

            }

            uifunctions()
        }

     

    }


    function uifunctions() {

        const card = document.querySelector('.card');
        const cardbtn = document.querySelectorAll('.card-btn');
        const settingbar = document.querySelector('.setting-bar>svg');
        const save = document.querySelector('.save');

        function flipflop(e) {

            if (e.target.classList.value == 'save') {

                const cbox = document.querySelectorAll('.checkbox');
                createsettings(settingsPath, cbox)

                gsap.to(card, { duration: 0.2, rotationY: 0, transformOrigin: "50% 50%", ease: "back.out(3)" });
            } else {
             
                showsettings(settingsPath)
                gsap.to(card, { duration: 0.2, rotationY: 180, transformOrigin: "50% 50%", ease: "back.out(3)" });
            }
        }

        function menter(e) {
            let targ = e.target;
            let dot = targ.childNodes[1];
            gsap.to(targ, { duration: 0.2, scale: 0.95 });
            gsap.to(dot, { duration: 0.4, x: "-2px", scale: 1.5 });
        }
        function mleave(e) {
            let targ = e.target;
            let dot = targ.childNodes[1];
            gsap.to(targ, { duration: 0.2, scale: 1 });
            gsap.to(dot, { duration: 0.6, x: "0px", scale: 1 });
        }
        function mclick(e) {
            //One click directory
            let brandname = e.target.getAttribute("data-brand")
            let brandovner = e.target.getAttribute("data-dlidlo")
            let shortbrand = e.target.getAttribute("data-short")
            let cloud = e.target.getAttribute("data-cloud")
            let jobname= document.querySelector('.jobname');

            if(jobname.value==' '){
                return
            }else{
                ocd(brandname, brandovner, shortbrand,cloud)
            }

           
        }


        cardbtn.forEach(addmlistener);
        function addmlistener(item, index) {
            item.addEventListener("mouseenter", menter, false);
            item.addEventListener("mouseleave", mleave, false);
            item.addEventListener("click", mclick, false);
        }

        settingbar.addEventListener("click", flipflop, false);
        save.addEventListener("click", flipflop, false);


    }

    function ocd(brand, ovner,shortbrand,cloud) {
   
        const userbase = os.homedir();
        const basedir = userbase + "/"+cloud+"/" + ovner + "/";

        let jobname= document.querySelector('.jobname');
        let jobnameVAl=jobname.value;

        let jobnameVAl1 = jobnameVAl.split("-").join("_");
        let jobnameVAl2 = jobnameVAl1.split(" ").join("_");

        let folder=basedir+brand+'/'+getthedate()+'_'+ovner+'_'+shortbrand+'_'+jobnameVAl2;

            let work=folder+'/Arbejdsfiler/'; 
            let proof=folder+'/Godkendt';
            let assets=folder+'/Assets';
           
            if(jobnameVAl !=''){
                shelljs.mkdir('-p',folder,work,proof,assets);
                shell.openItem(folder)

                jobnameVAl='';
                jobname.value='';
            }
    }


    function getthedate() {

        let now = new Date();
        let day = date.format(now, 'DD');
        let month = date.format(now, 'MM_MMMM');
        let mm = date.format(now, 'MM');
        let year = date.format(now, 'Y');

        return '/' + month + '/' + day + '_' + mm + '_' + year;
    }



    let settingsPath = path.join(__dirname + '/settings.json');

        loadsettings(settingsPath)
    }

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;