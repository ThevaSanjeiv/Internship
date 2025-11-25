(function(){
  const GLOBAL_MULTIPLIER = 35;
  const DEFAULT_SPEED = 0.012;

  function initColumn(col){
    const inner = col.querySelector(".ts-inner");
    if(!inner) return null;

    let originalCount = parseInt(col.dataset.tsOriginalCount || "0",10);
    if(!originalCount){
      originalCount = inner.children.length;
      col.dataset.tsOriginalCount = String(originalCount);
    }
    if(!originalCount) return null;

    if(!col.dataset.tsCloned){
      const originals = Array.from(inner.children).slice(0,originalCount);
      originals.forEach(node => inner.appendChild(node.cloneNode(true)));
      col.dataset.tsCloned = "1";
    }

    inner.style.willChange = "transform";
    inner.style.transform = "translateY(0px)";

    let paused = false;
    let hoverCount = 0;

    function setPaused(v){
      paused = !!v;
    }

    const cards = inner.querySelectorAll(".ts-card");
    cards.forEach(card => {
      card.addEventListener("pointerenter",() => {
        hoverCount++;
        setPaused(true);
      },{passive:true});
      card.addEventListener("pointerleave",() => {
        hoverCount = Math.max(0,hoverCount-1);
        if(hoverCount===0) setPaused(false);
      },{passive:true});
      card.addEventListener("focusin",() => {
        hoverCount++;
        setPaused(true);
      });
      card.addEventListener("focusout",() => {
        hoverCount = Math.max(0,hoverCount-1);
        if(hoverCount===0) setPaused(false);
      });
    });

    col.addEventListener("pointerdown",() => setPaused(true),{passive:true});
    document.addEventListener("pointerup",() => {
      if(hoverCount===0) setPaused(false);
    },{passive:true});

    function measureOriginalHeight(){
      const total = inner.scrollHeight;
      const orig = total / 2;
      return orig > 1 ? orig : 1;
    }

    let originalHeight = measureOriginalHeight();

    window.addEventListener("resize",() => {
      originalHeight = measureOriginalHeight();
    });

    const speedBase = parseFloat(col.dataset.speed) || DEFAULT_SPEED;

    let offset = 0;
    let lastTs = null;
    let rafId = null;

    function step(ts){
      if(lastTs === null) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      if(!paused){
        offset += speedBase * dt * GLOBAL_MULTIPLIER;
        if(offset >= originalHeight) offset -= originalHeight;
        if(offset < 0) offset += originalHeight;
        inner.style.transform = "translateY(" + (-offset) + "px)";
      }

      rafId = requestAnimationFrame(step);
    }

    setTimeout(() => {
      originalHeight = measureOriginalHeight();
      lastTs = null;
      rafId = requestAnimationFrame(step);
    },100);

    return {
      stop:   () => cancelAnimationFrame(rafId),
      pause:  () => setPaused(true),
      resume: () => setPaused(false)
    };
  }

  function initAll(){
    const cols = Array.from(document.querySelectorAll(".ts-column"));
    if(!cols.length) return;
    const controllers = cols.map(initColumn);

    document.addEventListener("visibilitychange",() => {
      if(document.hidden){
        controllers.forEach(c => c && c.pause && c.pause());
      }else{
        controllers.forEach(c => c && c.resume && c.resume());
      }
    });
  }

  if(document.readyState === "complete"){
    initAll();
  }else{
    window.addEventListener("load",initAll);
  }
})();
