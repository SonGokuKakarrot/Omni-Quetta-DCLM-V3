(function () {
  console.log("[Nocturnal Omni] Loaded");

  // --- AUDIO ENGINE ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioCtx.createGain();
  const mainComp = audioCtx.createDynamicsCompressor();
  const loudnessDrive = audioCtx.createDynamicsCompressor();
  const limiter = audioCtx.createDynamicsCompressor();
  
  const distortion = audioCtx.createWaveShaper();
  function makeDistortion(amt) {
    let n = 44100, curve = new Float32Array(n), deg = Math.PI / 180, i = 0, x;
    for ( ; i < n; ++i ) {
      x = i * 2 / n - 1;
      curve[i] = (3 + amt) * x * 20 * deg / (Math.PI + amt * Math.abs(x));
    }
    return curve;
  }

  const bassEq = audioCtx.createBiquadFilter(); bassEq.type = "lowshelf";
  const presenceEq = audioCtx.createBiquadFilter(); presenceEq.type = "peaking"; presenceEq.frequency.value = 3000;
  const trebleEq = audioCtx.createBiquadFilter(); trebleEq.type = "highshelf";
  const eq = audioCtx.createBiquadFilter(); eq.type = "peaking"; eq.frequency.value = 3000; eq.gain.value = 5;

  eq.connect(bassEq).connect(presenceEq).connect(trebleEq).connect(distortion).connect(mainComp).connect(loudnessDrive).connect(gainNode).connect(limiter).connect(audioCtx.destination);
  limiter.threshold.value = -1; limiter.ratio.value = 20;

  // --- UI PANEL ---
  const panel = document.createElement("div");
  panel.innerHTML = `<div style="font-weight:bold; font-size:16px; text-align:center; margin-bottom:10px;">🌙 Nocturnal Omni</div>`;
  Object.assign(panel.style, {
    position: "fixed", top: "20px", right: "20px", zIndex: "9999",
    width: "280px", padding: "15px", borderRadius: "16px",
    background: "rgba(10,10,15,0.9)", backdropFilter: "blur(15px)",
    color: "#fff", fontFamily: "sans-serif", boxShadow: "0 0 20px rgba(0,150,255,0.4)",
    maxHeight: "85vh", overflowY: "auto"
  });
  document.body.appendChild(panel);

  // --- MIC MAXIMIZER SLIDERS ---
  createSlider("Gain (dB)", -20, 20, 0, v => gainNode.gain.value = Math.pow(10, v / 20));
  createSlider("Loudness Drive", -60, 0, -24, v => loudnessDrive.threshold.value = v);
  createSlider("Saturation Drive", 0, 100, 0, v => distortion.curve = v > 0 ? makeDistortion(v) : null);
  createSlider("Comp Threshold (dB)", -60, 0, -24, v => mainComp.threshold.value = v);
  createSlider("Comp Ratio", 1, 20, 4, v => mainComp.ratio.value = v);
  createSlider("Presence EQ (dB)", -20, 20, 0, v => presenceEq.gain.value = v);
  createSlider("Bass EQ (dB)", -20, 20, 0, v => bassEq.gain.value = v);
  createSlider("Treble EQ (dB)", -20, 20, 0, v => trebleEq.gain.value = v);

  // --- LEGACY BUTTONS ---
  const clarityBtn = makeBtn("🎧 Clarity Boost");
  clarityBtn.onclick = () => eq.gain.value = eq.gain.value === 5 ? 0 : 5;
  const darkBtn = makeBtn("🌙 Dark Mode");
  darkBtn.onclick = () => document.body.style.filter = document.body.style.filter ? "" : "brightness(0.7)";
  const sidebarBtn = makeBtn("🎯 Toggle Sidebar");
  sidebarBtn.onclick = () => document.querySelectorAll('[class*="sidebar"]').forEach(el => el.style.display = el.style.display === "none" ? "" : "none");

  // --- HELPER FUNCTIONS ---
  function createSlider(label, min, max, def, cb) {
    const div = document.createElement("div"); div.style.marginTop = "8px";
    div.innerHTML = `<div style="font-size:11px; color:#aaa">${label}</div>`;
    const input = document.createElement("input");
    input.type = "range"; input.min = min; input.max = max; input.step = "0.1"; input.value = def;
    Object.assign(input.style, { width: "100%", accentColor: "#00c6ff" });
    input.oninput = () => cb(parseFloat(input.value));
    div.appendChild(input); panel.appendChild(div);
  }
  function makeBtn(t) {
    const b = document.createElement("button"); b.innerText = t;
    Object.assign(b.style, { width: "100%", marginTop: "8px", padding: "8px", borderRadius: "8px", border: "none", background: "linear-gradient(45deg, #00c6ff, #0072ff)", color: "#fff", cursor: "pointer" });
    panel.appendChild(b); return b;
  }

  // --- HOOK ---
  setInterval(() => {
    document.querySelectorAll("audio, video").forEach(el => {
      if (!el._omni) { try { audioCtx.createMediaElementSource(el).connect(eq); el._omni = true; } catch(e){} }
    });
  }, 2000);
})();
