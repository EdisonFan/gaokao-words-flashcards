/* 公共登录鉴权：未登录禁止访问 */
const AUTH_KEY='auth_user';

function getAuthUser(){
  try{ return JSON.parse(localStorage.getItem(AUTH_KEY)||'null'); }
  catch(e){ return null; }
}

function guardPage(){
  const u=getAuthUser();
  if(!u || !u.client_id || !u.username){
    const cur=(location.pathname.split('/').pop()||'index.html');
    location.replace('login.html?next='+encodeURIComponent(cur));
    return false;
  }
  // 登录通过后显示正文（未登录时 body 保持隐藏，避免闪现）
  const show=()=>{ if(document.body) document.body.style.visibility='visible'; };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',show);
  else show();
  return true;
}

function logout(){
  try{
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem('fc_client_id');
  }catch(e){}
  location.replace('login.html');
}

function renderUserBar(el){
  const u=getAuthUser();
  if(!u||!el) return;
  const name=(u.display_name||u.username);
  el.innerHTML='<span class="who">👤 '+escHtml(name)+'</span>'+
               '<button class="logout" id="logoutBtn">退出登录</button>';
  const b=document.getElementById('logoutBtn');
  if(b) b.onclick=logout;
}

function escHtml(s){
  return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}
