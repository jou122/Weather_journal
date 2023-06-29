// Global Variables 
const apiKey = "&appid=cc0debdedfa8cae3d179de4158c88b3a&units=metric";//the api key we got from the 
const server = "http://localhost:4000/";//local server we are runnig on
const apiURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";//the url of the api of the openweathermap website

const entryHolderArea = document.getElementById('entryHolder');//getting the text area of displaying data
const zipField = document.getElementById('zip');//getting the zip input field component then use it to get the value
const feelingField = document.getElementById('feelings');//getting the feeling input field component then use it to get the value 


let data = {//creating data object 
    zipCode: zipField.value,//getting the zip code entered by the user
    content: feelingField.value,//getting the fellings entered by the user
    date: new Date()//date object created when the user press generate
};



//using async js to fetch weather data from the web jornal api using fetch 
//and converting the returned date from the fetch to json file for easy mainpulation 
const fetchWeather = async(zipCode) => {
    const res =await fetch(apiURL+zipCode+apiKey);//fetching the data
     try{
         const weather_Json = await res.json();//converting the data into json format
         data.temp=weather_Json.list[0].main.temp;//getting the temp from the body and posting it into our data object
            return weather_Json;
            console.log("fetchweather"+weather_Json.content);
  }
  catch(error) {
    console.log("error", error);// appropriately handle the error
   
  }
}



//posting the data to our local server
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log("postData"+projectData);
      
      return newData
    }catch(error) {
    console.log("error", error);// appropriately handle the error
    }
}


//getting the data back from the our local server
const getAll= async()=> {
    const response = await fetch(server+'getAll');
    try{
      const projectData=  await response.json();
      console.log("getAll"+projectData);
      return projectData;
}catch(error){console.error(error);
}}




//update ui element 
const updateUI=()=>{
    document.getElementById('temp').innerHTML = Math.round(data.temp)+ ' degrees';
 document.getElementById('content').innerHTML = data.content; 
document.getElementById("date").innerHTML =data.date;;
console.log("updateUI"+data);
}


//our main function which will be run on clicking
const mainFun=async()=> {
    if (isNaN(zipField.value))
    {
        alert("Not a Number");
        zipField.value='';
    }
    else if ( zipField.value==='')
    {
        alert("can't be blank");
    }
    else{
         data = {
            zipCode: zipField.value,
            content: feelingField.value,
            date: new Date()
        };

        fetchWeather(data.zipCode)
            .then(postData(server+'postData',data))
            .then(getAll())
            .then(updateUI)
    }
};
//event listner for our button
document.getElementById('generate').addEventListener('click', mainFun);








