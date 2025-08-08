
/* extra.js - initializes Three.js background, VanillaTilt and GSAP scroll animations */

(function(){
  // --- Three.js Background ---
  const canvas = document.getElementById('three-bg');
  if (canvas) {
    let scene, camera, renderer, mesh, light;
    const width = () => window.innerWidth;
    const height = () => Math.max(window.innerHeight * 0.85, 600);

    function initThree(){
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width()/height(), 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
      renderer.setSize(width(), height());
      renderer.setClearColor(0x000000, 0); // transparent

      // geometry
      const geo = new THREE.IcosahedronGeometry(6, 2);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x7C3AED,
        emissive: 0x2b0b3a,
        metalness: 0.2,
        roughness: 0.3,
        transparent: true,
        opacity: 0.95,
        flatShading: true
      });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // particles (small)
      const particles = new THREE.BufferGeometry();
      const count = 220;
      const positions = new Float32Array(count * 3);
      for (let i=0;i<count;i++){
        positions[i*3] = (Math.random()-0.5) * 80;
        positions[i*3+1] = (Math.random()-0.5) * 35;
        positions[i*3+2] = (Math.random()-0.5) * 40 - 20;
      }
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.6, color: 0x9b7cf5, transparent:true, opacity:0.6 });
      const points = new THREE.Points(particles, pMat);
      scene.add(points);

      light = new THREE.DirectionalLight(0xffffff, 0.9);
      light.position.set(5,10,7);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x555555, 0.6));

      camera.position.z = 30;
      onResize();
    }

    function onResize(){
      if (!renderer) return;
      renderer.setSize(width(), height());
      camera.aspect = width()/height();
      camera.updateProjectionMatrix();
    }

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e)=>{
      const cx = (e.clientX / window.innerWidth) - 0.5;
      const cy = (e.clientY / window.innerHeight) - 0.5;
      mouseX = cx * 20;
      mouseY = -cy * 10;
    });

    function animate(){
      requestAnimationFrame(animate);
      if (!mesh) return;
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      mesh.rotation.z += 0.001;

      // subtle parallax
      mesh.position.x += (mouseX - mesh.position.x) * 0.03;
      mesh.position.y += (mouseY - mesh.position.y) * 0.03;

      renderer.render(scene, camera);
    }

    initThree();
    animate();
    window.addEventListener('resize', onResize);
  }

  // --- Vanilla Tilt on portfolio items ---
  try {
    const items = document.querySelectorAll('.portfolio-item');
    if (items.length) {
      VanillaTilt.init(items, {
        max: 12,
        speed: 350,
        glare: true,
        "max-glare": 0.12,
        scale: 1.02,
        perspective: 900
      });
    }
  } catch(e){ console.warn("VanillaTilt init failed:", e); }

  // --- GSAP Scroll Animations ---
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // headings pop with a slight 3D rotation
    gsap.utils.toArray('.heading, .heading-h2, .heading-h3, .subheading').forEach(el=>{
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: 60,
        opacity: 0,
        rotateX: -12,
        duration: 0.9,
        ease: "power3.out"
      });
    });

    // portfolio items float in
    gsap.utils.toArray('#posts .item').forEach((item, i)=>{
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: i*0.04,
        ease: "power2.out"
      });
    });
  }

  // --- Cursor glow ---
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  window.addEventListener('mousemove', (e)=>{
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

})();
