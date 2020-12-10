document.addEventListener("DOMContentLoaded", getData);

//when doc is loaded page starts and gets data from wordpress
async function getData() {
    console.log("getData");

    //get data from json link: https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/
    const linkFP = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/pages/30";
    const responsFP = await fetch(linkFP);
    const jsonFP = await responsFP.json();

    //show front page with json as a parameter
    show(jsonFP);
}

//show front page and insert wordpress-data in right places
async function show(data) {
    console.log("show");

    //splash image as background in splash
    document.querySelector(".splash").style.backgroundImage = "url(" + data.splash.guid + ")";

    //title in h1
    document.querySelector("h1").innerHTML = data.title.rendered;
    //description in p
    document.querySelector("p").innerHTML = data.content.rendered;
}
