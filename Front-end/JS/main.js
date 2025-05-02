import { createNavBar } from "./Components/navBar.js";
import { createFooter } from "./Components/footer.js";
import { initRouter } from "../router.js";

document.addEventListener("DOMContentLoaded", async () => {
    createNavBar();
    initRouter();
    createFooter();
})