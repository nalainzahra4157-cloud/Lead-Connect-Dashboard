// ==========================================
// 1. UTILITY & SPEECH FUNCTIONS (If any)
// ==========================================


// ==========================================
// 2. MAIN PROCESS FUNCTION
// ==========================================
function processLeadsData(formatType) {
    // Input elements ko unki sahi IDs se target karein (Apni HTML ke mutabiq check kar sakti hain)
    let phoneInput = document.getElementById("phone") || document.querySelector("textarea"); 
    let messageInput = document.getElementById("message") || document.querySelectorAll("textarea")[1];
    
    let rawNumbers = phoneInput ? phoneInput.value.trim() : "";
    let messageText = messageInput ? messageInput.value.trim() : "";

    console.log(`Processing Format: ${formatType}`);
    
    if (rawNumbers !== "" && messageText !== "") {
        
        // 1. Comma ya new line se numbers ko alag alag list mein convert karein
        let numbersArray = rawNumbers.split(/[\n,]+/);
        
        // 2. Pehla number uthaein aur usmein se extra spaces aur '+' saaf karein
        let firstNumber = numbersArray[0].trim().replace('+', '');
        
        if (firstNumber !== "") {
            // WhatsApp Link setup
            let whatsappUrl = `https://api.whatsapp.com/send?phone=${firstNumber}&text=${encodeURIComponent(messageText)}`;
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
        } else {
            alert("Baraye meharbani aik valid phone number enter karein!");
        }

    } else {
        alert("Baraye meharbani Phone Number aur Message Text dono lazmi enter karein!");
    }
}

// ==========================================
// 3. EVENT TRIGGERS
// ==========================================
// Check karein ke aapke buttons ki variables HTML se sahi mapped hain
let generateTextBtn = document.getElementById("generateTextBtn") || document.querySelector("button");
let generateVoiceBtn = document.getElementById("generateVoiceBtn") || document.querySelectorAll("button")[1];

if (generateTextBtn) {
    generateTextBtn.addEventListener('click', () => {
        processLeadsData("TEXT");
    });
}

if (generateVoiceBtn) {
    generateVoiceBtn.addEventListener('click', () => {
        processLeadsData("VOICE_FORMAT");
    });
}
