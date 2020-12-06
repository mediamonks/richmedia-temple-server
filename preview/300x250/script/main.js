import Banner from "./Banner";
import config from "richmediaconfig";

const banner = new Banner(config);

console.log(CONST);
if(richmedia.content.enabled){
  const helloMoto = require('./helloMoto');
  console.log(helloMoto);
}

banner.start();
