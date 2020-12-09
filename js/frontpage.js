document.addEventListener("DOMContentLoaded", getData);

//variables
let template = document.querySelector("template");
let container = document.querySelector("#container");

//when doc is loaded page starts and gets data from wordpress
async function getData() {
    console.log("getData");

    //get data from json link: https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/
    const linkFP = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/pages/28";
    const responsFP = await fetch(linkFP);
    const jsonFP = await responsFP.json();

    //show front page with json as a parameter
    show(jsonFP);
}

//show front page and insert wordpress-data in right places
async function show(data) {
    console.log("show");

    //title in h1
    document.querySelector("h1").innerHTML = data.title.rendered;
    //content in p
    document.querySelector("#intro p").innerHTML = data.content.rendered;

    //get json data for the front page elements
    const linkEl = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/forsideelement";
    const responsEl = await fetch(linkEl);
    const jsonEl = await responsEl.json();

    //forEach-loop for the front page section elements
    jsonEl.forEach((section) => {
        console.log("forEach loop start");
        //cloning template
        const klon = template.cloneNode(true).content;
        //inserting data in clone
        klon.querySelector("h2").textContent = section.title.rendered;
        klon.querySelector("p").innerHTML = section.description;

        //adding klon with content to container
        container.appendChild(klon);
        console.log("appendChild");
    });

}
