document.addEventListener("DOMContentLoaded", getData);

//variables
let template = document.querySelector("#tempFP");
let container = document.querySelector("#container");
let templateContent = document.querySelector("#content_temp");

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

    //featured image as background in splash
    //document.querySelector(".splash").style.backgroundImage = "url(" + data.splash.guid + ")";
    document.querySelector("video").src = "assets/BG_video.mp4";
    document.querySelector("video").play();
    document.querySelector("video").playbackRate = 0.7;

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
        klon.querySelector("p").innerHTML = section.description + "<br>" + section.content.rendered;
        klon.querySelector("section").id = section.slug + "sec";
        klon.querySelector(".content").id = section.slug;

        //adding klon with content to container
        container.appendChild(klon);
        console.log("appendChild");

        //add content according to which element it is
        addContentFP(section.slug);

    });
}

//add content to each of the front page sections
async function addContentFP(name) {
    console.log(name);

    //variables for getting wordpress data
    let linkSec;
    let responsSec;
    let jsonSec;

    let i = 0;
    let wrapper = document.querySelector("#" + name);

    if (name == "my-services") {
        console.log("services start");

        //get wordpress data
        linkSec = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/service";
        responsSec = await fetch(linkSec);
        jsonSec = await responsSec.json();

        //forEach-loop for the services
        jsonSec.forEach((service) => {
            console.log("forEach loop start");

            //cloning template
            const klon = templateContent.cloneNode(true).content;

            //inserting data in clone
            klon.querySelector("img").src = service.icon.guid;
            klon.querySelector("img").classList.add("icon");
            klon.querySelector("h3").textContent = service.title.rendered;
            klon.querySelector("p").innerHTML = service.content.rendered;
            klon.querySelector("section").classList.add("service");

            //adding klon with content to container
            wrapper.appendChild(klon);
            console.log("appendChild");
        });

    } else if (name == "my-work") {
        console.log("my work start");

        //get wordpress data
        linkSec = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/project";
        responsSec = await fetch(linkSec);
        jsonSec = await responsSec.json();

        //add button left
        let projectButtonLeft = document.createElement("img");
        projectButtonLeft.src = "assets/next.svg";
        projectButtonLeft.classList.add("projectbuttonleft");
        wrapper.appendChild(projectButtonLeft);

        //get reviews and add to section#containerReviews
        let containerProjects = document.createElement("section");
        containerProjects.id = "containerProjects";
        wrapper.appendChild(containerProjects);
        //add each project
        jsonSec.forEach((project) => {
            const klonPro = templateContent.cloneNode(true).content;

            //insert data in clone
            klonPro.querySelector("img").src = project.picture.guid;
            klonPro.querySelector("img").alt = project.picture.name;
            klonPro.querySelector("h3").textContent = project.title.rendered;
            klonPro.querySelector("p").innerHTML = project.content.rendered;

            //adding class to allow css
            klonPro.querySelector("section").classList.add("project");
            //append child
            document.querySelector("#containerProjects").appendChild(klonPro);
        })

        //add button right
        let projectButtonRight = document.createElement("img");
        projectButtonRight.src = "assets/next.svg";
        projectButtonRight.classList.add("projectbuttonright");
        wrapper.appendChild(projectButtonRight);

        //add eventlisteners to arrows for them to scroll through reviews

        let increment = 0;
        let projectWidth = document.querySelector(".project").offsetWidth;
        console.log(projectWidth);
        document.querySelector("#containerProjects").scrollLeft = 0;
        projectButtonLeft.style.opacity = 0.5;

        projectButtonRight.addEventListener("click", function () {
            projectWidth = document.querySelector(".project").offsetWidth;
            if (document.querySelector("#containerProjects").scrollWidth > (increment + document.querySelector("#containerProjects").offsetWidth)) {
                console.log("click scroll left");
                document.querySelector("#containerProjects").scrollLeft += projectWidth;
                increment += projectWidth;

                if (document.querySelector("#containerProjects").scrollWidth < (increment + document.querySelector("#containerProjects").offsetWidth)) {
                    projectButtonRight.style.opacity = 0.5;
                    console.log("end reached");
                }
                projectButtonLeft.style.opacity = 1;
            }
        });
        projectButtonLeft.addEventListener("click", function () {
            projectWidth = document.querySelector(".project").offsetWidth;
            if (increment > 0) {
                console.log("click scroll left");
                document.querySelector("#containerProjects").scrollLeft -= projectWidth;
                increment -= projectWidth;
                if (increment == 0) {
                    projectButtonLeft.style.opacity = 0.5;
                    console.log("end reached");
                }
                projectButtonRight.style.opacity = 1;
            }
        });

    } else if (name == "customers") {
        console.log("customer reviews start");

        //get wordpress data
        linkSec = "https://sarahfrederiksen.dk/kea/2_semester/eksamen/wordpress/wp-json/wp/v2/customer";
        responsSec = await fetch(linkSec);
        jsonSec = await responsSec.json();

        //add button left
        let arrowButtonLeft = document.createElement("img");
        arrowButtonLeft.src = "assets/next.svg";
        arrowButtonLeft.classList.add("arrowbuttonleft");
        wrapper.appendChild(arrowButtonLeft);

        //get reviews and add to section#containerReviews
        let containerReviews = document.createElement("section");
        containerReviews.id = "containerReviews";
        wrapper.appendChild(containerReviews);
        console.log("getReviews");
        jsonSec.forEach((review) => {
            //inserting data in clone
            const klon = document.querySelector("#review-temp").cloneNode(true).content;

            klon.querySelector("img").src = review.profilepic.guid;
            klon.querySelector("h3").textContent = review.title.rendered;
            klon.querySelector("p").innerHTML = review.review;

            //adding class to allow css
            klon.querySelector("section").classList.add("review");

            //adding klon with content to container
            document.querySelector("#containerReviews").appendChild(klon);
            console.log("appendChild");
        })

        //add button right
        let arrowButtonRight = document.createElement("img");
        arrowButtonRight.src = "assets/next.svg";
        arrowButtonRight.classList.add("arrowbuttonright");
        wrapper.appendChild(arrowButtonRight);

        //add eventlisteners to arrows for them to scroll through reviews

        let increment = 0;
        let reviewWidth = document.querySelector(".review").offsetWidth;
        console.log(reviewWidth);
        containerReviews.scrollLeft = 0;
        arrowButtonLeft.style.opacity = 0.5;

        arrowButtonRight.addEventListener("click", function () {
            reviewWidth = document.querySelector(".review").offsetWidth;
            if (increment < ((jsonSec.length - 1) * reviewWidth)) {
                console.log("click scroll left");
                containerReviews.scrollLeft += reviewWidth;
                increment += reviewWidth;
                if (increment == ((jsonSec.length - 1) * reviewWidth)) {
                    arrowButtonRight.style.opacity = 0.5;
                    console.log("end reached");
                }
                arrowButtonLeft.style.opacity = 1;
            }
        });
        arrowButtonLeft.addEventListener("click", function () {
            reviewWidth = document.querySelector(".review").offsetWidth;
            if (increment > 0) {
                console.log("click scroll left");
                containerReviews.scrollLeft -= reviewWidth;
                increment -= reviewWidth;
                if (increment == 0) {
                    arrowButtonLeft.style.opacity = 0.5;
                    console.log("end reached");
                }
                arrowButtonRight.style.opacity = 1;
            }
        });
    }

    //navigate to section via #
    window.location.search = window.location.hash.substr(1);

}
