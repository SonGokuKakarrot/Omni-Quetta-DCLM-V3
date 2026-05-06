// ==========================
// NOCTURNAL OMNI (STYLISH V2) - UPDATED WITH MIC MAXIMIZER
// ==========================

(function () {
  console.log("[Nocturnal Omni] Loaded");

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // --- AUDIO NODES ---
  const gainNode = audioCtx.createGain();
  const mainComp = audioCtx.createDynamicsCompressor();
  const loudnessDrive = audioCtx.createDynamicsCompressor();
  const limiter = audioCtx.createDynamicsCompressor();
  
  // Saturation (Waveshaper)
  const distortion = audioCtx.createWaveShaper();
  function makeDistortionCurve(amount) {
    let k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  }

  // 3-Band EQ + Presence
  const bassEq = audioCtx.createBiquadFilter();
  bassEq.type = "lowshelf";
  const presenceEq = audioCtx.createBiquadFilter();
  presenceEq.type = "peaking";
  presenceEq.frequency.value = 3000;
  const trebleEq = audioCtx.createBiquadFilter();
  trebleEq.type = "highshelf";

  // Standard Omni EQ (Existing)
  const eq = audioCtx.createBiquadFilter();
  eq.type = "peaking";
  eq.frequency.value = 3000;
  eq.gain.value = 5;

  // --- ROUTING ---
  // Source -> EQ -> Bass -> Presence -> Treble -> Distortion -> MainComp -> LoudnessDrive -> Gain -> Limiter -> Destination
  eq.connect(bassEq);
  bassEq.connect(presenceEq);
  presenceEq.connect(trebleEq);
  trebleEq.connect(distortion);
  distortion.connect(mainComp);
  mainComp.connect(loudnessDrive);
  loudnessDrive.connect(gainNode);
  gainNode.connect(limiter);
  limiter.connect(audioCtx.destination);

  // Default Limiter (Safety)
  limiter.threshold.value = -1;
  limiter.ratio.value = 20;

  // ==========================
  // 🌌 PANEL STYLE
  // ==========================
  const panel = document.createElement("div");
  panel.innerHTML = `<div style="font-weight:bold; font-size:16px; text-align:center; margin-bottom:10px;">🌙 Nocturnal Omni</div>`;

  Object.assign(panel.style, {
    position: "fixed", top: "20px", right: "20px", zIndex: "9999",
    width: "280px", padding: "15px", borderRadius: "16px",
    background: "rgba(10,10,15,0.85)", backdropFilter: "blur(15px)",
    color: "#fff", fontFamily: "sans-serif", boxShadow: "0 0 20px rgba(0,150,255,0.4)",
    maxHeight: "90vh", overflowY: "auto"
  });
  document.body.appendChild(panel);

  // ==========================
  // 🎚️ MIC MAXIMIZER CONTROLS (New)
  // ==========================
  
  // Gain (dB)
  createSlider("Gain (dB)", -20, 20, 0, (val) => {
    gainNode.gain.value = Math.pow(10, val / 20);
  });

  // Loudness Drive (Compressor Threshold)
  createSlider("Loudness Drive", -60, 0, -24, (val) => {
    loudnessDrive.threshold.value = val;
  });

  // Saturation Drive
  createSlider("Saturation Drive", 0, 100, 0, (val) => {
    distortion.curve = val > 0 ? makeDistortionCurve(val) : null;
  });

  // Comp Threshold
  createSlider("Comp Threshold (dB)", -60, 0, -24, (val) => {
    mainComp.threshold.value = val;
  });

  // Comp Ratio
  createSlider("Comp Ratio", 1, 20, 4, (val) => {
    mainComp.ratio.value = val;
  });

  // Presence EQ
  createSlider("Presence EQ (dB)", -20, 20, 0, (val) => {
    presenceEq.gain.value = val;
  });

  // Bass EQ
  createSlider("Bass EQ (dB)", -20, 20, 0, (val) => {
    bassEq.gain.value = val;
  });

  // Treble EQ
  createSlider("Treble EQ (dB)", -20, 20, 0, (val) => {
    trebleEq.gain.value = val;
  });

  // ==========================
  //  기존 기능 (Legacy Options)
  // ==========================
  const clarityBtn = makeButton("🎧 Clarity Boost");
  clarityBtn.onclick = () => eq.gain.value = (eq.gain.value === 5 ? 0 : 5);
  panel.appendChild(clarityBtn);

  const darkBtn = makeButton("🌙 Dark Mode");
  darkBtn.onclick = () => document.body.style.filter = (document.body.style.filter ? "" : "brightness(0.7)");
  panel.appendChild(darkBtn);

  const sidebarBtn = makeButton("🎯 Toggle Sidebar");
  sidebarBtn.onclick = () => {
    document.querySelectorAll('[class*="sidebar"]').forEach(el => el.style.display = (el.style.display === "none" ? "" : "none"));
  };
  panel.appendChild(sidebarBtn);

  // ==========================
  // 🎨 HELPERS
  // ==========================
  function createSlider(label, min, max, defaultVal, onChange) {
    const container = document.createElement("div");
    container.style.marginTop = "10px";
    const lbl = document.createElement("div");
    lbl.innerText = label;
    lbl.style.fontSize = "12px";
    lbl.style.color = "#aaa";
    
    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.step = (max - min) / 100;
    input.value = defaultVal;
    Object.assign(input.style, { width: "100%", accentColor: "#00c6ff" });
    
    input.oninput = () => onChange(parseFloat(input.value));
    
    container.appendChild(lbl);
    container.appendChild(input);
    panel.appendChild(container);
  }

  function makeButton(text) {
    const btn = document.createElement("button");
    btn.innerText = text;
    Object.assign(btn.style, {
      width: "100%", marginTop: "8px", padding: "8px", borderRadius: "8px",
      border: "none", background: "linear-gradient(45deg, #00c6ff, #0072ff)",
      color: "#fff", cursor: "pointer", fontWeight: "bold"
    });
    return btn;
  }

  // ==========================
  // 🔊 AUDIO HOOK
  // ==========================
  function hookAudio() {
    document.querySelectorAll("audio, video").forEach(el => {
      if (!el._omni) {
        try {
          const src = audioCtx.createMediaElementSource(el);
          src.connect(eq);
          el._omni = true;
        } catch (e) {}
      }
    });
  }
  setInterval(hookAudio, 2000);

  // Drag functionality remains the same
  panel.onmousedown = e => {
    let x = e.clientX - panel.offsetLeft;
    let y = e.clientY - panel.offsetTop;
    const move = e => {
      panel.style.left = e.pageX - x + "px";
      panel.style.top = e.pageY - y + "px";
    };
    document.addEventListener("mousemove", move);
    document.onmouseup = () => {
      document.removeEventListener("mousemove", move);
      document.onmouseup = null;
    };
  };
})();
