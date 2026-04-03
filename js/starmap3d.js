/**
 * THE LOST STAR MAP - 3D Interactive Constellation Map
 * Kingdom of Everbright - First Grade Gameschooling Curriculum
 *
 * Uses Three.js for WebGL rendering with orbit controls.
 * 15 constellations arranged in a celestial sphere.
 * Click constellations to navigate to missions.
 * Right-click to toggle completion.
 */

(function() {
  'use strict';

  // Wait for DOM and Three.js
  if (typeof THREE === 'undefined') return;

  const container = document.getElementById('starmap-3d');
  if (!container) return;

  // ============================================
  // CONFIGURATION
  // ============================================
  const COLORS = {
    background: 0x0a0618,
    starDim: 0x555555,
    starLit: 0xC9A84C,
    starHover: 0xFFD700,
    lineDim: 0x333344,
    lineLit: 0xC9A84C80,
    pathLine: 0x2D1B69,
    nebula1: 0x1a0a3e,
    nebula2: 0x0d1a3d,
    labelColor: '#E8D5A3',
    particleColor: 0xffffff,
  };

  const CONSTELLATION_DATA = [
    { id: 1, name: "First Star", mission: "The Star Map Awakens",
      stars: [[0,2.8,0],[-.3,2.5,.2],[.3,2.5,-.1],[0,2.2,.1],[-.2,2.4,.3]],
      edges: [[0,1],[0,2],[1,3],[2,3],[1,4]] },
    { id: 2, name: "Ziggurat", mission: "Rivers of Knowledge",
      stars: [[-2.5,2,1],[-2.2,1.7,.8],[-2.8,1.7,1.2],[-2.3,1.4,1],[-2.7,1.4,.9],[-2.5,1.1,1]],
      edges: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]] },
    { id: 3, name: "Pyramid", mission: "Gift of the Nile",
      stars: [[2.5,2.2,-1],[2.2,1.6,-.8],[2.8,1.6,-1.2],[2.5,1.6,-1]],
      edges: [[0,1],[0,2],[1,3],[2,3],[1,2]] },
    { id: 4, name: "Sacred Book", mission: "Stories Across the World",
      stars: [[-3,0.8,-.5],[-2.7,1,.3],[-2.7,.6,-.3],[-3.2,1,-.1],[-3.2,.6,-.7]],
      edges: [[0,1],[0,2],[0,3],[0,4],[1,3],[2,4]] },
    { id: 5, name: "Sacred Mountain", mission: "The Mountain Temple",
      stars: [[-1.8,.5,2],[-2.2,.1,1.8],[-1.4,.1,2.2],[-2,-.2,2],[-1.6,-.2,2.1]],
      edges: [[0,1],[0,2],[1,3],[2,4],[3,4]] },
    { id: 6, name: "Jade Sun", mission: "Colors of the Marketplace",
      stars: [[-1,0,-.8],[-.7,.3,-1],[-.7,-.3,-.6],[-1.3,.3,-.6],[-1.3,-.3,-1],[-.8,0,-1.1],[-1.2,0,-.5]],
      edges: [[0,1],[0,2],[0,3],[0,4],[1,5],[2,6],[3,6],[4,5]] },
    { id: 7, name: "Beating Heart", mission: "The Body Adventure",
      stars: [[0,0,0],[-.3,.3,.2],[.3,.3,-.2],[-.5,.1,.1],[.5,.1,-.1],[0,-.4,0]],
      edges: [[1,0],[2,0],[1,3],[2,4],[3,5],[4,5],[1,2]] },
    { id: 8, name: "North Star", mission: "Reading the Stars",
      stars: [[1.5,.3,1],[1.2,.6,.8],[1.8,.6,1.2],[1.2,0,1.2],[1.8,0,.8],[1.5,.8,1]],
      edges: [[0,1],[0,2],[0,3],[0,4],[1,5],[2,5]] },
    { id: 9, name: "Crystal Core", mission: "Deep Below",
      stars: [[3,0,.5],[2.7,.3,.3],[3.3,.3,.7],[2.7,-.3,.7],[3.3,-.3,.3],[3,-.6,.5]],
      edges: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[1,2],[3,4]] },
    { id: 10, name: "Wild Star", mission: "The Wild Kingdom",
      stars: [[-2.5,-1.5,.8],[-2.2,-1.2,1],[-2.8,-1.2,.6],[-2,-1.7,.9],[-3,-1.7,.7],[-2.5,-2,.8]],
      edges: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]] },
    { id: 11, name: "Enchanted Star", mission: "Once Upon a Constellation",
      stars: [[-1,-1.8,-1.5],[-.7,-1.5,-1.3],[-1.3,-1.5,-1.7],[-.8,-2,-1.4],[-1.2,-2,-1.6],[-.7,-1.2,-1.2],[-1.3,-1.2,-1.8]],
      edges: [[0,1],[0,2],[1,3],[2,4],[3,4],[1,5],[2,6]] },
    { id: 12, name: "Eagle", mission: "A New Nation",
      stars: [[0,-1.8,.3],[-.5,-1.5,.5],[.5,-1.5,.1],[-.8,-1.8,.7],[.8,-1.8,-.1],[0,-2.2,.3],[-.3,-1.3,.4],[.3,-1.3,.2]],
      edges: [[0,1],[0,2],[1,3],[2,4],[0,5],[1,6],[2,7],[6,7]] },
    { id: 13, name: "Pioneer", mission: "Westward Ho!",
      stars: [[1.5,-1.8,-.8],[1.2,-1.5,-1],[1.8,-1.5,-.6],[1.2,-2.1,-.6],[1.8,-2.1,-1],[1.5,-1.2,-.8]],
      edges: [[0,1],[0,2],[0,3],[0,4],[1,2],[3,4],[1,5],[2,5]] },
    { id: 14, name: "Full Sky", mission: "Light, Sound & Machines",
      stars: [[2.8,-1.5,-.3],[2.5,-1.2,0],[3.1,-1.2,-.6],[2.5,-1.8,0],[3.1,-1.8,-.6]],
      edges: [[0,1],[0,2],[0,3],[0,4],[1,2],[3,4]] },
    { id: 15, name: "Navigator's Crown", mission: "The Navigator's Crown",
      stars: [[0,-2.8,-.2],[-.4,-2.5,0],[.4,-2.5,-.4],[-.6,-2.7,.2],[.6,-2.7,-.6],[-.2,-2.3,.1],[.2,-2.3,-.3],[0,-2.6,-.1]],
      edges: [[0,3],[0,4],[3,1],[4,2],[1,5],[2,6],[5,7],[6,7],[7,0]] },
  ];

  // ============================================
  // STATE
  // ============================================
  let completionState = {};
  let hoveredConstellation = null;
  const constellationMeshes = [];
  const constellationGroups = [];
  let animationId;

  // ============================================
  // SCENE SETUP
  // ============================================
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.background);
  scene.fog = new THREE.FogExp2(COLORS.background, 0.06);

  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // ============================================
  // ORBIT CONTROLS
  // ============================================
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.8;
  controls.minDistance = 3;
  controls.maxDistance = 12;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.15;
  controls.enablePan = false;

  // ============================================
  // BACKGROUND STARS (particles)
  // ============================================
  function createBackgroundStars() {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute on a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 25;
      positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 0.5;
      // Mix white, pale blue, pale gold
      const colorChoice = Math.random();
      if (colorChoice < 0.6) { colors[i*3]=1; colors[i*3+1]=1; colors[i*3+2]=1; }
      else if (colorChoice < 0.8) { colors[i*3]=0.72; colors[i*3+1]=0.83; colors[i*3+2]=0.89; }
      else { colors[i*3]=0.95; colors[i*3+1]=0.88; colors[i*3+2]=0.65; }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
    return stars;
  }

  // ============================================
  // NEBULA CLOUDS
  // ============================================
  function createNebula() {
    const nebulaGroup = new THREE.Group();
    const nebulaColors = [0x1a0a4e, 0x0d1a4d, 0x2a0a2e, 0x0a1a3e];

    for (let i = 0; i < 8; i++) {
      const geo = new THREE.SphereGeometry(2 + Math.random() * 3, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: nebulaColors[i % nebulaColors.length],
        transparent: true,
        opacity: 0.03 + Math.random() * 0.04,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      mesh.scale.set(1 + Math.random(), 0.5 + Math.random() * 0.5, 1 + Math.random());
      nebulaGroup.add(mesh);
    }
    scene.add(nebulaGroup);
    return nebulaGroup;
  }

  // ============================================
  // CONSTELLATION BUILDER
  // ============================================
  function createConstellation(data) {
    const group = new THREE.Group();
    group.userData = { id: data.id, name: data.name, mission: data.mission };

    const isLit = completionState[data.id] || false;
    const starColor = isLit ? COLORS.starLit : COLORS.starDim;
    const lineColor = isLit ? 0xC9A84C : COLORS.lineDim;
    const lineOpacity = isLit ? 0.6 : 0.2;
    const starOpacity = isLit ? 1.0 : 0.4;

    // Star nodes (spheres with glow)
    const starMeshes = [];
    data.stars.forEach((pos, idx) => {
      // Core sphere
      const coreGeo = new THREE.SphereGeometry(0.05, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: starColor,
        transparent: true,
        opacity: starOpacity,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(pos[0], pos[1], pos[2]);

      // Glow sprite
      const spriteMat = new THREE.SpriteMaterial({
        color: starColor,
        transparent: true,
        opacity: starOpacity * 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.copy(core.position);
      sprite.scale.set(0.25, 0.25, 1);

      group.add(core);
      group.add(sprite);
      starMeshes.push(core);
    });

    // Connecting lines
    data.edges.forEach(([a, b]) => {
      const points = [
        new THREE.Vector3(...data.stars[a]),
        new THREE.Vector3(...data.stars[b])
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: lineOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);
    });

    // Invisible click target (large sphere at center)
    const center = new THREE.Vector3();
    data.stars.forEach(s => center.add(new THREE.Vector3(...s)));
    center.divideScalar(data.stars.length);

    const hitGeo = new THREE.SphereGeometry(0.6, 8, 8);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.position.copy(center);
    hitMesh.userData = { constellationId: data.id, constellationGroup: group };
    group.add(hitMesh);
    constellationMeshes.push(hitMesh);

    // Label (HTML overlay, positioned later)
    group.userData.center = center;
    group.userData.starMeshes = starMeshes;

    scene.add(group);
    constellationGroups.push(group);
    return group;
  }

  function updateConstellationAppearance(group, isLit, isHovered) {
    const color = isHovered ? COLORS.starHover : (isLit ? COLORS.starLit : COLORS.starDim);
    const lineColor = isHovered ? COLORS.starHover : (isLit ? COLORS.starLit : COLORS.lineDim);
    const opacity = isLit || isHovered ? 1.0 : 0.4;
    const lineOpacity = isLit || isHovered ? 0.7 : 0.2;
    const scale = isHovered ? 1.3 : 1.0;

    group.children.forEach(child => {
      if (child.isMesh && child.material.visible !== false) {
        child.material.color.setHex(color);
        child.material.opacity = opacity;
      }
      if (child.isSprite) {
        child.material.color.setHex(color);
        child.material.opacity = opacity * 0.6;
        child.scale.set(0.25 * scale, 0.25 * scale, 1);
      }
      if (child.isLine) {
        child.material.color.setHex(lineColor);
        child.material.opacity = lineOpacity;
      }
    });
  }

  // ============================================
  // STARLIGHT PATHS (faint connections between constellations)
  // ============================================
  function createStarlightPaths() {
    const pathGroup = new THREE.Group();
    const connections = [
      [0,1],[0,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],
      [6,11],[9,10],[10,11],[11,12],[12,13],[6,14],[14,0]
    ];

    connections.forEach(([a, b]) => {
      const cA = constellationGroups[a]?.userData.center;
      const cB = constellationGroups[b]?.userData.center;
      if (!cA || !cB) return;

      // Create dashed line
      const points = [cA.clone(), cB.clone()];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineDashedMaterial({
        color: 0x2D1B69,
        transparent: true,
        opacity: 0.15,
        dashSize: 0.15,
        gapSize: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      pathGroup.add(line);
    });

    scene.add(pathGroup);
  }

  // ============================================
  // HTML LABELS OVERLAY
  // ============================================
  const labelsContainer = document.createElement('div');
  labelsContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
  container.style.position = 'relative';
  container.appendChild(labelsContainer);

  const labelElements = [];

  function createLabels() {
    constellationGroups.forEach((group, i) => {
      const label = document.createElement('div');
      label.style.cssText = 'position:absolute;font-family:Merriweather,serif;font-size:10px;color:#E8D5A3;text-align:center;white-space:nowrap;opacity:0.7;transition:opacity 0.3s,transform 0.3s;text-shadow:0 0 8px rgba(10,6,24,0.9);pointer-events:none;';
      label.textContent = 'M' + group.userData.id + ': ' + group.userData.name;
      labelsContainer.appendChild(label);
      labelElements.push({ el: label, group: group });
    });
  }

  function updateLabels() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    labelElements.forEach(({ el, group }) => {
      const center = group.userData.center.clone();
      center.project(camera);

      const x = (center.x * 0.5 + 0.5) * w;
      const y = (-center.y * 0.5 + 0.5) * h;

      // Hide if behind camera
      if (center.z > 1) {
        el.style.display = 'none';
        return;
      }

      el.style.display = 'block';
      el.style.left = x + 'px';
      el.style.top = (y + 20) + 'px';
      el.style.transform = 'translate(-50%, 0)';

      // Scale opacity by distance
      const dist = camera.position.distanceTo(group.userData.center);
      const opacity = Math.max(0.3, Math.min(0.9, 1 - (dist - 3) / 10));
      el.style.opacity = opacity;
      el.style.fontSize = dist < 5 ? '11px' : '9px';
    });
  }

  // ============================================
  // RAYCASTER (click/hover)
  // ============================================
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(constellationMeshes);

    const newHovered = intersects.length > 0 ? intersects[0].object.userData.constellationId : null;

    if (newHovered !== hoveredConstellation) {
      // Un-hover old
      if (hoveredConstellation !== null) {
        const oldGroup = constellationGroups[hoveredConstellation - 1];
        if (oldGroup) updateConstellationAppearance(oldGroup, !!completionState[hoveredConstellation], false);
      }
      // Hover new
      if (newHovered !== null) {
        const newGroup = constellationGroups[newHovered - 1];
        if (newGroup) updateConstellationAppearance(newGroup, !!completionState[newHovered], true);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'grab';
      }
      hoveredConstellation = newHovered;
    }
  }

  function onClick(event) {
    if (hoveredConstellation !== null) {
      // Scroll to the mission panel
      const panel = document.querySelector('.mission-panel[data-mission="' + hoveredConstellation + '"]');
      if (panel) {
        // Open the accordion
        const trigger = panel.querySelector('.mission-trigger');
        if (trigger && !panel.classList.contains('active')) {
          trigger.click();
        }
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  function onContextMenu(event) {
    event.preventDefault();
    if (hoveredConstellation !== null) {
      completionState[hoveredConstellation] = !completionState[hoveredConstellation];
      const group = constellationGroups[hoveredConstellation - 1];
      if (group) {
        updateConstellationAppearance(group, completionState[hoveredConstellation], true);

        // Burst effect on completion
        if (completionState[hoveredConstellation]) {
          createCompletionBurst(group.userData.center);
        }
      }
      updateProgressCounter();
    }
  }

  // ============================================
  // COMPLETION BURST EFFECT
  // ============================================
  function createCompletionBurst(position) {
    const count = 30;
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i*3] = position.x;
      positions[i*3+1] = position.y;
      positions[i*3+2] = position.z;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      ));
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: COLORS.starLit,
      size: 0.06,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let frame = 0;
    function animateBurst() {
      frame++;
      const posArr = particles.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        posArr[i*3] += velocities[i].x;
        posArr[i*3+1] += velocities[i].y;
        posArr[i*3+2] += velocities[i].z;
        velocities[i].multiplyScalar(0.96);
      }
      particles.geometry.attributes.position.needsUpdate = true;
      mat.opacity = Math.max(0, 1 - frame / 60);

      if (frame < 60) {
        requestAnimationFrame(animateBurst);
      } else {
        scene.remove(particles);
        geo.dispose();
        mat.dispose();
      }
    }
    animateBurst();
  }

  // ============================================
  // PROGRESS COUNTER
  // ============================================
  function updateProgressCounter() {
    const count = Object.values(completionState).filter(Boolean).length;
    const counter = document.querySelector('.progress-counter');
    if (counter) {
      counter.textContent = count + ' of 15 Constellations Restored';
    }
  }

  // ============================================
  // TWINKLING ANIMATION
  // ============================================
  let time = 0;

  function animateConstellations() {
    time += 0.016;
    constellationGroups.forEach((group, idx) => {
      const isLit = completionState[group.userData.id];
      if (isLit) {
        // Gentle pulse for lit constellations
        const pulse = 0.9 + Math.sin(time * 2 + idx) * 0.1;
        group.children.forEach(child => {
          if (child.isSprite) {
            const baseScale = hoveredConstellation === group.userData.id ? 0.325 : 0.25;
            child.scale.set(baseScale * pulse, baseScale * pulse, 1);
          }
        });
      }
    });
  }

  // ============================================
  // AMBIENT LIGHT ROTATION (subtle color shift)
  // ============================================
  const ambientLight = new THREE.AmbientLight(0x111122, 0.3);
  scene.add(ambientLight);

  // ============================================
  // ANIMATION LOOP
  // ============================================
  function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update();
    animateConstellations();
    updateLabels();
    renderer.render(scene, camera);
  }

  // ============================================
  // RESIZE HANDLER
  // ============================================
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', onResize);
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('click', onClick);
  renderer.domElement.addEventListener('contextmenu', onContextMenu);

  // Touch support for long-press (completion toggle)
  let touchTimer;
  renderer.domElement.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(constellationMeshes);
    if (intersects.length > 0) {
      hoveredConstellation = intersects[0].object.userData.constellationId;
      touchTimer = setTimeout(function() {
        onContextMenu(e);
      }, 600);
    }
  });
  renderer.domElement.addEventListener('touchend', function() {
    clearTimeout(touchTimer);
  });
  renderer.domElement.addEventListener('touchmove', function() {
    clearTimeout(touchTimer);
  });

  // ============================================
  // INITIALIZATION
  // ============================================
  createBackgroundStars();
  createNebula();
  CONSTELLATION_DATA.forEach(createConstellation);
  createStarlightPaths();
  createLabels();
  animate();

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    cancelAnimationFrame(animationId);
    renderer.dispose();
  });

})();
