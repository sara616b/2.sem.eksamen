document.addEventListener("DOMContentLoaded", getData);
const template = document.querySelector("template");

//when doc is loaded page starts and gets data from wordpress
async function getData() {
    console.log("getData");

    //get data from json link: https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/
    const linkFP = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/pages/32";
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

    //get data from about-info-posts
    const linkAI = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/about-info";
    const responsAI = await fetch(linkAI);
    const jsonAI = await responsAI.json();

    //add info from the four posts
    jsonAI.forEach((post) => {
        const klon = template.cloneNode(true).content;

        //add titles to h2 in template
        klon.querySelector("h2").textContent = post.title.rendered;
        //add post content to div in template
        klon.querySelector("div").innerHTML = post.content.rendered;
        //add the post as a child to the about-section
        document.querySelector("#about").appendChild(klon);
    })

}
