const products=[
{id:1,name:"TXJ NIOR TEE",type:"Black / Core",price:15,image:"assets/black-shirt.jpg",desc:"A clean everyday silhouette with the TXJ mark. Easy fit, understated attitude.",sizes:["XS","S","M","L","XL","XXL"]},
{id:2,name:"TXJ BLANCH TEE",type:"White / Core",price:15,image:"assets/blue-shirt.jpg",desc:"A clean plain white tee with the signature TXJ mark and an effortless everyday fit.",sizes:["XS","S","M","L","XL","XXL"]},
{id:3,name:"TXJ BACK ART TEE",type:"White / Statement",price:15,image:"assets/graphic-shirt.jpg",desc:"Our statement graphic tee with a larger back artwork, clean front identity and a stronger presence.",sizes:["XS","S","M","L","XL","XXL"]}
];
let cart=JSON.parse(localStorage.getItem("txdCart")||"[]"), currentProduct=null, selectedSize="M";
const $=s=>document.querySelector(s);
const grid=$("#productGrid"), cartDrawer=$("#cartDrawer"), backdrop=$("#drawerBackdrop");
function renderProducts(list=products){
 grid.innerHTML=list.map(p=>`<article class="product-card" data-id="${p.id}">
 <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><button class="quick-add" data-quick="${p.id}">QUICK ADD +</button></div>
 <div class="product-meta"><div><div class="product-name">${p.name}</div><div class="product-type">${p.type}</div></div><div class="product-price">$${p.price}</div></div>
 </article>`).join("");
}
renderProducts();
grid.addEventListener("click",e=>{let q=e.target.closest("[data-quick]");let card=e.target.closest(".product-card");if(q){e.stopPropagation();addToCart(+q.dataset.quick,"M");return}if(card)openProduct(+card.dataset.id)});
function openProduct(id){
 currentProduct=products.find(p=>p.id===id);selectedSize="M";
 $("#modalImg").src=currentProduct.image;$("#modalImg").alt=currentProduct.name;$("#modalTag").textContent=currentProduct.type;$("#modalName").textContent=currentProduct.name;$("#modalPrice").textContent="$"+currentProduct.price;$("#modalDesc").textContent=currentProduct.desc;
 $("#sizes").innerHTML=currentProduct.sizes.map(s=>`<button class="size ${s===selectedSize?"selected":""}" data-size="${s}">${s}</button>`).join("");
 $("#productModal").classList.add("open");document.body.classList.add("lock");
}
$("#sizes").addEventListener("click",e=>{if(e.target.matches(".size")){selectedSize=e.target.dataset.size;document.querySelectorAll(".size").forEach(x=>x.classList.toggle("selected",x===e.target))}});
$("#modalAdd").onclick=()=>{addToCart(currentProduct.id,selectedSize);$("#productModal").classList.remove("open");document.body.classList.remove("lock")};
$("#closeModal").onclick=()=>{$("#productModal").classList.remove("open");document.body.classList.remove("lock")};
$("#productModal").addEventListener("click",e=>{if(e.target.id==="productModal"){$("#productModal").classList.remove("open");document.body.classList.remove("lock")}});
function addToCart(id,size="M"){
 const p=products.find(x=>x.id===id), existing=cart.find(x=>x.id===id&&x.size===size);
 if(existing)existing.qty++;else cart.push({id,size,qty:1});
 saveCart();showToast(`${p.name} — SIZE ${size} ADDED`);openCart();
}
function saveCart(){localStorage.setItem("txdCart",JSON.stringify(cart));renderCart();$("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}
function renderCart(){
 const wrap=$("#cartItems"),empty=$("#cartEmpty"),bottom=$("#cartBottom");
 if(!cart.length){wrap.innerHTML="";empty.style.display="block";bottom.style.display="none";return}
 empty.style.display="none";bottom.style.display="block";
 wrap.innerHTML=cart.map((item,i)=>{let p=products.find(x=>x.id===item.id);return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>SIZE ${item.size} · $${p.price}</p><div class="qty"><button data-minus="${i}">−</button><span>${item.qty}</span><button data-plus="${i}">+</button></div><button class="remove" data-remove="${i}">Remove</button></div><div class="row-price">$${p.price*item.qty}</div></div>`}).join("");
 $("#cartTotal").textContent="$"+cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0);
}
$("#cartItems").addEventListener("click",e=>{
 const plus=e.target.closest("[data-plus]"),minus=e.target.closest("[data-minus]"),remove=e.target.closest("[data-remove]");
 if(plus)cart[+plus.dataset.plus].qty++;
 if(minus){let i=+minus.dataset.minus;cart[i].qty--;if(cart[i].qty<1)cart.splice(i,1)}
 if(remove)cart.splice(+remove.dataset.remove,1);saveCart();
});
function openCart(){cartDrawer.classList.add("open");backdrop.classList.add("open")}
function closeCart(){cartDrawer.classList.remove("open");backdrop.classList.remove("open")}
$("#cartBtn").onclick=openCart;$("#closeCart").onclick=closeCart;backdrop.onclick=closeCart;
$("#startShopping").onclick=closeCart;
$("#checkoutBtn").onclick=()=>{
 if(!cart.length)return;
 const lines=cart.map(i=>{let p=products.find(x=>x.id===i.id);return `${p.name} | Size ${i.size} | Qty ${i.qty} | $${p.price*i.qty}`}).join("%0A");
 const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
 const msg=`Hello TXJ / TIMELESS JOINT, I'd like to place an order:%0A%0A${lines}%0A%0ATotal: $${total}%0A%0APlease confirm availability and delivery details.`;
 window.open(`https://wa.me/263714947114?text=${msg}`,"_blank");
};
$("#searchBtn").onclick=()=>{$("#searchPanel").classList.add("open");$("#searchInput").focus();document.body.classList.add("lock")};
$("#closeSearch").onclick=()=>{$("#searchPanel").classList.remove("open");document.body.classList.remove("lock")};
$("#searchInput").addEventListener("input",e=>{let q=e.target.value.toLowerCase().trim();let r=products.filter(p=>(p.name+" "+p.type).toLowerCase().includes(q));$("#searchResults").innerHTML=r.map(p=>`<div class="search-result"><span>${p.name}</span><strong>$${p.price}</strong></div>`).join("")});
$("#menuBtn").onclick=()=>openCart();
$("#newsletter").addEventListener("submit",e=>{e.preventDefault();e.target.innerHTML="<p style='font-size:11px;padding:15px 0'>YOU'RE ON THE LIST — WELCOME TO TXJ / TIMELESS JOINT.</p>"});
saveCart();
setTimeout(()=>{$("#loader").setAttribute("aria-hidden","false")},50);
