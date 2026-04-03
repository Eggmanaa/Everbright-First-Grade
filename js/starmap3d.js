/**
 * THE LOST STAR MAP - Voxel-Style 3D Constellation Map
 * Kingdom of Everbright - First Grade Gameschooling Curriculum
 *
 * Constellation shapes match their mission themes:
 * M1: Telescope, M2: Stepped Ziggurat, M3: Pyramid/Triangle,
 * M4: Open Book, M5: Mountain Peak, M6: Sun Circle,
 * M7: Heart, M8: Bright North Star, M9: Diamond/Crystal,
 * M10: Paw Print, M11: Castle Tower, M12: Eagle/Bird,
 * M13: Wagon Wheel, M14: Crescent Moon, M15: Crown
 *
 * Voxel aesthetic with blocky glowing cubes for stars.
 */

(function() {
  'use strict';
  if (typeof THREE === 'undefined') return;
  const container = document.getElementById('starmap-3d');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020108);

  const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 200);
  camera.position.set(0, 2.5, 9);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.rotateSpeed = 0.4;
  controls.zoomSpeed = 0.6;
  controls.minDistance = 3;
  controls.maxDistance = 16;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.1;
  controls.enablePan = false;

  // ============================================
  // VOXEL STAR HELPER
  // ============================================
  const voxelGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);

  function makeVoxelStar(pos, color, opacity) {
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
    const cube = new THREE.Mesh(voxelGeo, mat);
    cube.position.set(pos[0], pos[1], pos[2]);
    // Slight random rotation for organic feel
    cube.rotation.set(Math.random()*0.5, Math.random()*0.5, Math.random()*0.5);
    return cube;
  }

  function makeGlow(pos, color, opacity, size) {
    const mat = new THREE.SpriteMaterial({
      color, transparent: true, opacity: opacity * 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(pos[0], pos[1], pos[2]);
    sprite.scale.set(size || 0.25, size || 0.25, 1);
    return sprite;
  }

  // ============================================
  // CONSTELLATION DATA - Shapes match mission themes
  // ============================================
  const C = [
    // M1: TELESCOPE shape (tube + lens)
    { id:1, name:"First Star", pos:[0,3,0], stars:[
      [0,0,0],[0,.2,0],[0,.4,0],[0,.6,0],[0,.8,0], // tube
      [-.15,1,.05],[.15,1,-.05],[0,1.1,0],[-.1,.9,.1],[.1,.9,-.1] // lens
    ], edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[5,7],[6,7],[4,8],[4,9]] },

    // M2: ZIGGURAT (stepped pyramid from side)
    { id:2, name:"Ziggurat", pos:[-3,2,1], stars:[
      [-.4,0,0],[.4,0,0], // base
      [-.3,.2,0],[.3,.2,0], // step 1
      [-.2,.4,0],[.2,.4,0], // step 2
      [-.1,.6,0],[.1,.6,0], // step 3
      [0,.8,0] // top
    ], edges:[[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,5],[4,6],[5,7],[6,7],[6,8],[7,8]] },

    // M3: PYRAMID (triangle)
    { id:3, name:"Pyramid", pos:[3,2.2,-1], stars:[
      [0,.6,0], // apex
      [-.4,0,-.2],[.4,0,-.2],[.4,0,.2],[-.4,0,.2], // base square
      [-.2,.3,-.1],[.2,.3,-.1] // mid edges
    ], edges:[[0,5],[0,6],[5,1],[6,2],[1,2],[2,3],[3,4],[4,1],[0,4],[0,3]] },

    // M4: OPEN BOOK shape
    { id:4, name:"Sacred Book", pos:[-3.2,.5,-.8], stars:[
      [0,0,0], // spine center
      [-.3,.3,0],[-.4,.15,0],[-.3,0,0], // left page
      [.3,.3,0],[.4,.15,0],[.3,0,0], // right page
      [0,.35,0] // top of spine
    ], edges:[[0,2],[0,5],[1,7],[4,7],[1,2],[2,3],[3,0],[4,5],[5,6],[6,0],[7,1],[7,4]] },

    // M5: MOUNTAIN PEAK
    { id:5, name:"Sacred Mountain", pos:[-1.5,.3,2.2], stars:[
      [0,.8,0], // peak
      [-.2,.5,0],[.2,.5,0], // upper slopes
      [-.5,.2,.1],[.5,.2,-.1], // lower slopes
      [-.7,0,.15],[.7,0,-.15], // base
      [0,.2,0] // center
    ], edges:[[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[1,7],[2,7],[5,6]] },

    // M6: SUN with rays
    { id:6, name:"Jade Sun", pos:[-1,-.2,-1], stars:[
      [0,0,0], // center
      [0,.3,0],[0,-.3,0],[.3,0,0],[-.3,0,0], // cardinal
      [.2,.2,0],[-.2,.2,0],[.2,-.2,0],[-.2,-.2,0] // diagonal
    ], edges:[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,5],[1,6],[3,5],[3,7],[2,7],[2,8],[4,6],[4,8]] },

    // M7: HEART shape
    { id:7, name:"Beating Heart", pos:[0,-.2,0], stars:[
      [0,-.3,0], // bottom point
      [-.15,0,0],[.15,0,0], // mid
      [-.25,.15,0],[-.1,.25,0], // left hump
      [.1,.25,0],[.25,.15,0], // right hump
      [0,.1,0] // center
    ], edges:[[0,1],[0,2],[1,3],[3,4],[4,7],[7,5],[5,6],[6,2],[1,7],[2,7]] },

    // M8: BRIGHT NORTH STAR (8-pointed star)
    { id:8, name:"North Star", pos:[1.8,.5,1.2], stars:[
      [0,0,0], // center
      [0,.35,0],[0,-.35,0],[.35,0,0],[-.35,0,0], // cardinal points
      [.2,.2,0],[-.2,.2,0],[.2,-.2,0],[-.2,-.2,0] // intermediate
    ], edges:[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8]] },

    // M9: DIAMOND/CRYSTAL shape
    { id:9, name:"Crystal Core", pos:[3.2,-.2,.5], stars:[
      [0,.4,0], // top point
      [-.2,.15,0],[.2,.15,0], // upper
      [-.3,0,0],[.3,0,0], // middle widest
      [-.2,-.15,0],[.2,-.15,0], // lower
      [0,-.4,0] // bottom point
    ], edges:[[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,7],[6,7],[1,2],[3,4],[5,6]] },

    // M10: PAW PRINT
    { id:10, name:"Wild Star", pos:[-2.8,-1.8,.6], stars:[
      [0,-.1,0],[-.1,-.25,0],[.1,-.25,0], // palm (triangle)
      [-.2,.15,0],[-.05,.2,0],[.05,.2,0],[.2,.15,0], // 4 toe beans
    ], edges:[[0,1],[0,2],[1,2],[0,3],[0,4],[0,5],[0,6]] },

    // M11: CASTLE TOWER with turret
    { id:11, name:"Enchanted Star", pos:[-.8,-2,-1.5], stars:[
      [-.15,0,0],[.15,0,0], // base
      [-.15,.4,0],[.15,.4,0], // wall top
      [-.2,.5,0],[0,.5,0],[.2,.5,0], // battlements
      [0,.65,0], // flag top
      [-.15,.2,0],[.15,.2,0] // mid wall
    ], edges:[[0,1],[0,2],[1,3],[2,4],[2,5],[3,5],[3,6],[5,7],[0,8],[1,9],[8,9]] },

    // M12: EAGLE with spread wings
    { id:12, name:"Eagle", pos:[.2,-2,.3], stars:[
      [0,.15,0], // head
      [0,0,0], // body center
      [-.2,-.1,0],[.2,-.1,0], // wing roots
      [-.5,.05,0],[.5,.05,0], // wing tips
      [-.35,.15,0],[.35,.15,0], // upper wing
      [0,-.25,0] // tail
    ], edges:[[0,1],[1,2],[1,3],[2,4],[3,5],[2,6],[3,7],[6,4],[7,5],[0,6],[0,7],[1,8]] },

    // M13: WAGON WHEEL (circle with spokes)
    { id:13, name:"Pioneer", pos:[1.8,-2,-.8], stars:[
      [0,0,0], // hub
      [0,.25,0],[.18,.18,0],[.25,0,0],[.18,-.18,0], // rim quarter 1
      [0,-.25,0],[-.18,-.18,0],[-.25,0,0],[-.18,.18,0] // rim rest
    ], edges:[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1]] },

    // M14: CRESCENT MOON
    { id:14, name:"Full Sky", pos:[3,-1.5,-.5], stars:[
      [.1,.3,0],[.2,.2,0],[.25,.05,0],[.2,-.15,0],[.1,-.25,0], // outer curve
      [0,.2,0],[.05,.05,0],[0,-.15,0], // inner curve
    ], edges:[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,4]] },

    // M15: CROWN (the grandest constellation)
    { id:15, name:"Navigator's Crown", pos:[0,-3,-.2], stars:[
      [-.35,0,0],[-.18,0,0],[0,0,0],[.18,0,0],[.35,0,0], // base band
      [-.25,.25,0],[0,.35,0],[.25,.25,0], // three points
      [-.12,.15,0],[.12,.15,0], // valleys between points
      [0,.45,0] // top jewel
    ], edges:[[0,1],[1,2],[2,3],[3,4],[0,5],[5,8],[8,6],[6,9],[9,7],[7,4],[1,8],[3,9],[6,10],[5,8],[7,9]] },
  ];

  // ============================================
  // BACKGROUND: Voxel-style space dust
  // ============================================
  function createVoxelSpaceDust() {
    const count = 4000;
    const group = new THREE.Group();
    const dustGeo = new THREE.BoxGeometry(0.03, 0.03, 0.03);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 40;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const brightness = 0.3 + Math.random() * 0.7;
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.5) color = new THREE.Color(brightness, brightness, brightness + 0.1);
      else if (colorChoice < 0.7) color = new THREE.Color(brightness * 0.9, brightness * 0.8, brightness * 0.5);
      else if (colorChoice < 0.85) color = new THREE.Color(brightness * 0.6, brightness * 0.7, brightness);
      else color = new THREE.Color(brightness, brightness * 0.5, brightness * 0.4);

      const mat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.4 + Math.random() * 0.4,
      });
      const cube = new THREE.Mesh(dustGeo, mat);
      cube.position.set(x, y, z);
      cube.rotation.set(Math.random(), Math.random(), Math.random());
      group.add(cube);
    }
    scene.add(group);
    return group;
  }

  // Galaxy disc (voxel particles)
  function createVoxelGalaxy() {
    const positions = [];
    const colors = [];
    const armCount = 3;
    const starsPerArm = 2000;

    for (let arm = 0; arm < armCount; arm++) {
      const armAngle = (arm / armCount) * Math.PI * 2;
      for (let i = 0; i < starsPerArm; i++) {
        const t = i / starsPerArm;
        const dist = 1.5 + t * 10;
        const angle = armAngle + t * Math.PI * 2.5 + (Math.random() - 0.5) * 0.6;
        const spread = 0.2 + t * 1;
        const x = Math.cos(angle) * dist + (Math.random() - 0.5) * spread;
        const z = Math.sin(angle) * dist + (Math.random() - 0.5) * spread;
        const y = (Math.random() - 0.5) * 0.15 * Math.exp(-t * 0.3);
        positions.push(x, y, z);

        const cw = Math.max(0, 1 - dist / 4);
        if (Math.random() < cw) colors.push(1, 0.92, 0.7);
        else if (Math.random() < 0.3) colors.push(0.95, 0.82, 0.45);
        else { const b = 0.5 + Math.random()*0.3; colors.push(b, b, b+0.15); }
      }
    }
    // Core
    for (let i = 0; i < 1200; i++) {
      const r = Math.random() * 2;
      const a = Math.random() * Math.PI * 2;
      positions.push(r*Math.cos(a), (Math.random()-.5)*0.2, r*Math.sin(a));
      colors.push(1, 0.9, 0.65);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.04, vertexColors: true, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    return pts;
  }

  // Nebulae
  function createNebulae() {
    [
      { p:[2,.3,-2], c:0x3a1a5e, s:[2.5,.8,2], o:0.035 },
      { p:[-3,-.2,2], c:0x1a2a5e, s:[2,.6,2.5], o:0.03 },
      { p:[0,0,0], c:0x2a1a0a, s:[3,.8,3], o:0.05 },
      { p:[0,0,0], c:0xC9A84C, s:[1.2,.4,1.2], o:0.03 },
      { p:[-2,.5,-3], c:0x4a0a2a, s:[2,.5,1.5], o:0.025 },
    ].forEach(n => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(2, 16, 16),
        new THREE.MeshBasicMaterial({ color:n.c, transparent:true, opacity:n.o, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide })
      );
      mesh.position.set(...n.p);
      mesh.scale.set(...n.s);
      scene.add(mesh);
    });
  }

  // ============================================
  // BUILD CONSTELLATIONS
  // ============================================
  let completionState = {};
  let hoveredConstellation = null;
  const hitMeshes = [];
  const cGroups = [];

  function buildConstellation(data) {
    const group = new THREE.Group();
    group.position.set(...data.pos);
    group.userData = { id: data.id, name: data.name };

    const isLit = completionState[data.id] || false;
    const col = isLit ? 0xC9A84C : 0x555566;
    const op = isLit ? 1 : 0.3;

    // Voxel star cubes
    data.stars.forEach(s => {
      group.add(makeVoxelStar(s, col, op));
      group.add(makeGlow(s, col, op, 0.2));
    });

    // Connecting lines
    data.edges.forEach(([a,b]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...data.stars[a]),
        new THREE.Vector3(...data.stars[b])
      ]);
      group.add(new THREE.Line(geo, new THREE.LineBasicMaterial({
        color: col, transparent: true, opacity: op*0.4,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })));
    });

    // Hit target
    const center = new THREE.Vector3();
    data.stars.forEach(s => center.add(new THREE.Vector3(...s)));
    center.divideScalar(data.stars.length);
    group.userData.center = center.clone().add(new THREE.Vector3(...data.pos));

    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.copy(center);
    hit.userData = { cid: data.id };
    group.add(hit);
    hitMeshes.push(hit);

    scene.add(group);
    cGroups.push(group);
  }

  function updateVisuals(group, lit, hovered) {
    const col = hovered ? 0xFFD700 : (lit ? 0xC9A84C : 0x555566);
    const op = (lit || hovered) ? 1 : 0.3;
    group.children.forEach(c => {
      if (c.isMesh && c.material.visible !== false) { c.material.color.setHex(col); c.material.opacity = op; }
      if (c.isSprite) { c.material.color.setHex(col); c.material.opacity = op * 0.4; c.scale.setScalar(hovered ? 0.3 : 0.2); }
      if (c.isLine) { c.material.color.setHex(col); c.material.opacity = op * 0.4; }
    });
  }

  // Burst effect
  function burst(pos) {
    const n = 35;
    const p = new Float32Array(n*3);
    const v = [];
    for (let i=0;i<n;i++) { p[i*3]=pos.x; p[i*3+1]=pos.y; p[i*3+2]=pos.z; v.push(new THREE.Vector3((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12)); }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
    const mat = new THREE.PointsMaterial({ color:0xC9A84C, size:0.06, transparent:true, opacity:1, blending:THREE.AdditiveBlending, depthWrite:false });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    let f=0;
    (function anim(){ f++; const a=pts.geometry.attributes.position.array; for(let i=0;i<n;i++){a[i*3]+=v[i].x;a[i*3+1]+=v[i].y;a[i*3+2]+=v[i].z;v[i].multiplyScalar(0.94);} pts.geometry.attributes.position.needsUpdate=true; mat.opacity=Math.max(0,1-f/50); if(f<50)requestAnimationFrame(anim);else{scene.remove(pts);geo.dispose();mat.dispose();}})();
  }

  // Shooting stars
  const meteors = [];
  function spawnMeteor() {
    const s = new THREE.Vector3((Math.random()-.5)*15, 3+Math.random()*4, (Math.random()-.5)*15);
    const d = new THREE.Vector3((Math.random()-.5)*.3, -.2, (Math.random()-.5)*.3).normalize();
    const tl = 6;
    const p = new Float32Array(tl*3);
    for(let i=0;i<tl;i++){p[i*3]=s.x;p[i*3+1]=s.y;p[i*3+2]=s.z;}
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(p,3));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));
    scene.add(line);
    meteors.push({line,p,head:s.clone(),d,spd:.25+Math.random()*.2,life:0,max:50+Math.random()*30,tl});
  }
  function updateMeteors() {
    for(let i=meteors.length-1;i>=0;i--){
      const m=meteors[i]; m.head.addScaledVector(m.d,m.spd); m.life++;
      for(let j=m.tl-1;j>0;j--){m.p[j*3]=m.p[(j-1)*3];m.p[j*3+1]=m.p[(j-1)*3+1];m.p[j*3+2]=m.p[(j-1)*3+2];}
      m.p[0]=m.head.x;m.p[1]=m.head.y;m.p[2]=m.head.z;
      m.line.geometry.attributes.position.needsUpdate=true;
      m.line.material.opacity=Math.max(0,.7*(1-m.life/m.max));
      if(m.life>=m.max){scene.remove(m.line);m.line.geometry.dispose();m.line.material.dispose();meteors.splice(i,1);}
    }
    if(Math.random()<.006&&meteors.length<2) spawnMeteor();
  }

  // ============================================
  // LABELS
  // ============================================
  const labelsDiv = document.createElement('div');
  labelsDiv.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
  container.style.position = 'relative';
  container.appendChild(labelsDiv);
  const labels = [];

  function createLabels() {
    cGroups.forEach(g => {
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;font-family:Merriweather,serif;font-size:10px;color:#E8D5A3;white-space:nowrap;opacity:.6;text-shadow:0 0 10px rgba(5,2,15,1);pointer-events:none;';
      el.textContent = 'M' + g.userData.id + ': ' + g.userData.name;
      labelsDiv.appendChild(el);
      labels.push({ el, g });
    });
  }
  function updateLabels() {
    const w=container.clientWidth, h=container.clientHeight;
    labels.forEach(({el,g})=>{
      const c=g.userData.center.clone().project(camera);
      if(c.z>1){el.style.display='none';return;}
      el.style.display='block';
      el.style.left=((c.x*.5+.5)*w)+'px';
      el.style.top=((-c.y*.5+.5)*h+16)+'px';
      el.style.transform='translate(-50%,0)';
      const d=camera.position.distanceTo(g.userData.center);
      el.style.opacity=Math.max(.2,Math.min(.8,1-(d-3)/12));
    });
  }

  // ============================================
  // INTERACTION
  // ============================================
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  renderer.domElement.addEventListener('pointermove', e => {
    const r=renderer.domElement.getBoundingClientRect();
    mouse.x=((e.clientX-r.left)/r.width)*2-1; mouse.y=-((e.clientY-r.top)/r.height)*2+1;
    raycaster.setFromCamera(mouse,camera);
    const hits=raycaster.intersectObjects(hitMeshes);
    const nH=hits.length>0?hits[0].object.userData.cid:null;
    if(nH!==hoveredConstellation){
      if(hoveredConstellation)updateVisuals(cGroups[hoveredConstellation-1],!!completionState[hoveredConstellation],false);
      if(nH){updateVisuals(cGroups[nH-1],!!completionState[nH],true);renderer.domElement.style.cursor='pointer';}
      else renderer.domElement.style.cursor='grab';
      hoveredConstellation=nH;
    }
  });
  renderer.domElement.addEventListener('click', ()=>{
    if(hoveredConstellation){
      const p=document.querySelector('.mission-panel[data-mission="'+hoveredConstellation+'"]');
      if(p){const t=p.querySelector('.mission-trigger');if(t&&!p.classList.contains('active'))t.click();p.scrollIntoView({behavior:'smooth',block:'center'});}
    }
  });
  renderer.domElement.addEventListener('contextmenu', e=>{
    e.preventDefault();
    if(hoveredConstellation){
      completionState[hoveredConstellation]=!completionState[hoveredConstellation];
      updateVisuals(cGroups[hoveredConstellation-1],completionState[hoveredConstellation],true);
      if(completionState[hoveredConstellation])burst(cGroups[hoveredConstellation-1].userData.center);
      const c=document.querySelector('.progress-counter');
      if(c)c.textContent=Object.values(completionState).filter(Boolean).length+' of 15 Constellations Restored';
    }
  });
  let touchTimer;
  renderer.domElement.addEventListener('touchstart',e=>{const t=e.touches[0],r=renderer.domElement.getBoundingClientRect();mouse.x=((t.clientX-r.left)/r.width)*2-1;mouse.y=-((t.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);const h=raycaster.intersectObjects(hitMeshes);if(h.length>0){hoveredConstellation=h[0].object.userData.cid;touchTimer=setTimeout(()=>{completionState[hoveredConstellation]=!completionState[hoveredConstellation];updateVisuals(cGroups[hoveredConstellation-1],completionState[hoveredConstellation],true);if(completionState[hoveredConstellation])burst(cGroups[hoveredConstellation-1].userData.center);const c=document.querySelector('.progress-counter');if(c)c.textContent=Object.values(completionState).filter(Boolean).length+' of 15 Constellations Restored';},600);}});
  renderer.domElement.addEventListener('touchend',()=>clearTimeout(touchTimer));
  renderer.domElement.addEventListener('touchmove',()=>clearTimeout(touchTimer));

  // ============================================
  // INIT & ANIMATE
  // ============================================
  createVoxelSpaceDust();
  const galaxy = createVoxelGalaxy();
  createNebulae();
  C.forEach(buildConstellation);
  createLabels();

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;
    controls.update();
    galaxy.rotation.y = time * 0.015;

    // Twinkle lit constellations
    cGroups.forEach((g,i) => {
      if(completionState[g.userData.id]) {
        const p = .9+Math.sin(time*8+i*1.3)*.1;
        g.children.forEach(c => { if(c.isSprite) c.scale.setScalar(.2*p); });
      }
    });

    updateMeteors();
    updateLabels();
    renderer.render(scene,camera);
  }
  animate();

  window.addEventListener('resize',()=>{
    const w=container.clientWidth,h=container.clientHeight;
    camera.aspect=w/h; camera.updateProjectionMatrix();
    renderer.setSize(w,h);
  });
})();
