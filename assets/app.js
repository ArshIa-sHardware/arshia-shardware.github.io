// Shared layout, lightbox utilities, content rendering, and concierge chat widget.
(function(){
  const navHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark af-nav fixed-top">
    <div class="container-xl">
      <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
        <img src="assets/logo.svg" width="32" height="32" alt="AeroFlux"/>
        <span class="brand">AeroFlux Air</span>
      </a>
      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#afNav" aria-controls="afNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="afNav">
        <ul class="navbar-nav ms-auto me-lg-4">
          <li class="nav-item"><a class="nav-link" data-nav="index.html" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="models.html" href="models.html">Models</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="tech.html" href="tech.html">Tech</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="preorder.html" href="preorder.html">Preorder</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="about.html" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="faq.html" href="faq.html">FAQ</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="contact.html" href="contact.html">Contact</a></li>
        </ul>
        <div class="d-lg-flex">
          <a class="btn btn-sm btn-primary w-100 w-lg-auto" href="preorder.html">Reserve a seat</a>
        </div>
      </div>
    </div>
  </nav>`;

  const footerHTML = `
  <footer class="af-footer mt-5">
    <div class="container-xl">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="d-flex align-items-center gap-2 mb-3">
            <img src="assets/logo.svg" width="32" height="32" alt="AeroFlux logo"/>
            <span class="brand">AeroFlux Air</span>
          </div>
          <p class="small text-white-50 mb-4">Vertical mobility crafted like your favorite streaming service — flexible, cinematic, and concierge supported.</p>
        </div>
        <div class="col-6 col-md-4">
          <h6 class="text-white">Explore</h6>
          <ul class="list-unstyled small text-white-50 mb-0">
            <li><a class="link-light link-opacity-75" href="models.html">Fleet lineup</a></li>
            <li><a class="link-light link-opacity-75" href="tech.html">Technology</a></li>
            <li><a class="link-light link-opacity-75" href="preorder.html">Membership</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4">
          <h6 class="text-white">Support</h6>
          <ul class="list-unstyled small text-white-50 mb-0">
            <li><a class="link-light link-opacity-75" href="faq.html">FAQs</a></li>
            <li><a class="link-light link-opacity-75" href="contact.html">Concierge desk</a></li>
          </ul>
        </div>
      </div>
      <div class="af-footer-meta small text-white-50 mt-4">© <span id="year"></span> AeroFlux Air. All rights reserved.</div>
    </div>
  </footer>`;

  // Inject navigation & footer if placeholders exist
  const navHolder = document.getElementById('_navbar');
  if(navHolder){
    navHolder.outerHTML = navHTML;
  } else if(!document.querySelector('.af-nav')){
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  const footHolder = document.getElementById('_footer');
  if(footHolder){
    footHolder.outerHTML = footerHTML;
  } else if(!document.querySelector('.af-footer')){
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Highlight active nav item
  const path = location.pathname.replace(/\/$/, '/index.html');
  document.querySelectorAll('[data-nav]').forEach(link => {
    const target = link.getAttribute('data-nav');
    if(target && path.endsWith(target)){
      link.classList.add('active');
    }
  });

  // Lightbox modal for preview buttons
  const lb = document.getElementById('lightbox');
  if(lb){
    lb.addEventListener('show.bs.modal', e => {
      const btn = e.relatedTarget;
      if(!btn) return;
      const img = lb.querySelector('#lbImg');
      const title = lb.querySelector('#lbTitle');
      if(img) img.src = btn.dataset.img || '';
      if(title) title.textContent = btn.dataset.title || '';
    });
  } else {
    const alt = document.getElementById('_lightbox');
    if(alt && !alt.querySelector('#lightbox')){
      alt.innerHTML = `
      <div class="modal fade" id="lightbox" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content bg-black">
            <button class="btn-close btn-close-white ms-auto me-2 mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body p-0">
              <img id="lbImg" class="w-100 h-100 object-fit-contain" alt="Preview"/>
              <div class="p-3 text-white-50" id="lbTitle"></div>
            </div>
          </div>
        </div>
      </div>`;
    }
  }

  // Render models grid on the models page
  const grid = document.getElementById('gridModels');
  if(grid){
    const items = [
      {t:'AeroFlux One', p:79000, img:'https://images.unsplash.com/photo-1517173894763-6bcf0d6f3bf0?w=1600&q=80'},
      {t:'AeroFlux S', p:99000, img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80'},
      {t:'AeroFlux X', p:119000, img:'https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=1600&q=80'}
    ];
    grid.innerHTML = items.map(i => `
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

  // Bootstrap validation helpers for forms
  (() => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if(!form.checkValidity()){
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    });
  })();

  // Concierge chat widget
  if(document.body){
    const chatMarkup = `
      <button type="button" class="af-chat-toggle" aria-expanded="false" aria-controls="afChatWindow">
        <span class="af-chat-spark" aria-hidden="true">✦</span>
        <span class="af-chat-toggle-text">
          <span class="label">Nova Concierge</span>
          <span class="status">Online</span>
        </span>
      </button>
      <section class="af-chat" id="afChatWindow" role="dialog" aria-label="AeroFlux concierge chat" aria-live="polite" aria-hidden="true">
        <header class="af-chat-header">
          <div>
            <div class="af-chat-title">Nova • Flight Concierge</div>
            <div class="af-chat-subtitle">Ask about flights, pricing, or training</div>
          </div>
          <button class="af-chat-close" type="button" aria-label="Close chat">×</button>
        </header>
        <div class="af-chat-log" id="afChatLog"></div>
        <div class="af-chat-suggestions" role="list">
          <button type="button" data-chat-message="What's included in the membership?">Membership perks</button>
          <button type="button" data-chat-message="How soon can I reserve a flight?">Reserve a flight</button>
          <button type="button" data-chat-message="Do I need a pilot license?">Pilot requirements</button>
        </div>
        <div class="af-chat-typing" id="afChatTyping" aria-hidden="true">Nova is typing…</div>
        <form class="af-chat-form" id="afChatForm">
          <label for="afChatInput" class="visually-hidden">Type a message</label>
          <input type="text" id="afChatInput" class="form-control" placeholder="Message Nova…" autocomplete="off" required/>
          <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </section>`;

    document.body.insertAdjacentHTML('beforeend', chatMarkup);

    const chatToggle = document.querySelector('.af-chat-toggle');
    const chatWindow = document.getElementById('afChatWindow');
    const chatClose = chatWindow.querySelector('.af-chat-close');
    const chatForm = document.getElementById('afChatForm');
    const chatInput = document.getElementById('afChatInput');
    const chatLog = document.getElementById('afChatLog');
    const chatTyping = document.getElementById('afChatTyping');

    const replies = [
      {pattern: /(price|cost|payment|finance|membership)/i, message: 'Membership tiers start at $79k for the AeroFlux One. Financing, fractional ownership, and creator sponsorships are all supported.'},
      {pattern: /(delivery|ship|reserve|preorder|arrival|timeline)/i, message: 'Founding members begin flight training this fall with first customer deliveries projected for Q2 2025.'},
      {pattern: /(license|pilot|training|lesson)/i, message: 'Every member receives hybrid training: simulator sessions online plus two weekends on-site with our FAA-certified crew.'},
      {pattern: /(safety|backup|parachute|redundant|secure)/i, message: 'Each AeroFlux craft carries redundant rotors, a ballistic parachute, and AI envelope protection — all actively monitored by our ops team.'},
      {pattern: /(support|contact|help|human)/i, message: 'You can keep chatting here, email concierge@aeroflux.ai, or schedule a live walkthrough with a pilot any day of the week.'}
    ];
    const fallback = [
      'Great question! I just pinged a human concierge — expect a detailed reply in your inbox within a few minutes.',
      'Thanks for reaching out! I\'ll queue this for a personal follow-up and share a full briefing shortly.',
      'Logged! A teammate will send over tailored specs and next steps before the end of the day.'
    ];

    const appendMessage = (role, text) => {
      const row = document.createElement('div');
      row.className = `af-chat-message ${role}`;
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = text;
      row.appendChild(bubble);
      chatLog.appendChild(row);
      chatLog.scrollTop = chatLog.scrollHeight;
    };

    const getReply = input => {
      for(const item of replies){
        if(item.pattern.test(input)) return item.message;
      }
      return fallback[Math.floor(Math.random() * fallback.length)];
    };

    const setTyping = isTyping => {
      chatTyping.classList.toggle('is-visible', isTyping);
      chatTyping.setAttribute('aria-hidden', String(!isTyping));
    };

    const openChat = () => {
      chatWindow.classList.add('is-open');
      chatWindow.setAttribute('aria-hidden', 'false');
      chatToggle.setAttribute('aria-expanded', 'true');
      if(chatInput){
        setTimeout(() => chatInput.focus(), 150);
      }
    };

    const closeChat = () => {
      chatWindow.classList.remove('is-open');
      chatWindow.setAttribute('aria-hidden', 'true');
      chatToggle.setAttribute('aria-expanded', 'false');
    };

    const sendUserMessage = value => {
      appendMessage('user', value);
      setTyping(true);
      const replyDelay = 600 + Math.random() * 700;
      setTimeout(() => {
        setTyping(false);
        appendMessage('agent', getReply(value));
      }, replyDelay);
    };

    chatToggle?.addEventListener('click', () => {
      if(chatWindow.classList.contains('is-open')){
        closeChat();
      } else {
        openChat();
      }
    });

    chatClose?.addEventListener('click', () => {
      closeChat();
      chatToggle.focus();
    });

    chatForm?.addEventListener('submit', event => {
      event.preventDefault();
      const value = chatInput.value.trim();
      if(!value) return;
      chatInput.value = '';
      sendUserMessage(value);
    });

    chatWindow.querySelectorAll('[data-chat-message]').forEach(btn => {
      btn.addEventListener('click', () => {
        const message = btn.getAttribute('data-chat-message');
        if(!message) return;
        if(!chatWindow.classList.contains('is-open')) openChat();
        chatInput.value = '';
        sendUserMessage(message);
        if(chatInput){
          setTimeout(() => chatInput.focus(), 200);
        }
      });
    });

    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && chatWindow.classList.contains('is-open')){
        closeChat();
        chatToggle.focus();
      }
    });

    appendMessage('agent', "Hey there, I'm Nova. Ready to guide you through AeroFlux flying cars — ask me anything!");
  }
})();
