import "./css/style.css";
import { createApp } from "vue";
import App from "./vue/index.vue";

const div = document.createElement("div");
div.innerHTML = "hello world";
div.className = "hello";
document.body.appendChild(div);

const app = createApp(App);
app.mount(document.getElementById("app"));
console.log("refresh");
