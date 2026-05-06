/**
 * ============================================================
 * NOCTURNAL OMNI: ULTIMATE EDITION (V4.2)
 * ------------------------------------------------------------
 * Features: Mic Maximizer, 3-Band EQ, Saturation, 
 * System Controls, and Neon "Universal God" Aesthetics.
 * ============================================================
 */

(function() {
    "use strict";

    console.log("[Nocturnal Omni] Initializing high-performance audio engine...");

    // ==========================================
    // 1. AUDIO CONTEXT & CORE NODES
    // ==========================================
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Core Gain and Dynamics
    const gainNode = audioCtx.createGain();
    const mainComp = audioCtx.createDynamicsCompressor();
    const loudnessDrive = audioCtx.createDynamicsCompressor();
    const limiter = audioCtx.createDynamicsCompressor();
    
    // Saturation / Distortion Node
    const saturationNode = audioCtx.createWaveShaper();

    // 3-Band Equalizer Nodes
    const bassEq = audioCtx.createBiquadFilter();
    const presenceEq = audioCtx.createBiquadFilter();
    const trebleEq = audioCtx.createBiquadFilter();
    const masterClarityEq = audioCtx.createBiquadFilter();

    // ==========================================
    // 2. NODE CONFIGURATIONS
    // ==========================================
    
    // EQ Initial Settings
    bassEq.type = "lowshelf";
    bassEq.frequency.value = 100;

    presenceEq.type = "peaking";
    presenceEq.frequency.value = 3000;
    presenceEq.Q.value = 1.0;

    trebleEq.type = "highshelf";
    trebleEq.frequency.value = 8000;

    masterClarityEq.type = "peaking";
    masterClarityEq.frequency.value = 3000;
    masterClarityEq.gain.value = 5;

    // Compressor Defaults
    mainComp.threshold.value = -24;
    mainComp.ratio.value = 4;
    mainComp.attack.value = 0.003;
    mainComp.release.value = 0.25;

    // Limiter Defaults (Safety)
    limiter.threshold.value = -1;
    limiter.ratio.value = 20;

    // ==========================================
    // 3. AUDIO ROUTING (The Chain)
    // ==========================================
    // Source -> Clarity -> Bass -> Presence -> Treble -> Saturation -> Comp -> Loudness -> Gain -> Limiter -> Out
    masterClarityEq.connect(bassEq);
    bassEq.connect(presenceEq);
    presenceEq.connect(trebleEq);
    trebleEq.connect(saturationNode);
    saturationNode.connect(mainComp);
    mainComp.connect(loudnessDrive);
    loudnessDrive.connect(gainNode);
    gainNode.connect(limiter);
    limiter.connect(audioCtx.destination);

    // ==========================================
    // 4. UI CONSTRUCTION (NOCTURNAL OMNI STYLE)
    // ==========================================
    const panel = document.createElement("div");
    panel.id = "nocturnal-omni-panel";
    
    // Header with Neon Branding
    panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #7c12f7; padding-bottom:8px;">
            <div style="font-weight:bold; font-size:18px; color:#fff; text-shadow: 0 0 10px #7c12f7, 0 0 20px #7c12f7;">
                NOCTURNAL <span style="color:#f712f7;">OMNI</span>
            </div>
            <div style="font-size:9px; color:#00e5ff; letter-spacing:1px; font-weight:bold; animation: blink 1.5s infinite;">
                WAITING FOR MIC
            </div>
        </div>
        <style>
            @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
            #nocturnal-omni-panel::-webkit-scrollbar { width: 4px; }
            #nocturnal-omni-panel::-webkit-scrollbar-thumb { background: #7c12f7; border-radius: 10px; }
        </style>
    `;

    // Panel Container Style
    Object.assign(panel.style, {
        position: "fixed",
        top: "40px",
        right: "25px",
        zIndex: "10000",
        width: "320px",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(8, 4, 15, 0.98)",
        border: "2px solid #7c12f7",
        color: "#fff",
        fontFamily: "'Courier New', Courier, monospace",
        boxShadow: "0 0 30px rgba(124, 18, 247, 0.6)",
        maxHeight: "85vh",
        overflowY: "auto",
        userSelect: "none"
    });

    document.body.appendChild(panel);

    // ==========================================
    // 5. SLIDER & COMPONENT BUILDERS
    // ==========================================
    
    function addSectionHeader(title) {
        const header = document.createElement("div");
        header.innerText = title;
        header.style.cssText = `
            color: #00e5ff;
            font-size: 11px;
            margin: 20px 0 10px 0;
            border-bottom: 1px solid #333;
            padding-bottom: 4px;
            font-weight: bold;
            text-transform: uppercase;
        `;
        panel.appendChild(header);
    }

    function createPremiumSlider(label, min, max, initialValue, callback) {
        const container = document.createElement("div");
        container.style.marginBottom = "14px";

        const labelRow = document.createElement("div");
        labelRow.style.cssText = "display:flex; justify-content:space-between; font-size:10px; color:#f712f7; margin-bottom:5px; font-weight:bold;";
        
        const labelText = document.createElement("span");
        labelText.innerText = label.toUpperCase();
        
        const valueDisplay = document.createElement("span");
        valueDisplay.innerText = initialValue;
        valueDisplay.style.color = "#fff";
        
        labelRow.appendChild(labelText);
        labelRow.appendChild(valueDisplay);

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.step = "0.1";
        slider.value = initialValue;
        
        Object.assign(slider.style, {
            width: "100%",
            height: "4px",
            background: "#1a1a1a",
            outline: "none",
            borderRadius: "2px",
            appearance: "none",
            cursor: "pointer",
            accentColor: "#f712f7"
        });

        slider.oninput = () => {
            const val = parseFloat(slider.value);
            valueDisplay.innerText = val;
            callback(val);
        };

        container.appendChild(labelRow);
        container.appendChild(slider);
        panel.appendChild(container);
    }

    // ==========================================
    // 6. MIC MAXIMIZER CONTROLS (SCREENSHOT MAPPED)
    // ==========================================
    
    addSectionHeader("1. Android 14 Exploits (Core)");
    
    createPremiumSlider("Gain (dB Boost)", -20, 20, 0, (val) => {
        gainNode.gain.value = Math.pow(10, val / 20);
    });

    createPremiumSlider("Loudness Drive", -60, 0, -24, (val) => {
        loudnessDrive.threshold.value = val;
    });

    createPremiumSlider("Saturation Drive", 0, 100, 0, (val) => {
        if (val === 0) {
            saturationNode.curve = null;
        } else {
            const n_samples = 44100;
            const curve = new Float32Array(n_samples);
            const deg = Math.PI / 180;
            for (let i = 0; i < n_samples; ++i) {
                const x = (i * 2) / n_samples - 1;
                curve[i] = ((3 + val) * x * 20 * deg) / (Math.PI + val * Math.abs(x));
            }
            saturationNode.curve = curve;
        }
    });

    addSectionHeader("2. Raw Math Boosting (Dynamics)");

    createPremiumSlider("Comp Threshold (dB)", -60, 0, -24, (val) => {
        mainComp.threshold.value = val;
    });

    createPremiumSlider("Comp Ratio", 1, 20, 4, (val) => {
        mainComp.ratio.value = val;
    });

    addSectionHeader("3. Native Frequency EQs");

    createPremiumSlider("Hardware Sub Quake (60Hz)", -20, 20, 0, (val) => {
        bassEq.gain.value = val;
    });

    createPremiumSlider("Ear Pierce (3kHz)", -20, 20, 0, (val) => {
        presenceEq.gain.value = val;
    });

    createPremiumSlider("Treble Air (10kHz)", -20, 20, 0, (val) => {
        trebleEq.gain.value = val;
    });

    // ==========================================
    // 7. SYSTEM & UTILITY FEATURES
    // ==========================================
    
    addSectionHeader("4. System & Global Settings");

    const systemGrid = document.createElement("div");
    systemGrid.style.display = "grid";
    systemGrid.style.gridTemplateColumns = "1fr 1fr";
    systemGrid.style.gap = "10px";
    systemGrid.style.marginTop = "10px";

    function createSystemButton(text, onClick) {
        const btn = document.createElement("button");
        btn.innerText = text;
        Object.assign(btn.style, {
            padding: "10px",
            background: "rgba(124, 18, 247, 0.1)",
            border: "1px solid #7c12f7",
            color: "#fff",
            cursor: "pointer",
            fontSize: "10px",
            fontWeight: "bold",
            transition: "all 0.2s ease",
            borderRadius: "4px"
        });

        btn.onmouseenter = () => {
            btn.style.background = "#7c12f7";
            btn.style.boxShadow = "0 0 10px #7c12f7";
        };
        btn.onmouseleave = () => {
            btn.style.background = "rgba(124, 18, 247, 0.1)";
            btn.style.boxShadow = "none";
        };

        btn.onclick = onClick;
        return btn;
    }

    // Toggle Clarity
    const clarityBtn = createSystemButton("CLARITY BOOST", () => {
        const current = masterClarityEq.gain.value;
        masterClarityEq.gain.value = current === 5 ? 0 : 5;
        clarityBtn.style.borderColor = masterClarityEq.gain.value === 5 ? "#00e5ff" : "#7c12f7";
    });

    // Dark Mode Toggle
    const darkBtn = createSystemButton("DARK MODE", () => {
        const isDark = document.body.style.filter === "brightness(0.6)";
        document.body.style.filter = isDark ? "" : "brightness(0.6)";
        darkBtn.style.borderColor = !isDark ? "#00e5ff" : "#7c12f7";
    });

    // Sidebar Toggle
    const sidebarBtn = createSystemButton("TOGGLE SIDEBAR", () => {
        const sidebars = document.querySelectorAll('[class*="sidebar"]');
        sidebars.forEach(s => {
            s.style.display = s.style.display === "none" ? "" : "none";
        });
    });

    // Reset All
    const resetBtn = createSystemButton("RELOAD / RESET", () => {
        location.reload();
    });

    systemGrid.append(clarityBtn, darkBtn, sidebarBtn, resetBtn);
    panel.appendChild(systemGrid);

    // ==========================================
    // 8. AUDIO HOOKING LOGIC
    // ==========================================
    function applyAudioHook() {
        const elements = document.querySelectorAll("audio, video");
        elements.forEach(media => {
            if (!media._omniAttached) {
                try {
                    const source = audioCtx.createMediaElementSource(media);
                    source.connect(masterClarityEq);
                    media._omniAttached = true;
                    console.log("[Nocturnal Omni] Successfully hooked a new media element.");
                } catch (err) {
                    // This error usually happens if the element is already connected
                }
            }
        });
    }

    // Continuously check for new audio elements (Discord dynamic loading)
    const hookInterval = setInterval(applyAudioHook, 2500);

    // ==========================================
    // 9. PANEL DRAGGABILITY
    // ==========================================
    panel.onmousedown = function(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "BUTTON") return;

        let shiftX = event.clientX - panel.getBoundingClientRect().left;
        let shiftY = event.clientY - panel.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            panel.style.left = pageX - shiftX + 'px';
            panel.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };

    panel.ondragstart = function() { return false; };

    console.log("[Nocturnal Omni] Full UI and Audio Chain established.");
})();
