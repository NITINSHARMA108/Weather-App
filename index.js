
// fetching open weather api
async function callOpenWeatherApi(city){
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3a6eabd1c4ef82c1dd11a55f735dc19`,{mode:'cors'});
        const data=await response.json();
        
        /*const giphy=await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=AynZFA3KdzNOTVPKa0s5DbI2FCBE66vW&s=${data.weather[0].main} season`);
        const giphyURL=await giphy.json();*/
        const l=getrgb();
        let temperature=(((data.main.temp-273.15)*9/5)+32).toFixed(2);
        document.querySelector('.container').style.backgroundColor=`rgb(${l[0]},${l[1]},${l[2]})`;
        document.querySelector('.loader').style.display='none';
        return [temperature,data.name,data.sys.country];
    }
    catch(err){
        console.log(err);
        document.querySelector('.loader').style.display='none';
        return 0;

    }
}

//get background-color value
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

//getting input city name from user
async function getDatafromUser(){
    const input=document.getElementById('cityname').value;
    console.log(input);
    if(input=='')
    {
        window.alert('Please fill city name');
        return;
    }
    document.getElementById('number').innerHTML="";
    document.getElementById('deg').innerHTML='';
    document.getElementById('unit').innerHTML='';
    document.getElementById('city').innerHTML='';
    document.getElementById('country').innerHTML='';
    document.querySelector('.loader').style.display='block';
    const result=await callOpenWeatherApi(input);
    if(result)
    {    
        document.getElementById('number').innerHTML=result[0];
        document.getElementById('deg').innerHTML='&deg;';
        document.getElementById('unit').innerHTML='F';
        document.getElementById('city').innerHTML=result[1];
        document.getElementById('country').innerHTML=result[2];
    }
    else{
        console.log('invalid city name');
        document.getElementById('number').innerHTML='-';
        document.getElementById('deg').innerHTML='&deg;';
        document.getElementById('unit').innerHTML='F';
    }
}

//on pressing search button
document.getElementById('searchbutton').addEventListener('click',async function(){
    //if(document.getElementById)
    
    await getDatafromUser();
});

// convert to fahrenheit
document.getElementById('tofahrenheit').addEventListener('click',function(){
    let temp=document.getElementById('number').innerHTML;
    try
    {
        if(temp==='-')
        {
            throw new Error();
        }
        if(document.getElementById('unit').innerHTML=='F')
        {
            document.getElementById('number').innerHTML=temp;
        }
        else{
            document.getElementById('number').innerHTML=`${((Number(temp)*9/5)+32).toFixed(2)}`;
            document.getElementById('unit').innerHTML='F';
        }
        
    }
    catch(err){
        console.log(err);
        window.alert('operation invalid');
        return;
    }
    
});

//convert to celcius
document.getElementById('tocelcius').addEventListener('click',function(){
    let temp=document.getElementById('number').innerHTML;
    console.log('in celcius');
    try{
    if(temp==='-')
        {
            throw new Error();
        }
    if(document.getElementById('unit').innerHTML=='C')
    {
        document.getElementById('number').innerHTML=temp;
    }
    else{
        document.getElementById('number').innerHTML=`${((Number(temp)-32)*5/9).toFixed(2)}`;
        document.getElementById('unit').innerHTML='C';
    }
    }
    catch(err){
        window.alert('operation invalid');
        return;
    }
})

//let giphyURL=`https://api.giphy.com/v1/gifs/translate?api_key=AynZFA3KdzNOTVPKa0s5DbI2FCBE66vW&s=${character}`;