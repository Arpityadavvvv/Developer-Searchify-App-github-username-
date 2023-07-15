const full_bg = document.querySelector(".wrapper");
const theme_change = document.querySelector(".dark-interface");
const profile_card_section = document.querySelector(".profile-card");
const loading_gif = document.querySelector("[data-loading]")
const search_bar = document.querySelector("[data-search]")
const cross_btn = document.querySelector("[data-cross]");



var count_click=0;
var user_name;

/// reseting functions 
function reset ()
{
    search_bar.value="";  // isse search bar ki value reset hojaygi 
    let myname = "Arpityadavvvv"
    fetch_profile(myname);
    profile_card_section.classList.add("active");
    loading_gif.classList.remove("active");

        //alert("Given username seems to be not proper ");
}

reset();  // ye isse automatic load hone pr laptop user ka data aajayga 
function initialiser ()
{
    
     
}

//initialiser();

function searchProfile_Now ()  // ye user name bhi lena hoga 
{
    user_name = search_bar.value;
    if(user_name !== "")
    {
        fetch_profile(user_name);
        search_bar.value="";
        console.log("The user name is = "+ user_name);
       
    }
    else{
        
        alert("bhai username to dal de ");
    }
    
   
}

async function fetch_profile (user_name)  // ye wo username hoga jiski detail fetch krni hai API call ke through 
{
   
    try
    {

    const response = await fetch(`https://api.github.com/users/${user_name}`);

    console.log('succesul fetched ')

    loading_gif.classList.add("active");

    const result = await response.json();

    console.log("succesful converted ")

    loading_gif.classList.remove("active");

    rendering_to_UI(result);

    profile_card_section.classList.add("active");

    cross_btn.classList.add("active");

    }

    catch(err)
    {
        
        cross_btn.classList.add("active");
        cross_btn.innerHTML=" network issue maybe  ";
       
        
    }

}

 async function rendering_to_UI (answer)
{

    const personal_name = document.querySelector("[data-name]");
    const joining_on = document.querySelector("[data-joinDate]");
    const user_links = document.querySelector("[data-link]");
    const user_biodata = document.querySelector("[data-bio]");
    const repos = document.querySelector("[data-repo]");
    const followers = document.querySelector("[data-follower]");
    const following = document.querySelector("[data-following]");
    const avtar = document.querySelector(".profile-pic");
   

    const location_stats = document.querySelector("[data-location]");
    const link_stats = document.querySelector("[data-next]");
    const twitter_stats = document.querySelector("[data-twitter]");
    const phone_stats = document.querySelector("[data-phone");

    personal_name.innerHTML = answer?.name;
    joining_on.innerHTML ="joined on : "+answer?.created_at;
    user_links.innerHTML = answer?.html_url;
    avtar.src = answer?.avatar_url;
    user_biodata.innerHTML = answer?.bio;
    repos.innerHTML = answer?.public_repos;
    followers.innerHTML = answer?.followers;
    following.innerHTML = answer?.following;
    location_stats.innerHTML = answer?.location;
   // link_stats.href = answer?.html_url;
    twitter_stats.innerHTML = answer?.twitter_username;
    phone_stats.innerHTML = answer?.email ;

    if(answer?.message === 'Not Found')
    {
        signal();
        profile_card_section.classList.remove("active");
       // loading_gif.classList.add("active");
       
    }

    if(answer?.twitter_username == 'null')
    {
        twitter_stats.innerHTML="Not Avilable";
    }
    else{
        twitter_stats.innerHTML = answer?.twitter_username;
    }

    if(answer?.email ==='null')
    {
        phone_stats.innerHTML="Not Avilable";
    }
    else
    {
        phone_stats.innerHTML = answer?.email;
        
    }

    if(answer?.location ==='null')
    {
        location_stats.innerHTML='Not Avilable ';

    }
    else{
        location_stats.innerHTML = answer?.location;

    }

    // if( answer?.subscriptions_url==='null')
    // {
    //     link_stats.innerHTML='Not Avilable';
    // }
    // else{
    //     link_stats.innerHTML = answer?.subscriptions_url;
    // }


}
console.log



function countClick()
{
 


    count_click++;

   if(count_click==1 || count_click%2!=0 )
   {
    full_bg.classList.add("black");
    theme_change.innerHTML="Light";
    full_bg.classList.add("red");
  
    
   }
   else  
    {
      full_bg.classList.remove("black");
      theme_change.innerHTML="Dark";
      full_bg.classList.remove("red");
   }

   
}


function signal ()
{

    alert('username is undefined ');
    reset();
    //profile_card_section.classList.remove("active");
    

   

}


