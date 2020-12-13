document.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start burger menu");

    //get burgermenu-button and menu
    const menuButton = document.querySelector("nav button");
    const menuContainer = document.querySelector("nav section div");
    //when clicking on button open burgermenu
    menuButton.addEventListener("click", () => {
        console.log("burgermenu click");

        //toggle hidden
        menuContainer.classList.toggle("hidemenu");
    });
}
