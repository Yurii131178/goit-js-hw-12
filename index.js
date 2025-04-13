import{a as b,S as L,i as w}from"./assets/vendor-D94OL8Qp.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const S="49632917-f700970c30bc9937fd82e83ee",q="https://pixabay.com/api/";async function h(t,r){try{return(await b.get(q,{params:{key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}catch(a){console.error("Error fetching images:",a)}}function p(t){return t.hits.map(({webformatURL:a,largeImageURL:d,tags:e,likes:s,views:c,comments:g,downloads:v})=>`
        <li class="card">
            <div class="place-for-image">
                <a href="${d}">
                    <img src="${a}" alt="${e}" class="picture"/>
                </a>
            </div>
            <div class="info-text">
                <div class="description">
                    <span class="bold-text">Likes</span>
                    <span class="info-value">${s}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Views</span>
                    <span class="info-value">${c}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Comments</span>
                    <span class="info-value">${g}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Downloads</span>
                    <span class="info-value">${v}</span>
                </div>
            </div>
        </li>`).join("")}function m(){document.querySelector(".loader").classList.remove("hidden"),document.querySelector(".loader").classList.add("show")}function u(){document.querySelector(".loader").classList.remove("show"),document.querySelector(".loader").classList.add("hidden")}function n({title:t="Oops!",message:r="",color:a="red"}){w.show({title:t,titleColor:"white",message:r,messageColor:"white",color:a,position:"topCenter",timeout:5e3})}const x=document.querySelector(".form"),i=document.querySelector(".gallery"),o=document.querySelector(".buttonMore"),y=new L(".gallery a",{captionsData:"alt",captionDelay:250});x.addEventListener("submit",E);o.addEventListener("click",H);let l=1,f;async function E(t){if(t.preventDefault(),o.hidden=!0,i.innerHTML="",m(),f=t.currentTarget.elements.inputSearch.value.trim(),f===""){n({message:"Please enter a search query."}),u();return}l=1;try{const r=await h(f,l);if(r.totalHits===0){n({message:"No images found. Try another query."}),u();return}i.insertAdjacentHTML("beforeend",p(r)),y.refresh(),t.target.reset(),o.hidden=!1,l+=1,i.children.length>=r.totalHits&&(o.hidden=!0,n({title:"Info",message:"You've reached the end of search results.",color:"blue"}))}catch(r){o.hidden=!0,n({title:"Error!",message:r.message})}finally{u()}}async function H(){o.hidden=!0,m();try{const t=await h(f,l);if(t.totalHits===0){n({message:"No more images found."});return}i.insertAdjacentHTML("beforeend",p(t)),y.refresh(),l++;const{height:r}=i.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),i.children.length>=t.totalHits?(o.hidden=!0,n({title:"Info",message:"You've reached the end of search results.",color:"blue"})):o.hidden=!1}catch(t){o.hidden=!0,n({title:"Error!",message:t.message})}finally{u()}}
//# sourceMappingURL=index.js.map
