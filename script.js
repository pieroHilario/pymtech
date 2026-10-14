const menuBtn=document.querySelector(".menu-btn");
const nav=document.querySelector(".nav-links");
if(menuBtn&&nav){
  menuBtn.addEventListener("click",()=>{
    nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded",nav.classList.contains("open"));
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
}

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

const form=document.getElementById("quoteForm");
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("qName").value.trim();
    const company=document.getElementById("qCompany").value.trim();
    const phone=document.getElementById("qPhone").value.trim();
    const type=document.getElementById("qType").value;
    const need=document.getElementById("qNeed").value.trim();
    const msg=[
      "Hola PyM-Tech, deseo solicitar una cotización.",
      "",
      `Nombre: ${name}`,
      `Empresa: ${company||"-"}`,
      `Teléfono: ${phone||"-"}`,
      `Requerimiento: ${type}`,
      `Detalle: ${need}`
    ].join("\n");
    window.open(`https://wa.me/51940410742?text=${encodeURIComponent(msg)}`,"_blank","noopener");
  });
}
