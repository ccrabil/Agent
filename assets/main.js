/* ALL IS AI — shared interactions + cinematic brand layer */
(function () {
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  /* Pause canvas loops when off-screen (performance) */
  function loopWhenVisible(el, frame) {
    var visible = false, running = false;
    function tick(tm) {
      if (!visible) { running = false; return; }
      frame(tm);
      requestAnimationFrame(tick);
    }
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !running) { running = true; requestAnimationFrame(tick); }
    }, { rootMargin: '80px' }).observe(el);
  }

  /* ---------- Nav: current page highlight + theme color ---------- */
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href').split('#')[0] === here) a.classList.add('active');
  });
  if (!document.querySelector('meta[name=theme-color]')) {
    var tc = document.createElement('meta');
    tc.name = 'theme-color'; tc.content = '#FAF9F6';
    document.head.appendChild(tc);
  }

  /* ---------- Mobile nav ---------- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav-burger');
  if (burger) burger.addEventListener('click', function () { nav.classList.toggle('open'); });

  /* ---------- Data-driven index sections ---------- */
  function el(id) { return document.getElementById(id); }
  function fill(id, html) { var e = el(id); if (e) e.innerHTML = html; }

  fill('float-layer',
    [['fc2','warn','!','Shadow AI detected','3 unregistered systems · marketing'],
     ['fc3','info','◉','Policy enforced','permission scope reduced · live'],
     ['fc4','ok','✓','Outcome verified','€4,800 revenue · evidence sealed']]
    .map(function (c) { return '<div class="float-card ' + c[0] + '"><span class="ic ' + c[1] + '">' + c[2] + '</span><span>' + c[3] + '<small>' + c[4] + '</small></span></div>'; }).join(''));

  fill('hud-chips',
    [['128','','','AI AGENTS','↑ 18%',''],
     ['342','','','MODELS','↑ 21%',''],
     ['2.4','1','K','OUTCOMES','↑ 24%',''],
     ['28','','%','ROI','vs last 30 days',' neu']]
    .map(function (c) {
      var pre = c[0] === '28' ? ' data-pre="+"' : '';
      return '<div class="hud-chip"><span class="num" data-count="' + c[0] + '"' + (c[1] ? ' data-dec="' + c[1] + '"' : '') + (c[2] ? ' data-suf="' + c[2] + '"' : '') + pre + '>0</span><span class="cap">' + c[3] + '</span><span class="delta' + c[5] + '">' + c[4] + '</span></div>';
    }).join(''));

  fill('hiw-steps',
    [['Connect', 'Integrate agents, models, APIs, cloud platforms, and business systems through SDKs, connectors, and telemetry.'],
     ['Observe', 'Capture actions, costs, permissions, outputs, and outcomes in real time.'],
     ['Understand', 'Map every system to its owner, purpose, risk level, cost center, and objective.'],
     ['Control', 'Apply policies, approvals, alerts, limits, budgets, and intervention rules.'],
     ['Prove', 'Generate auditable evidence of performance, ROI, security, and verified value.']]
    .map(function (s2, i) { return '<div class="step"><span class="step-num">STEP 0' + (i + 1) + '</span><h4>' + s2[0] + '</h4><p>' + s2[1] + '</p></div>'; }).join(''));

  fill('why-strip',
    [['AI-native by design', 'Built for autonomous agents — not user seats.'],
     ['Business & technical truth together', 'Telemetry meets outcomes, cost, and risk.'],
     ['Vendor-independent', 'Measured by evidence, not the vendor’s own reporting.'],
     ['From observation to control', 'Policies, limits, and intervention — not just charts.'],
     ['Evidence, not claims', 'Defensible proof of what AI did and what it was worth.']]
    .map(function (w, i) { return '<div class="why-row reveal"><span class="wn">0' + (i + 1) + '</span><strong>' + w[0] + '</strong><span class="wc">' + w[1] + '</span></div>'; }).join(''));

  fill('role-grid',
    [['CIO / CTO', 'Know which AI systems exist, how they connect, and whether they perform reliably.'],
     ['CISO', 'Understand permissions, sensitive access, behavioral anomalies, and security exposure.'],
     ['CFO', 'Measure total AI spend, unit economics, savings, revenue impact, and ROI.'],
     ['Compliance', 'Maintain policies, approvals, evidence, control history, and audit-ready reporting.'],
     ['Procurement', 'Compare vendor claims, costs, performance, risk, and verified outcomes.'],
     ['Business Leaders', 'See which AI systems create measurable value and which should be improved or removed.'],
     ['AI Vendors', 'Prove value, support outcome-based pricing, and build enterprise trust.']]
    .map(function (r, i) { return '<div class="card role-card reveal reveal-d' + (i % 3) + '"><h3 class="h4">' + r[0] + '</h3><p>' + r[1] + '</p></div>'; }).join(''));

  function metric(k, v, d, cls, pre, suf) {
    return '<div class="metric"><div class="k">' + k + '</div><div class="v" data-count="' + v + '"' + (pre ? ' data-pre="' + pre + '"' : '') + (suf ? ' data-suf="' + suf + '"' : '') + '>0</div><div class="d ' + cls + '">' + d + '</div></div>';
  }
  fill('dm1',
    metric('Total AI systems', 312, '↑ 14 this month', 'up') +
    metric('Active AI agents', 128, '↑ 18%', 'up') +
    metric('Monthly AI cost', 184, '↑ 6% vs budget', 'warn', '€', 'K') +
    metric('Verified outcomes', 2431, '↑ 24%', 'up') +
    metric('Estimated ROI', 28, 'vs last 30 days', 'neutral', '+', '%'));
  fill('dm2',
    metric('Foundation models', 42, '9 vendors', 'neutral') +
    metric('Open risks', 7, '2 high severity', 'risk" style="color:#ff7a7a;') +
    metric('Awaiting approval', 11, 'systems', 'neutral') +
    metric('Certification status', 61, 'Verified or above', 'up', '', '%'));

  var TABS = [
    ['Enterprises', 'Build a complete inventory of AI across the company, control security and permissions, compare vendors, measure ROI, enforce governance, and give leadership one trusted view.', 'enterprise.html', 'Explore Enterprise',
     [['Full AI inventory', 'including shadow AI'], ['Security & permission control', 'across every system'], ['ROI and cost', 'by department, vendor, and workflow'], ['One executive view', 'leadership can trust']]],
    ['AI Companies', 'Track cost, prove customer outcomes, create transparent value reports, support flexible pricing models, improve margins, and meet enterprise security requirements.', 'ai-companies.html', 'Explore AI Companies',
     [['Cost attribution', 'per customer, agent, and workflow'], ['Verified outcome reports', 'customers accept'], ['Usage, outcome, and hybrid pricing', 'support'], ['Enterprise trust', 'built on evidence']]],
    ['Governments', 'Create visibility, accountability, auditability, procurement evidence, security oversight, and consistent standards across public-sector AI deployments.', 'public-sector.html', 'Explore Public Sector',
     [['Accountable AI deployment', 'with audit trails'], ['Procurement evidence', 'for vendor decisions'], ['Security oversight', 'across agencies'], ['Consistent standards', 'for public trust']]],
    ['Regulated Industries', 'Connect operational AI activity with compliance controls, evidence trails, human oversight, risk monitoring, and executive reporting.', 'enterprise.html#regulated', 'Explore Regulated Industries',
     [['Compliance controls', 'tied to real AI activity'], ['Evidence trails', 'ready for audit'], ['Human oversight', 'where it is required'], ['Risk monitoring', 'with executive reporting']]]
  ];
  fill('tab-panels', TABS.map(function (t2, i) {
    return '<div class="tab-panel' + (i === 0 ? ' active' : '') + '"><div class="tab-panel-card"><div><h3 class="h3">' + t2[0] + '</h3><p class="lead" style="margin:18px 0 28px;">' + t2[1] + '</p><a href="' + t2[2] + '" class="btn btn-primary">' + t2[3] + '</a></div><ul class="check-list">' +
      t2[4].map(function (li) { return '<li><strong>' + li[0] + '</strong> — ' + li[1] + '</li>'; }).join('') +
      '</ul></div></div>';
  }).join(''));


  /* ---------- Scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var prefix = el.getAttribute('data-pre') || '';
    var suffix = el.getAttribute('data-suf') || '';
    var t0 = null, dur = 1700;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      var v = target * e;
      var txt = dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
      el.textContent = prefix + txt + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---------- Tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var btns = root.querySelectorAll('.tab-btn');
    var panels = root.querySelectorAll('.tab-panel');
    btns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        panels[i].classList.add('active');
      });
    });
  });

  /* ---------- Live event stream ---------- */
  var stream = document.getElementById('event-stream-body');
  if (stream) {
    var events = [
      ['action', 'AGENT', 'Agent completed customer request — support-agent-14'],
      ['security', 'ACCESS', 'Model accessed protected database — approval verified'],
      ['outcome', 'OUTCOME', 'Workflow generated €4,800 in verified revenue'],
      ['cost', 'COST', 'Cost threshold exceeded — forecasting-agent, dept: finance'],
      ['control', 'CONTROL', 'Human approval requested — contract-review workflow'],
      ['security', 'POLICY', 'Security policy triggered — permission scope reduced'],
      ['outcome', 'VERIFIED', 'Outcome successfully verified — evidence record sealed'],
      ['action', 'CERT', 'Certification score updated — procurement-copilot v2.3']
    ];
    var idx = 0;
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function addEvent() {
      var d = new Date();
      var t = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
      var ev = events[idx % events.length];
      idx++;
      var row = document.createElement('div');
      row.className = 'event-row';
      row.innerHTML = '<span class="time">' + t + '</span><span class="tag ' + ev[0] + '">' + ev[1] + '</span><span>' + ev[2] + '</span>';
      stream.insertBefore(row, stream.firstChild);
      while (stream.children.length > 7) stream.removeChild(stream.lastChild);
    }
    for (var i = 0; i < 5; i++) addEvent();
    setInterval(addEvent, 2600);
  }

  /* ---------- Demo form (live capture) ---------- */
  var form = document.getElementById('demo-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      if (btn) { btn.textContent = 'Sending\u2026'; btn.disabled = true; }
      var data = { _subject: 'ALL IS ALL \u2014 Demo / Pilot request' };
      form.querySelectorAll('input, select, textarea').forEach(function (f) {
        if (f.id) data[f.id.replace('f-', '')] = f.value;
      });
      function done() {
        document.getElementById('demo-form-wrap').style.display = 'none';
        document.getElementById('demo-success').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      fetch('https://formsubmit.co/ajax/rabilsmith@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(done, done);
    });
  }

  /* ---------- Question cycler (problem story) ---------- */
  var qd = document.getElementById('q-display');
  if (qd) {
    var QS = [
      'Which AI systems are operating inside the company?',
      'What data and permissions can they access?',
      'What are they costing?',
      'What outcomes are they producing?',
      'Which systems create value — and which create risk?',
      'Can their performance be independently verified?'
    ];
    var qDots = document.getElementById('q-dots');
    var qi = 0, qTimer;
    var qGo = function (k) {
      qi = k;
      qd.classList.add('out');
      setTimeout(function () {
        qd.textContent = QS[qi];
        qd.classList.remove('out');
        Array.prototype.forEach.call(qDots.children, function (d, j) { d.className = j === qi ? 'on' : ''; });
      }, 380);
    };
    var qRestart = function () { clearInterval(qTimer); qTimer = setInterval(function () { qGo((qi + 1) % QS.length); }, 3800); };
    QS.forEach(function (_, k) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Question ' + (k + 1));
      if (k === 0) b.className = 'on';
      b.addEventListener('click', function () { qGo(k); qRestart(); });
      qDots.appendChild(b);
    });
    qRestart();
  }

  /* ---------- Capability explorer ---------- */
  var capRoot = document.getElementById('cap-explorer');
  if (capRoot) {
    var CAPS = [
      { n: 'Discovery', t: 'AI Discovery & Inventory', c: 'Find and catalog every AI system — including the ones nobody registered.', ch: ['Complete registry', 'Shadow AI detection', 'Ownership mapping', 'Version history'], a: 'discovery',
        i: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/>' },
      { n: 'Tracking', t: 'Real-Time AI Tracking', c: 'Watch what every system does, touches, and changes — live.', ch: ['Activity monitoring', 'Tool calls', 'Data movement', 'Live alerts'], a: 'tracking',
        i: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/>' },
      { n: 'ROI', t: 'Outcome & ROI Measurement', c: 'Tie AI activity to revenue, savings, and outcomes — not vendor claims.', ch: ['Revenue created', 'Time saved', 'Cost per outcome', 'Return on investment'], a: 'roi',
        i: '<path d="M3 20 L8 12 L13 15 L21 4"/><line x1="3" y1="20" x2="21" y2="20"/>' },
      { n: 'Cost', t: 'AI Cost Intelligence', c: 'Every token, model, vendor, and workflow cost in one financial view.', ch: ['Cost by agent', 'Margin analysis', 'Budget controls', 'Cost anomalies'], a: 'cost',
        i: '<rect x="3" y="12" width="4" height="8"/><rect x="10" y="7" width="4" height="13"/><rect x="17" y="3" width="4" height="17"/>' },
      { n: 'Security', t: 'Security & Permissions', c: 'See and control what AI can access — and stop it when it shouldn’t.', ch: ['Permission mapping', 'Anomaly detection', 'Policy enforcement', 'Kill-switch controls'], a: 'security',
        i: '<path d="M12 3 L20 6 V11 C20 16.5 16.5 20 12 21.5 C7.5 20 4 16.5 4 11 V6 Z"/>' },
      { n: 'Governance', t: 'Governance & Compliance', c: 'Policies that enforce themselves — with approvals and audit trails.', ch: ['Approval workflows', 'Human oversight', 'Audit logs', 'Compliance reporting'], a: 'governance',
        i: '<rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>' },
      { n: 'Verification', t: 'Verification & Evidence', c: 'Prove AI performs as promised — with auditable evidence.', ch: ['Claim verification', 'Performance baselines', 'Drift detection', 'Evidence trails'], a: 'verification',
        i: '<path d="M4 12 L9 17 L20 5"/>' },
      { n: 'Monetization', t: 'AI Monetization', c: 'Turn verified outcomes into pricing, billing, and value reports.', ch: ['Usage pricing', 'Outcome pricing', 'Customer metering', 'Billing events'], a: 'monetization',
        i: '<circle cx="12" cy="12" r="9"/><path d="M12 7 v10 M9 9.5 c0-1.4 1.3-2.5 3-2.5 s3 1.1 3 2.5 c0 1.4-1.3 2-3 2.5 s-3 1.1-3 2.5 c0 1.4 1.3 2.5 3 2.5 s3-1.1 3-2.5"/>' }
    ];
    var tilesEl = document.getElementById('cap-tiles');
    var capTitle = document.getElementById('cap-title');
    var capCopy = document.getElementById('cap-copy');
    var capChips = document.getElementById('cap-chips');
    var capLink = document.getElementById('cap-link');
    var capBar = document.getElementById('cap-progress-bar');
    var capDetail = capRoot.querySelector('.cap-detail');
    var ci = -1, capTimer, capAuto = true;
    var capGo = function (k) {
      if (k === ci) return;
      ci = k;
      var cap = CAPS[k];
      capDetail.classList.add('switching');
      setTimeout(function () {
        capTitle.textContent = cap.t;
        capCopy.textContent = cap.c;
        capChips.innerHTML = cap.ch.map(function (x) { return '<li>' + x + '</li>'; }).join('');
        capLink.href = 'capabilities.html#' + cap.a;
        capDetail.classList.remove('switching');
      }, 320);
      Array.prototype.forEach.call(tilesEl.children, function (t2, j) { t2.classList.toggle('on', j === k); });
      if (capAuto) {
        capBar.classList.remove('run');
        void capBar.offsetWidth;
        capBar.classList.add('run');
      }
    };
    CAPS.forEach(function (cap, k) {
      var b = document.createElement('button');
      b.className = 'cap-tile';
      b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' + cap.i + '</svg>' + cap.n;
      b.addEventListener('click', function () { capAuto = false; clearInterval(capTimer); capBar.classList.remove('run'); capGo(k); });
      tilesEl.appendChild(b);
    });
    capGo(0);
    capTimer = setInterval(function () { capGo((ci + 1) % CAPS.length); }, 4600);
  }

  /* ---------- Ticker loop clone ---------- */
  var tk = document.getElementById('ticker-track');
  if (tk) tk.innerHTML += tk.innerHTML;

  /* ---------- Demo form select options ---------- */
  function fillSelect(id, opts) {
    var e2 = document.getElementById(id);
    if (!e2) return;
    opts.forEach(function (o) {
      var op = document.createElement('option');
      op.textContent = o;
      e2.appendChild(op);
    });
  }
  fillSelect('f-size', ['1–50', '51–250', '251–1,000', '1,001–10,000', '10,000+']);
  fillSelect('f-systems', ['1–10', '11–50', '51–200', '200+', "Unknown — that's the problem"]);
  fillSelect('f-challenge', ['AI visibility', 'Cost and ROI', 'Security', 'Governance', 'Vendor verification', 'Certification', 'AI monetization', 'Multiple requirements']);
  fillSelect('f-deploy', ['Cloud (multi-tenant)', 'Cloud (dedicated / regional)', 'Private environment', 'To be discussed']);

  /* ---------- JS-built dashboard risk grid + integrations ---------- */
  var rg = document.getElementById('risk-grid');
  if (rg) {
    'llmllm lhlmll mlllhl lmlllm'.replace(/ /g, '').split('').forEach(function (c2) {
      var d = document.createElement('div');
      d.className = 'risk-cell r' + c2;
      rg.appendChild(d);
    });
  }
  var ig = document.getElementById('int-grid');
  if (ig) {
    var ST = { A: ['info', 'AVAILABLE'], D: ['warn', 'IN DEVELOPMENT'], P: ['warn', 'PLANNED'] };
    [['OpenAI', 'AI models', 'A'], ['Anthropic', 'AI models', 'A'], ['Google Gemini', 'AI models', 'A'],
     ['Microsoft Azure AI', 'Cloud platforms', 'D'], ['AWS Bedrock', 'Cloud platforms', 'D'],
     ['LangChain', 'Agent frameworks', 'A'], ['CrewAI', 'Agent frameworks', 'D'],
     ['Salesforce', 'Business software', 'P'], ['HubSpot', 'Business software', 'P'],
     ['ServiceNow', 'Business software', 'P'], ['Slack', 'Workflow automation', 'A'],
     ['Microsoft Teams', 'Workflow automation', 'P'], ['Stripe', 'Finance & billing', 'D'],
     ['Snowflake', 'Data infrastructure', 'P'], ['Datadog', 'Security platforms', 'P'],
     ['Okta', 'Identity systems', 'D']].forEach(function (x) {
      var st = ST[x[2]];
      var d = document.createElement('div');
      d.className = 'int-card';
      d.innerHTML = '<div><div class="name">' + x[0] + '</div><div class="cat">' + x[1] + '</div></div><span class="pill ' + st[0] + '">' + st[1] + '</span>';
      ig.appendChild(d);
    });
  }

  /* ---------- Cursor-tracked card lighting ---------- */
  if (matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.card, .tab-panel-card').forEach(function (c3) {
      c3.addEventListener('mousemove', function (e3) {
        var r = c3.getBoundingClientRect();
        c3.style.setProperty('--mx', (e3.clientX - r.left) + 'px');
        c3.style.setProperty('--my', (e3.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Problem: AI spread + scan simulation ---------- */
  var sp = document.getElementById('spread');
  if (sp) {
    var spx = sp.getContext('2d');
    var SPW, SPH, sdots = [], sphase = 0, scanX = -1, holdT = 0;
    function spBuild() {
      SPW = sp.width = sp.offsetWidth * DPR;
      SPH = sp.height = sp.offsetHeight * DPR;
      sdots = [];
      var gap = 27 * DPR;
      for (var y = gap; y < SPH - gap / 2; y += gap)
        for (var x = gap / 2; x < SPW - gap / 2; x += gap)
          sdots.push({ x: x, y: y, on: 0, red: Math.random() < 0.14, t: 0 });
      sphase = 0; scanX = -1; holdT = 0;
    }
    function spFrame() {
      var active = 0;
      sdots.forEach(function (d) { if (d.on) active++; });
      var ratio = sdots.length ? active / sdots.length : 0;
      if (sphase === 0) {
        var rate = 1 + Math.floor(ratio * ratio * 14);
        for (var k = 0; k < rate; k++) {
          var d2 = sdots[Math.floor(Math.random() * sdots.length)];
          if (d2 && !d2.on) { d2.on = 1; d2.t = 0; }
        }
        if (ratio > 0.82) { sphase = 1; scanX = 0; }
      } else if (sphase === 1) {
        scanX += SPW / 160;
        if (scanX > SPW + 40 * DPR) { sphase = 2; holdT = 0; }
      } else {
        holdT++;
        if (holdT > 110) spBuild();
      }
      spx.clearRect(0, 0, SPW, SPH);
      sdots.forEach(function (d) {
        d.t++;
        var seen = sphase > 0 && d.x < scanX;
        if (!d.on) {
          spx.fillStyle = 'rgba(11,15,23,.10)';
          spx.beginPath(); spx.arc(d.x, d.y, 2 * DPR, 0, Math.PI * 2); spx.fill();
          return;
        }
        var a = Math.min(d.t / 20, 1);
        spx.fillStyle = d.red ? 'rgba(244,63,94,' + (0.75 * a).toFixed(2) + ')' : 'rgba(0,123,255,' + (0.6 * a).toFixed(2) + ')';
        spx.beginPath(); spx.arc(d.x, d.y, 2.6 * DPR, 0, Math.PI * 2); spx.fill();
        if (seen) {
          spx.strokeStyle = d.red ? 'rgba(244,63,94,.8)' : 'rgba(0,123,255,.5)';
          spx.lineWidth = 1.2 * DPR;
          spx.beginPath(); spx.arc(d.x, d.y, 5.5 * DPR, 0, Math.PI * 2); spx.stroke();
        }
      });
      if (sphase === 1) {
        var g2 = spx.createLinearGradient(scanX - 60 * DPR, 0, scanX, 0);
        g2.addColorStop(0, 'rgba(0,123,255,0)');
        g2.addColorStop(1, 'rgba(0,123,255,.22)');
        spx.fillStyle = g2;
        spx.fillRect(scanX - 60 * DPR, 0, 60 * DPR, SPH);
        spx.fillStyle = 'rgba(0,123,255,.9)';
        spx.fillRect(scanX, 0, 1.6 * DPR, SPH);
      }
    }
    spBuild();
    window.addEventListener('resize', spBuild);
    loopWhenVisible(sp, spFrame);
  }

  /* ---------- Steps: live lifecycle cycle ---------- */
  var hiw = document.getElementById('hiw-steps');
  if (hiw && hiw.children.length) {
    var lb = document.createElement('div');
    lb.className = 'lifebar';
    hiw.appendChild(lb);
    var si = -1;
    setInterval(function () {
      si = (si + 1) % 5;
      Array.prototype.forEach.call(hiw.children, function (st2, j) {
        if (st2.classList && st2 !== lb) st2.classList.toggle('live', j === si);
      });
      lb.style.width = ((si + 1) * 20) + '%';
    }, 1700);
  }

  /* ---------- Live product scenario: cursor acts in the dashboard ---------- */
  var dashEl = document.querySelector('.dash');
  if (dashEl) {
    dashEl.style.position = 'relative';
    var cur = document.createElement('div');
    cur.className = 'fake-cursor';
    cur.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M3 1 L3 15 L7 12 L9.5 18 L12 17 L9.5 11 L14 10.5 Z" fill="#fff" stroke="#0B0F17" stroke-width="1.2"/></svg>';
    cur.style.top = '80px'; cur.style.left = '40%';
    dashEl.appendChild(cur);
    var toast = document.createElement('div');
    toast.className = 'dash-toast';
    dashEl.appendChild(toast);
    function pillOf(txt) {
      var rows = dashEl.querySelectorAll('.status-row');
      for (var i = 0; i < rows.length; i++)
        if (rows[i].textContent.indexOf(txt) > -1) return rows[i].querySelector('.pill');
      return null;
    }
    function moveTo(el2) {
      var d = dashEl.getBoundingClientRect(), r = el2.getBoundingClientRect();
      cur.style.left = (r.left - d.left + r.width / 2 - 4) + 'px';
      cur.style.top = (r.top - d.top + r.height / 2 - 2) + 'px';
    }
    function clickPill(p, newTxt, newCls, msg) {
      cur.classList.add('click');
      setTimeout(function () { cur.classList.remove('click'); }, 380);
      p.textContent = newTxt;
      p.className = 'pill ' + newCls + ' pop';
      toast.textContent = msg;
      toast.classList.add('on');
      setTimeout(function () { toast.classList.remove('on'); }, 2600);
    }
    function scenario() {
      var pA = pillOf('finance-forecast-02');
      var pB = pillOf('data-sync-agent');
      if (!pA || !pB) return;
      var a0 = pA.textContent, b0 = pB.textContent;
      setTimeout(function () { moveTo(pA); }, 600);
      setTimeout(function () { clickPill(pA, 'APPROVED', 'ok', '\u2713 Human approval recorded \u00b7 evidence sealed'); }, 1900);
      setTimeout(function () { moveTo(pB); }, 4600);
      setTimeout(function () { clickPill(pB, 'SCOPED', 'warn', '\u2713 Permission scope reduced \u00b7 policy enforced'); }, 5900);
      setTimeout(function () {
        pA.textContent = a0; pA.className = 'pill warn';
        pB.textContent = b0; pB.className = 'pill risk';
        cur.style.left = '40%'; cur.style.top = '80px';
      }, 10500);
    }
    var dashSeen = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { scenario(); setInterval(scenario, 12000); dashSeen.disconnect(); }
    }, { threshold: 0.3 });
    dashSeen.observe(dashEl);
  }

  /* ---------- Hero parallax ---------- */
  var heroEl = document.querySelector('.hero-v2');
  if (heroEl && matchMedia('(pointer:fine)').matches) {
    var logoWrap = heroEl.querySelector('.hero-logo-wrap');
    var floatLayer = heroEl.querySelector('.float-layer');
    heroEl.addEventListener('mousemove', function (e) {
      var rx = (e.clientX / window.innerWidth - 0.5);
      var ry = (e.clientY / window.innerHeight - 0.5);
      if (logoWrap) logoWrap.style.transform = 'translate(' + (rx * 10) + 'px,' + (ry * 8) + 'px)';
      if (floatLayer) floatLayer.style.transform = 'translate(' + (rx * -18) + 'px,' + (ry * -12) + 'px)';
    });
  }

  /* ============================================================
     CINEMATIC HERO SCENE — stars, Earth, city lights, satellites,
     AI network converging into the control beam
     ============================================================ */
  var canvas = document.getElementById('hero-net');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, horizonY, R, cx, cy;
    var cities = [];
    var t = 0;

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function build() {
      W = canvas.width = canvas.offsetWidth * DPR;
      H = canvas.height = canvas.offsetHeight * DPR;
      horizonY = H * 0.84;
      R = Math.max(W * 2.8, H * 1.3); // flat arc: rim stays low at screen edges
      cx = W / 2; cy = horizonY + R;

      // city lights clustered on the visible cap
      cities = [];
      var clusters = [];
      for (var c = 0; c < 16; c++) {
        var yc = rnd(horizonY + 8 * DPR, Math.min(H, horizonY + H * 0.17));
        var dxMax = Math.sqrt(Math.max(R * R - (yc - cy) * (yc - cy), 0));
        clusters.push({ x: cx + rnd(-dxMax * 0.92, dxMax * 0.92), y: yc, n: Math.floor(rnd(8, 26)) });
      }
      clusters.forEach(function (cl) {
        for (var k = 0; k < cl.n; k++) {
          cities.push({
            x: cl.x + rnd(-1, 1) * rnd(0, 46) * DPR,
            y: cl.y + rnd(-1, 1) * rnd(0, 16) * DPR,
            s: rnd(.5, 1.5) * DPR,
            warm: Math.random() > 0.28,
            o: Math.random() * Math.PI * 2,
            sp: rnd(.01, .05)
          });
        }
      });

    }

    function draw() {
      t++;
      ctx.clearRect(0, 0, W, H);

      // atmosphere glow — concentrated behind the center mark, fading to the edges
      var breath = 0.22 + 0.06 * Math.sin(t * 0.008);
      var atm = ctx.createRadialGradient(cx, horizonY, 0, cx, horizonY, W * 0.55);
      atm.addColorStop(0, 'rgba(0,123,255,' + breath.toFixed(3) + ')');
      atm.addColorStop(0.45, 'rgba(0,123,255,' + (breath * 0.35).toFixed(3) + ')');
      atm.addColorStop(1, 'rgba(0,123,255,0)');
      ctx.fillStyle = atm;
      ctx.fillRect(0, horizonY - 220 * DPR, W, 224 * DPR);

      // Earth body
      var eg = ctx.createLinearGradient(0, horizonY, 0, Math.min(H, horizonY + H * 0.25));
      eg.addColorStop(0, '#0e1626');
      eg.addColorStop(1, '#04050a');
      ctx.fillStyle = eg;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // limb highlight — bright at center, transparent at screen edges
      var limb = ctx.createLinearGradient(0, 0, W, 0);
      limb.addColorStop(0, 'rgba(155,205,255,0)');
      limb.addColorStop(0.28, 'rgba(155,205,255,0.35)');
      limb.addColorStop(0.5, 'rgba(200,228,255,0.95)');
      limb.addColorStop(0.72, 'rgba(155,205,255,0.35)');
      limb.addColorStop(1, 'rgba(155,205,255,0)');
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = limb;
      ctx.lineWidth = 1.6 * DPR;
      ctx.shadowColor = 'rgba(0,123,255,0.85)';
      ctx.shadowBlur = 26 * DPR;
      ctx.stroke();
      var limb2 = ctx.createLinearGradient(0, 0, W, 0);
      limb2.addColorStop(0, 'rgba(0,123,255,0)');
      limb2.addColorStop(0.5, 'rgba(0,123,255,0.28)');
      limb2.addColorStop(1, 'rgba(0,123,255,0)');
      ctx.strokeStyle = limb2;
      ctx.lineWidth = 7 * DPR;
      ctx.shadowBlur = 60 * DPR;
      ctx.stroke();
      ctx.restore();

      // city lights
      cities.forEach(function (c) {
        var a = 0.3 + 0.6 * (0.5 + 0.5 * Math.sin(t * c.sp + c.o));
        ctx.fillStyle = c.warm ? 'rgba(255,208,140,' + a.toFixed(2) + ')' : 'rgba(150,200,255,' + a.toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(c.x, c.y, c.s, 0, Math.PI * 2); ctx.fill();
      });


    }
    build();
    window.addEventListener('resize', build);
    loopWhenVisible(canvas, draw);
  }

  /* ---------- Scroll progress + nav state + hero scroll parallax ---------- */
  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  var heroContent = document.querySelector('.hero-v2 .hero-content');
  var heroCanvas = document.querySelector('.hero-v2 .hero-canvas');
  var heroFloats = document.querySelector('.hero-v2 .float-layer');
  var scrollTick = false;
  function onScroll() {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(function () {
      scrollTick = false;
      var y = window.scrollY;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      progress.classList.toggle('on', y > 60);
      if (nav) nav.classList.toggle('scrolled', y > 40);
      var vh = window.innerHeight;
      if (heroContent && y < vh * 1.2) {
        var f = Math.min(y / vh, 1);
        heroContent.style.transform = 'translateY(' + (y * 0.28) + 'px)';
        heroContent.style.opacity = String(1 - f * 0.9);
        if (heroCanvas) heroCanvas.style.transform = 'translateY(' + (y * 0.12) + 'px)';
        if (heroFloats) heroFloats.style.opacity = String(1 - f * 1.4);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Interactive 3D dot-globe ---------- */
  var gc = document.getElementById('globe');
  if (gc) {
    var gctx = gc.getContext('2d');
    var GW, GH, GR, GCX, GCY;
    var pts = [];
    var yaw = 0, pitch = 0.28, autoSpin = 0.0022, dragVX = 0, dragging = false, lx = 0, ly = 0;
    var HUBNAMES = ['TOKYO', 'BERLIN', 'NEW YORK', 'SAN FRANCISCO', 'LONDON', 'SINGAPORE', 'DUBAI', 'S\u00c3O PAULO'];
    var HUBS = [
      [35.7, 139.7], [52.5, 13.4], [40.7, -74], [37.8, -122.4],
      [51.5, -0.1], [1.35, 103.8], [25.2, 55.3], [-23.5, -46.6]
    ].map(function (h) {
      var la = h[0] * Math.PI / 180, lo = h[1] * Math.PI / 180;
      return [Math.cos(la) * Math.cos(lo), -Math.sin(la), Math.cos(la) * Math.sin(lo)];
    });
    var ARCS = [[0, 2], [1, 3], [4, 5], [0, 5], [2, 6], [3, 7], [1, 6], [4, 2]].map(function (pair, k) {
      var a = HUBS[pair[0]], b = HUBS[pair[1]];
      var dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      var om = Math.acos(Math.max(-1, Math.min(1, dot)));
      var so = Math.sin(om) || 1e-6;
      var samples = [];
      for (var s = 0; s <= 26; s++) {
        var tt = s / 26;
        var w1 = Math.sin((1 - tt) * om) / so, w2 = Math.sin(tt * om) / so;
        var x = a[0] * w1 + b[0] * w2, y = a[1] * w1 + b[1] * w2, z = a[2] * w1 + b[2] * w2;
        var lift = 1 + 0.22 * Math.sin(Math.PI * tt);
        samples.push([x * lift, y * lift, z * lift]);
      }
      return { s: samples, off: k * 0.13, sp: 0.0016 + (k % 3) * 0.0007 };
    });

    function gbuild() {
      GW = gc.width = gc.offsetWidth * DPR;
      GH = gc.height = gc.offsetHeight * DPR;
      GR = GW * 0.36;
      GCX = GW / 2; GCY = GH / 2;
      pts = [];
      var N = Math.max(420, Math.min(820, Math.round(GW / 2.1)));
      for (var i = 0; i < N; i++) {
        var yv = 1 - (2 * i) / (N - 1);
        var rr = Math.sqrt(Math.max(0, 1 - yv * yv));
        var th = i * 2.399963229728653;
        pts.push([Math.cos(th) * rr, yv, Math.sin(th) * rr]);
      }
    }

    function rot(p) {
      var cy1 = Math.cos(yaw), sy1 = Math.sin(yaw);
      var cx1 = Math.cos(pitch), sx1 = Math.sin(pitch);
      var x = p[0] * cy1 + p[2] * sy1;
      var z = -p[0] * sy1 + p[2] * cy1;
      var y = p[1] * cx1 - z * sx1;
      z = p[1] * sx1 + z * cx1;
      return [x, y, z];
    }

    function gdraw(tm) {
      if (!dragging) { yaw += autoSpin + dragVX; dragVX *= 0.94; }
      gctx.clearRect(0, 0, GW, GH);

      // atmosphere
      var ag = gctx.createRadialGradient(GCX, GCY, GR * 0.85, GCX, GCY, GR * 1.35);
      ag.addColorStop(0, 'rgba(0,123,255,0.10)');
      ag.addColorStop(0.55, 'rgba(0,123,255,0.03)');
      ag.addColorStop(1, 'rgba(0,123,255,0)');
      gctx.fillStyle = ag;
      gctx.fillRect(0, 0, GW, GH);

      // rim
      gctx.beginPath();
      gctx.arc(GCX, GCY, GR, 0, Math.PI * 2);
      gctx.strokeStyle = 'rgba(0,123,255,0.32)';
      gctx.lineWidth = 1 * DPR;
      gctx.stroke();

      // surface dots
      for (var i = 0; i < pts.length; i++) {
        var q = rot(pts[i]);
        if (q[2] < -0.15) continue;
        var d = (q[2] + 1) / 2;
        var a = 0.10 + d * d * 0.72;
        gctx.fillStyle = 'rgba(9,80,180,' + a.toFixed(3) + ')';
        var sz = (0.8 + d * 1.3) * DPR;
        gctx.fillRect(GCX + q[0] * GR - sz / 2, GCY + q[1] * GR - sz / 2, sz, sz);
      }

      // arcs + pulses
      for (var ai = 0; ai < ARCS.length; ai++) {
        var arc = ARCS[ai];
        var proj = [];
        var vis = 0;
        for (var si = 0; si < arc.s.length; si++) {
          var qp = rot(arc.s[si]);
          proj.push(qp);
          if (qp[2] > 0) vis++;
        }
        if (vis < 4) continue;
        gctx.beginPath();
        var started = false;
        for (var pi = 0; pi < proj.length; pi++) {
          var pp = proj[pi];
          var px = GCX + pp[0] * GR, py = GCY + pp[1] * GR;
          if (pp[2] > -0.05) {
            if (!started) { gctx.moveTo(px, py); started = true; }
            else gctx.lineTo(px, py);
          } else started = false;
        }
        gctx.strokeStyle = 'rgba(0,123,255,0.45)';
        gctx.lineWidth = 1 * DPR;
        gctx.stroke();
        // traveling pulse
        var tt2 = ((tm || 0) * arc.sp * 0.06 + arc.off) % 1;
        var idx2 = Math.min(arc.s.length - 1, Math.floor(tt2 * (arc.s.length - 1)));
        var pq = proj[idx2];
        if (pq[2] > 0) {
          var fx = GCX + pq[0] * GR, fy = GCY + pq[1] * GR;
          gctx.fillStyle = '#0B63D8';
          gctx.beginPath(); gctx.arc(fx, fy, 2.2 * DPR, 0, Math.PI * 2); gctx.fill();
          gctx.fillStyle = 'rgba(0,123,255,0.22)';
          gctx.beginPath(); gctx.arc(fx, fy, 5.5 * DPR, 0, Math.PI * 2); gctx.fill();
        }
      }

      // hub markers + city labels
      for (var hi = 0; hi < HUBS.length; hi++) {
        var hq = rot(HUBS[hi]);
        if (hq[2] < 0.05) continue;
        var hx = GCX + hq[0] * GR, hy = GCY + hq[1] * GR;
        var ha = 0.5 + 0.5 * Math.sin((tm || 0) * 0.004 + hi);
        gctx.fillStyle = '#0B0F17';
        gctx.beginPath(); gctx.arc(hx, hy, 2.4 * DPR, 0, Math.PI * 2); gctx.fill();
        gctx.strokeStyle = 'rgba(0,123,255,' + (0.55 * ha).toFixed(2) + ')';
        gctx.lineWidth = 1 * DPR;
        gctx.beginPath(); gctx.arc(hx, hy, (4 + ha * 5) * DPR, 0, Math.PI * 2); gctx.stroke();
        if (hq[2] > 0.3) {
          var la = (hq[2] - 0.3) / 0.7;
          gctx.font = '600 ' + (9.5 * DPR) + 'px Satoshi, Inter, sans-serif';
          gctx.fillStyle = 'rgba(11,15,23,' + (0.28 + la * 0.5).toFixed(2) + ')';
          gctx.fillText(HUBNAMES[hi], hx + 8 * DPR, hy + 3.5 * DPR);
        }
      }

    }

    function dstart(x, y2) { dragging = true; lx = x; ly = y2; gc.classList.add('dragging'); }
    function dmove(x, y2) {
      if (!dragging) return;
      yaw += (x - lx) * 0.005;
      pitch = Math.max(-0.7, Math.min(0.7, pitch + (y2 - ly) * 0.004));
      dragVX = (x - lx) * 0.0004;
      lx = x; ly = y2;
    }
    function dend() { dragging = false; gc.classList.remove('dragging'); }
    gc.addEventListener('mousedown', function (e) { dstart(e.clientX, e.clientY); });
    window.addEventListener('mousemove', function (e) { dmove(e.clientX, e.clientY); });
    window.addEventListener('mouseup', dend);
    gc.addEventListener('touchstart', function (e) { var t2 = e.touches[0]; dstart(t2.clientX, t2.clientY); }, { passive: true });
    gc.addEventListener('touchmove', function (e) { var t2 = e.touches[0]; dmove(t2.clientX, t2.clientY); }, { passive: true });
    gc.addEventListener('touchend', dend);

    gbuild();
    window.addEventListener('resize', gbuild);
    if (window.ResizeObserver) new ResizeObserver(function () { gbuild(); }).observe(gc);
    loopWhenVisible(gc, gdraw);
  }

  /* ---------- Subpage star canvas ---------- */
  var pageHero = document.querySelector('.page-hero');
  if (pageHero && !canvas) {
    var sc = document.createElement('canvas');
    sc.className = 'star-canvas';
    pageHero.insertBefore(sc, pageHero.firstChild);
    var sctx = sc.getContext('2d');
    var sw, sh, sstars = [], st = 0;
    function sbuild() {
      sw = sc.width = sc.offsetWidth * DPR;
      sh = sc.height = sc.offsetHeight * DPR;
      sstars = [];
      var n = Math.floor(sw * sh / (14000 * DPR * DPR));
      for (var i = 0; i < n; i++) {
        sstars.push({ x: Math.random() * sw, y: Math.random() * sh, s: (0.4 + Math.random() * 1.2) * DPR, o: Math.random() * Math.PI * 2, sp: 0.008 + Math.random() * 0.025 });
      }
    }
    function sdraw() {
      st++;
      sctx.clearRect(0, 0, sw, sh);
      sstars.forEach(function (s) {
        var a = 0.15 + 0.5 * (0.5 + 0.5 * Math.sin(st * s.sp + s.o));
        sctx.fillStyle = 'rgba(0,105,219,' + (a * 0.4).toFixed(2) + ')';
        sctx.fillRect(s.x, s.y, s.s, s.s);
      });
    }
    sbuild();
    window.addEventListener('resize', sbuild);
    loopWhenVisible(sc, sdraw);
  }

  // ROI calculator
  (function () {
    var t = document.getElementById('ri-tools');
    if (!t) return;
    var s = document.getElementById('ri-spend'), e = document.getElementById('ri-emp');
    function fmt(n) { return '\u20AC' + Math.round(n).toLocaleString('en-US'); }
    function calc() {
      var tools = +t.value, spendK = +s.value, emp = +e.value;
      document.getElementById('rv-tools').textContent = tools;
      document.getElementById('rv-spend').textContent = '\u20AC' + spendK + 'K';
      document.getElementById('rv-emp').textContent = emp.toLocaleString('en-US');
      var waste = spendK * 1000 * 12 * 0.20;
      var shadow = Math.max(1, Math.round(tools * 0.15));
      var hours = Math.round(emp * 3);
      var payback = waste / (4900 + 990 * 12);
      document.getElementById('ro-waste').textContent = fmt(waste);
      document.getElementById('ro-shadow').textContent = shadow;
      document.getElementById('ro-hours').textContent = hours.toLocaleString('en-US');
      document.getElementById('ro-payback').textContent = (payback >= 10 ? Math.round(payback) : payback.toFixed(1)) + '\u00D7';
    }
    [t, s, e].forEach(function (x) { x.addEventListener('input', calc); });
    calc();
  })();
})();
