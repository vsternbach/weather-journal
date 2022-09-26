/* Global Variables */
const baseURL = '/openweatherapi?zip='
// Create a new date instance dynamically with JS
const d = new Date();
const date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', async ()=> {
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    try {
        const {name, temp} = await getWeather(baseURL, zip);
        await postWeather('/post', {name, temp, date, feeling});
        await updateUI();
    } catch (e) {
        console.log(e);
    }
});

//get weather
const getWeather = async (baseURL, zip) => {
    const res = await fetch(`${baseURL + zip}`)
    try{
        const {main, name} = await res.json();
        return({temp: main.temp, name});
    }
    catch(error){
        console.log("error",error);
    }
}

//postWeather method to send to the server
const postWeather = async (url, data = {})=>{
    const res = await fetch(url, {
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    });
    try {
        await res.json();
    }
    catch(error){
        console.log("error", error);
    }
}

//update the ui after receiving response from the server
const updateUI = async ()=> {
    const res = await fetch('/get');
    try{
        const {date, feeling, name, temp} = await res.json();
        document.getElementById('date').textContent = date;
        document.getElementById('temp').textContent = temp;
        document.getElementById('city').textContent = name;
        document.getElementById('content').textContent = feeling;
    }
    catch(error){
        console.log("error", error);
    }
}