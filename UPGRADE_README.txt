
Upgraded portfolio files created:

Files:
- index_upgraded.html   (updated index with 3D canvas + enhancements)
- css/extra.css         (additional styles: glass, tilt, responsive tweaks)
- js/extra.js           (Three.js background, VanillaTilt init, GSAP animations)

How to test:
1. Open index_upgraded.html in a modern browser (Chrome/Firefox).
2. Ensure your original css/ and js/ vendor files (from the template) remain in the same relative paths as before.
3. You do NOT need a server for basic testing; open the file directly. For some browsers, Three.js may require serving over `http` — if the 3D background doesn't appear, run a local server:
   - Python 3: `python -m http.server 8000` from the project folder, then visit http://localhost:8000/index_upgraded.html

Notes:
- I used CDNs for Three.js, GSAP and VanillaTilt so you need internet while testing.
- If you want me to fully replace the original index.html (instead of creating index_upgraded.html), say "replace", and I'll overwrite it.
