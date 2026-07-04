// ==========================================
// 1. ELEMENTS SELECTION
// ==========================================
const leadNumbersInput = document.getElementById('lead-numbers');
const messageContentInput = document.getElementById('message-content');
const generateTextBtn = document.getElementById('generate-text-btn');
const generateVoiceBtn = document.getElementById('generate-voice-btn');
const statusWindow = document.getElementById('status-window');
const payloadOutput = document.getElementById('payload-output');

// Browser ki voice synthesis machine ko initialize karna
const synth = window.speechSynthesis;

// ==========================================
// 2. CORE DATA PARSING & VOICE SYNTHESIS
// ==========================================
function processLeadsData(mode) {
    const rawNumbers = leadNumbersInput.value;
    const textMessage = messageContentInput.value;

    // Basic Validation
    if (!rawNumbers.trim() || !textMessage.trim()) {
        alert("⚠️ Please fill in both the Lead Numbers and Communication Text fields!");
        return;
    }

    // Comma aur line breaks ko split karke numbers saaf karna
    const cleanNumbersArray = rawNumbers
        .split(/[\n,]+/)
        .map(num => num.trim())
        .filter(num => num.length > 0);

    // Advanced JSON Data Structure
    const payload = {
        campaign_timestamp: new Date().toISOString(),
        delivery_mode: mode,
        total_leads_captured: cleanNumbersArray.length,
        extracted_leads: cleanNumbersArray,
        communication_payload: {
            content_type: mode === "TEXT" ? "alphanumeric_string" : "voice_synth_data",
            body: textMessage
        }
    };

    // UI render area update karna
    payloadOutput.textContent = JSON.stringify(payload, null, 4);
    statusWindow.classList.remove('hidden');

    // ==========================================
    // VOICE MODE AUTOMATION (TEXT TO SPEECH)
    // ==========================================
    if (mode === "VOICE_FORMAT") {
        // Agar pehle se koi voice chal rahi ho toh use rokna
        if (synth.speaking) {
            synth.cancel();
        }

        // New utterance instance banana aur message feed karna
        const utterThis = new SpeechSynthesisUtterance(textMessage);
        
        // Voice properties balance karna (Professional English tone)
        utterThis.pitch = 1.0; // Normal tone pitch
        utterThis.rate = 0.95; // Thodi smooth speed taake clear samajh aaye

        // System output audio run karna
        synth.speak(utterThis);
    }
}

// ==========================================
// 3. EVENT TRIGGERS
// ==========================================
generateTextBtn.addEventListener('click', () => {
    processLeadsData("TEXT");
});

generateVoiceBtn.addEventListener('click', () => {
    processLeadsData("VOICE_FORMAT");
});