/**
 * ============================================================
 * NOCTURNAL OMNI: RGB TITAN EDITION (V7.0 - UNLEASHED)
 * ------------------------------------------------------------
 * Branding: Nocturnal Omni (Automated Style)
 * Power: 100x Gain Multiplier (NO HARD LIMITER)
 * Theme: RGB Neon (Red, Blue, Green)
 * Length: 250+ Lines for Maximum Stability & Enhancement
 * ============================================================
 */

(function() {
    "use strict";

    console.log("%c[Nocturnal Omni]%c Initializing RGB TITAN Engine...", "color: #ff0000; font-weight: bold;", "color: #fff;");

    // ==========================================
    // 1. ADVANCED AUDIO CONTEXT INITIALIZATION
    // ==========================================
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // TRIPLE-STAGE POWER ARCHITECTURE (For 100x Volume)
    // Stage 1: Initial Input Boost
    const preAmp = audioCtx.createGain();   
    // Stage 2: Main Processing Power
    const powerAmp = audioCtx.createGain(); 
    // Stage 3: Final Master Output (Dangerous Levels)
    const masterVol = audioCtx.createGain(); 

    // DYNAMICS PROCESSING
    const mainComp = audioCtx.createDynamicsCompressor();
    const driveStage = audioCtx.createDynamicsCompressor();
    const saturationNode = audioCtx.createWaveShaper();

    // PRECISION FREQUENCY EQUALIZERS
    const bassEq = audioCtx.createBiquadFilter();
    const presenceEq = audioCtx.createBiquadFilter();
    const trebleEq = audioCtx.createBiquadFilter();
    const highDefClarity = audioCtx.createBiquadFilter();

    // ==========================================
    // 2. DETAILED NODE CALIBRATION
    // ==========================================
    
    // Bass Hardware Simulation (60Hz)
    bassEq.type = "lowshelf";
    bassEq.frequency.value = 60;

    // Presence / Vocal Definition (3kHz)
    presenceEq.type = "peaking";
    presenceEq.frequency.value = 3000;
    presenceEq.Q.value = 1.5;

    // Treble / Air (12kHz)
    trebleEq.type = "highshelf";
    trebleEq.frequency.value = 12000;

    // High-Def Clarity Focus (4.5kHz)
    highDefClarity.type = "peaking";
    highDefClarity.frequency.value = 4500;
    highDefClarity.gain.value = 12; // Default clarity boost

    // Compression Logic for "Thick" Sound
    mainComp.threshold.value = -45;
    mainComp.ratio.value = 20;
    mainComp.attack.value = 0.001;
    mainComp.release.value = 0.15;

    // ==========================================
    // 3. AUDIO ROUTING GRAPH (NO LIMITER)
    // ==========================================
    // Sequence: Clarity -> EQ Path -> Saturation -> Compression -> Triple Gain Path
    highDefClarity.connect(bassEq);
    bassEq.connect(presenceEq);
    presenceEq.connect(trebleEq);
    trebleEq.connect(saturationNode);
    saturationNode.connect(mainComp);
    mainComp.connect(driveStage);
    driveStage.connect(preAmp);
    preAmp.connect(powerAmp);
    powerAmp.connect(masterVol);
    
    // THE UNLEASHED BRIDGE: Direct to output without Limiter safety
    masterVol.connect(audioCtx.destination);

    // ==========================================
    // 4. UI CONSTRUCTION (RGB NEON AUTOMATED)
    // ==========================================
    const panel = document.createElement("div");
    panel.id = "nocturnal-omni-v7";
    
    // Internal HTML Structure with Automated Branding
    panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:3px solid #ff0000; padding-bottom:10px;">
            <div style="font-weight:900; font-size:20px; color:#ff0000; text-shadow: 0 0 15px #ff0000; font-family: 'Arial Black', sans-serif;">
                NOCTURNAL <span style="color:#00ff00;">OMNI</span>
            </div>
            <div style="text-align:right;">
                <div style="font-size:10px; color:#0000ff; font-weight:bold; letter-spacing:1px;">ENGINE: ACTIVE</div>
                <div style="font-size:8px; color:#fff; opacity:0.6;">LIMITER: DISENGAGED</div>
            </div>
        </div>
        <style>
            #nocturnal-omni-v7::-webkit-scrollbar { width: 5px; }
            #nocturnal-omni-v7::-webkit-scrollbar-track { background: #000; }
            #nocturnal-omni-v7::-webkit-scrollbar-thumb { background: linear-gradient(#ff0000, #00ff00, #0000ff); border-radius: 10px; }
            .rgb-slider { -webkit-appearance: none; width: 100%; height: 5px; border-radius: 5px; background: #111; outline: none; margin: 10px 0; }
            .rgb-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 15px; height: 15px; border-radius: 50%; cursor: pointer; border: 2px solid #fff; }
        </style>
    `;

    // Advanced Panel Styling
    Object.assign(panel.style, {
        position: "fixed", top: "30px", right: "30px", zIndex: "20000",
        width: "340px", padding: "25px", borderRadius: "8px",
        background: "rgba(5, 5, 5, 0.98)", border: "2px solid #0000ff",
        color: "#fff", fontFamily: "'Courier New', Courier, monospace",
        boxShadow: "0 0 40px rgba(255, 0, 0, 0.7)", maxHeight: "90vh", overflowY: "auto",
        transition: "box-shadow 0.5s ease-in-out"
    });

    document.body.appendChild(panel);

    // ==========================================
    // 5. ENHANCED COMPONENT FACTORY
    // ==========================================
    
    /**
     * Creates a Category Header with RGB accents
     */
    function addSection(title, color) {
        const h = document.createElement("div");
        h.innerText = title;
        h.style.cssText = `color:${color}; font-size:12px; margin:25px 0 12px 0; border-bottom:1px solid #444; padding-bottom:5px; font-weight:bold; letter-spacing:1.5px;`;
        panel.appendChild(h);
    }

    /**
     * Creates a High-Performance Slider for audio control
     */
    function buildSlider(label, min, max, def, color, callback) {
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "18px";

        const info = document.createElement("div");
        info.style.cssText = `display:flex; justify-content:space-between; font-size:11px; color:${color}; font-weight:bold; margin-bottom:6px;`;
        
        const name = document.createElement("span");
        name.innerText = label.toUpperCase();
        
        const value = document.createElement("span");
        value.id = `val-id-${label}`;
        value.innerText = def;
        value.style.color = "#fff";

        info.appendChild(name);
        info.appendChild(value);

        const input = document.createElement("input");
        input.type = "range";
        input.min = min;
        input.max = max;
        input.step = "0.1";
        input.value = def;
        input.className = "rgb-slider";
        input.style.accentColor = color;

        input.oninput = () => {
            const v = parseFloat(input.value);
            value.innerText = v;
            callback(v);
            // Pulsing effect on change
            panel.style.boxShadow = `0 0 50px ${color}`;
            setTimeout(() => panel.style.boxShadow = "0 0 40px rgba(255, 0, 0, 0.7)", 200);
        };

        wrapper.appendChild(info);
        wrapper.appendChild(input);
        panel.appendChild(wrapper);
    }

    // ==========================================
    // 6. MASTER CONTROLS (THE SCREENSHOT OPTIONS)
    // ==========================================
    
    addSection("1. RAW AMPLIFICATION [RED]", "#ff0000");
    buildSlider("Master Power", 0, 100, 1, "#ff0000", v => masterVol.gain.value = v);
    buildSlider("Pre-Amp Drive", 0, 100, 1, "#ff0000", v => preAmp.gain.value = v);
    buildSlider("Power Stage", 0, 100, 1, "#ff0000", v => powerAmp.gain.value = v);
    buildSlider("Loudness Drive", -60, 20, -24, "#ff0000", v => driveStage.threshold.value = v);

    addSection("2. SIGNAL DEFINITION [BLUE]", "#0000ff");
    buildSlider("Clarity Focus", -50, 50, 12, "#0000ff", v => highDefClarity.gain.value = v);
    buildSlider("Comp Threshold", -100, 0, -45, "#0000ff", v => mainComp.threshold.value = v);
    buildSlider("Comp Ratio", 1, 50, 20, "#0000ff", v => mainComp.ratio.value = v);
    buildSlider("Saturation", 0, 300, 0, "#0000ff", v => {
        const n = 44100; const curve = new Float32Array(n);
        const deg = Math.PI / 180;
        for (let i = 0; i < n; ++i) { 
            let x = (i * 2) / n - 1; 
            curve[i] = ((3 + v) * x * 20 * deg) / (Math.PI + v * Math.abs(x)); 
        }
        saturationNode.curve = v > 0 ? curve : null;
    });

    addSection("3. NATIVE FREQUENCY [GREEN]", "#00ff00");
    buildSlider("Sub Quake (60Hz)", -60, 60, 0, "#00ff00", v => bassEq.gain.value = v);
    buildSlider("Presence (3kHz)", -60, 60, 0, "#00ff00", v => presenceEq.gain.value = v);
    buildSlider("Air Boost (12kHz)", -60, 60, 0, "#00ff00", v => trebleEq.gain.value = v);

    // ==========================================
    // 7. SYSTEM UTILITIES & AUTOMATION
    // ==========================================
    
    addSection("4. ENGINE UTILITY", "#ffffff");
    const grid = document.createElement("div");
    grid.style.display = "grid"; grid.style.gridTemplateColumns = "1fr 1fr"; grid.style.gap = "12px";

    function buildBtn(text, color, action) {
        const b = document.createElement("button");
        b.innerText = text;
        Object.assign(b.style, {
            padding: "12px", background: "rgba(0,0,0,0.5)", border: `2px solid ${color}`,
            color: "#fff", cursor: "pointer", fontSize: "10px", fontWeight: "900", transition: "0.3s"
        });
        b.onmouseenter = () => { b.style.background = color; b.style.color = "#000"; };
        b.onmouseleave = () => { b.style.background = "transparent"; b.style.color = "#fff"; };
        b.onclick = action;
        return b;
    }

    grid.append(
        buildBtn("REBOOT ENGINE", "#ffffff", () => location.reload()),
        buildBtn("DARK VISION", "#0000ff", () => {
            document.body.style.filter = document.body.style.filter ? "" : "brightness(0.6) contrast(1.1)";
        }),
        buildBtn("HIDE INTERFACE", "#ff0000", () => {
            document.querySelectorAll('[class*="sidebar"]').forEach(s => s.style.display = s.style.display === "none" ? "" : "none");
        }),
        buildBtn("CLARITY TOGGLE", "#00ff00", () => {
            highDefClarity.gain.value = highDefClarity.gain.value > 0 ? 0 : 12;
        })
    );
    panel.appendChild(grid);

    // ==========================================
    // 8. STABLE AUDIO HOOKING (DYNAMIC CHECK)
    // ==========================================
    function hookMedia() {
        const media = document.querySelectorAll("audio, video");
        media.forEach(item => {
            if (!item._nocturnalHooked) {
                try {
                    const stream = audioCtx.createMediaElementSource(item);
                    stream.connect(highDefClarity);
                    item._nocturnalHooked = true;
                    console.log("%c[Nocturnal Omni] Audio Stream Secured", "color: #00ff00;");
                } catch (e) {
                    // Element likely already connected by Discord
                }
            }
        });
    }

    // Run hook every 2 seconds to catch new voice streams/videos
    setInterval(hookMedia, 2000);

    // ==========================================
    // 9. INTERACTIVE DRAG LOGIC
    // ==========================================
    panel.onmousedown = (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;
        let startX = e.clientX - panel.offsetLeft;
        let startY = e.clientY - panel.offsetTop;
        
        const onMouseMove = (ev) => {
            panel.style.left = ev.pageX - startX + 'px';
            panel.style.top = ev.pageY - startY + 'px';
        };

        document.addEventListener("mousemove", onMouseMove);
        document.onmouseup = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.onmouseup = null;
        };
    };

    console.log("%c[Nocturnal Omni] Titan V7 Online.", "color: #00ff00; font-weight: bold;");
})();
