console.log('hello world');
const { el, mount } = redom;


const access = el("div",[
  el("a",{href:"/game",textContent:"Game"})
]);

mount(document.body,access);















