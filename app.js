// Shared navbar + footer injection; active link highlighting; lightbox; basic data rendering.
(function(){
  const navHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm af-nav">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2" href="/index.html">
        <img src="/assets/logo.svg" width="28" height="28" alt="AeroFlux"/> <span class="brand">AeroFlux</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="/models.html">Models</a></li>
          <li class="nav-item"><a class="nav-link" href="/tech.html">Tech</a></li>
          <li class="nav-item"><a class="nav-link" href="/preorder.html">Preorder</a></li>
          <li class="nav-item"><a class="nav-link" href="/about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="/faq.html">FAQ</a></li>
          <li class="nav-item"><a class="nav-link" href="/contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>`;

  const footerHTML = `
  <footer class="py-5 bg-dark text-white-50 mt-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4"><h5 class="text-white">AeroFlux</h5><p class="small">EV that lifts. Student‑friendly. Safety‑first.</p></div>
        <div class="col-md-4"><h6 class="text-white">Explore</h6><ul class="list-unstyled small"><li><a class="link-light link-opacity-75" href="/models.html">Models</a></li><li><a class="link-light link-opacity-75" href="/tech.html">Tech</a></li></ul></div>
        <div class="col-md-4"><h6 class="text-white">Support</h6><ul class="list-unstyled small"><li><a class="link-light link-opacity-75" href="/faq.html">FAQ</a></li><li><a class="link-light link-opacity-75" href="/contact.html">Contact</a></li></ul></div>
      </div>
      <div class="small text-center mt-4">© <span id="year"></span> AeroFlux</div>
    </div>
  </footer>`;

  // Inject where placeholders exist
  const navHolder = document.getElementById('_navbar');
  if(navHolder) navHolder.outerHTML = navHTML;
  const footHolder = document.getElementById('_footer');
  if(footHolder) footHolder.outerHTML = footerHTML;
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // Active nav link
  const path = location.pathname.replace(/\/$/, '/index.html');
  document.querySelectorAll('.navbar .nav-link').forEach(a=>{ if(path.endsWith(a.getAttribute('href'))) a.classList.add('active'); });

  // Lightbox modal
  const lb = document.getElementById('lightbox');
  if(lb){
    lb.addEventListener('show.bs.modal', e=>{
      const btn = e.relatedTarget; if(!btn) return;
      document.getElementById('lbImg').src = btn.dataset.img;
      document.getElementById('lbTitle').textContent = btn.dataset.title || '';
    });
  } else {
    const alt = document.getElementById('_lightbox');
    if(alt){
      alt.innerHTML = `
      <div class="modal fade" id="lightbox" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content bg-black">
            <button class="btn-close btn-close-white ms-auto me-2 mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body p-0"><img id="lbImg" class="w-100 h-100 object-fit-contain" alt="Preview"/><div class="p-3 text-white-50" id="lbTitle"></div></div>
          </div>
        </div>
      </div>`;
    }
  }

  // Render models grid (placeholder data)
  const grid = document.getElementById('gridModels');
  if(grid){
    const items = [
      {t:'AeroFlux One', p:79000, img:'https://images.unsplash.com/photo-1517173894763-6bcf0d6f3bf0?w=1600&q=80'},
      {t:'AeroFlux S', p:99000, img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80'},
      {t:'AeroFlux X', p:119000, img:'https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=1600&q=80'}
    ];
    grid.innerHTML = items.map(i=>`
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card af-card h-100">
          <img class="card-img-top" src="${i.img}" alt="${i.t}"/>
          <div class="card-body">
            <h5 class="card-title mb-1">${i.t}</h5>
            <p class="text-muted small mb-3">Premium VTOL EV • Quiet rotors • Smart safety</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">$${i.p.toLocaleString()}</span>
              <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#lightbox" data-img="${i.img}" data-title="${i.t}">Preview</button>
            </div>
          </div>
        </div>
      </div>`).join('');
  }

  // Form validation for preorder/contact
  (()=>{
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form=>{
      form.addEventListener('submit', e=>{ if(!form.checkValidity()){ e.preventDefault(); e.stopPropagation(); } form.classList.add('was-validated'); });
    });
  })();
})();
