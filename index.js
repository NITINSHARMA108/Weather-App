async function callOpenWeatherApi(city){
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3a6eabd1c4ef82c1dd11a55f735dc19`,{mode:'cors'});
        const data=await response.json();
        console.log('line 5 '+data.main.temp);
        console.log('line 6'+data.weather[0].main);
        /*const giphy=await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=AynZFA3KdzNOTVPKa0s5DbI2FCBE66vW&s=${data.weather[0].main} season`);
        const giphyURL=await giphy.json();*/
        const l=getrgb();
        document.querySelector('.container').style.backgroundColor=`rgb(${l[0]},${l[1]},${l[2]})`;
        document.querySelector('.loader').style.display='none';
        return data.main.temp;
    }
    catch(err){
        console.log(err);
        document.querySelector('.loader').style.display='none';
        return 0;

    }
}
function getrgb(){
    let r=Math.floor(Math.random()*256);
    let g=Math.floor(Math.random()*256);
    let b=Math.floor(Math.random()*256);
    if(r!=g && g!=b)
    {
        return [r,g,b];
    }
    else{
        getrgb();
    }

}

async function getDatafromUser(){
    const input=document.getElementById('cityname').value;
    console.log(input);
    const result=await callOpenWeatherApi(input);
    if(result)
    {    
        document.getElementById('number').innerHTML=result;
        document.getElementById('deg').innerHTML='&deg;';
        document.getElementById('unit').innerHTML='F';
    }
    else{
        console.log('invalid city name');
        document.getElementById('number').innerHTML='0';
        document.getElementById('deg').innerHTML='&deg;';
        document.getElementById('unit').innerHTML='F';
    }
}

document.getElementById('searchbutton').addEventListener('click',async function(){
    document.getElementById('number').innerHTML="";
    document.getElementById('deg').innerHTML='';
    document.getElementById('unit').innerHTML='';
    document.querySelector('.loader').style.display='block';
    await getDatafromUser();
});

document.getElementById('tofahrenheit').addEventListener('click',function(){
    let temp=document.getElementById('number').innerHTML;
    if(document.getElementById('unit').innerHTML=='F')
    {
        document.getElementById('number').innerHTML=temp;
    }
    else{
        document.getElementById('number').innerHTML=`${(Number(temp)+273.15).toFixed(2)}`;
        document.getElementById('unit').innerHTML='F';
    }
});

document.getElementById('tocelcius').addEventListener('click',function(){
    let temp=document.getElementById('number').innerHTML;
    console.log('in celcius');
    if(document.getElementById('unit').innerHTML=='C')
    {
        document.getElementById('number').innerHTML=temp;
    }
    else{
        document.getElementById('number').innerHTML=`${(Number(temp)-273.15).toFixed(2)}`;
        document.getElementById('unit').innerHTML='C';
    }
})

//let giphyURL=`https://api.giphy.com/v1/gifs/translate?api_key=AynZFA3KdzNOTVPKa0s5DbI2FCBE66vW&s=${character}`;