import{a as b,S as w,i as c}from"./assets/vendor-D94OL8Qp.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const L="49632917-f700970c30bc9937fd82e83ee",S="https://pixabay.com/api/";async function f(t,o){try{return(await b.get(S,{params:{key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}catch(a){console.error("Error fetching images:",a)}}function m(t){return t.hits.map(({webformatURL:a,largeImageURL:d,tags:e,likes:r,views:i,comments:y,downloads:v})=>`
        <li class="card">
            <div class="place-for-image">
                <a href="${d}">
                    <img src="${a}" alt="${e}" class="picture"/>
                </a>
            </div>
            <div class="info-text">
                <div class="description">
                    <span class="bold-text">Likes</span>
                    <span class="info-value">${r}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Views</span>
                    <span class="info-value">${i}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Comments</span>
                    <span class="info-value">${y}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Downloads</span>
                    <span class="info-value">${v}</span>
                </div>
            </div>
        </li>`).join("")}function h(){document.querySelector(".loader").classList.remove("hidden"),document.querySelector(".loader").classList.add("show")}function u(){document.querySelector(".loader").classList.remove("show"),document.querySelector(".loader").classList.add("hidden")}const C=document.querySelector(".form"),n=document.querySelector(".gallery"),s=document.querySelector(".buttonMore"),g=new w(".gallery a",{captionsData:"alt",captionDelay:250});C.addEventListener("submit",q);s.addEventListener("click",x);let l=1,p;async function q(t){if(t.preventDefault(),s.hidden=!0,n.innerHTML="",h(),p=t.currentTarget.elements.inputSearch.value.trim(),!p){c.show({message:"Please enter a search query.",messageSize:25,backgroundColor:"orange",messageColor:"red",color:"orangered",position:"topCenter",timeout:2e3}),u();return}l=1;try{const o=await f(p,l);if(o.totalHits===0){c.show({message:"No images found. Try another query.",messageSize:25,backgroundColor:"orange",messageColor:"red",color:"orangered",position:"topCenter",timeout:2e3}),u();return}n.insertAdjacentHTML("beforeend",m(o)),g.refresh(),t.target.reset(),s.hidden=!1,l++,n.children.length>=o.totalHits&&(s.hidden=!0)}catch(o){console.log(o)}finally{u()}}async function x(){s.hidden=!0,h();try{const t=await f(p,l);if(t.totalHits===0){c.show({message:"No more images found.",messageColor:"red",color:"tomato",position:"center",timeout:2e3});return}n.insertAdjacentHTML("beforeend",m(t)),g.refresh(),l++;const{height:o}=n.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),n.children.length>=t.totalHits?(s.hidden=!0,c.show({message:"You've reached the end of search results.",messageSize:25,backgroundColor:"orange",messageColor:"red",color:"orangered",position:"center",timeout:2e3})):s.hidden=!1}catch(t){s.hidden=!0,c.show({title:"Error!",message:t.message,color:"red",position:"center",timeout:2e3})}finally{u()}}
//# sourceMappingURL=index.js.map
