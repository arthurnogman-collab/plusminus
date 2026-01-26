// Floating Navigation Buttons with Popups
(function() {
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'floatingButtonContainer';
    buttonContainer.innerHTML = `
        <style>
            #floatingButtonContainer {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .floating-nav-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 14px 24px;
                border-radius: 50px;
                text-decoration: none;
                font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif;
                font-size: 15px;
                font-weight: 600;
                letter-spacing: 0.5px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                white-space: nowrap;
                cursor: pointer;
                border: none;
            }
            
            .floating-nav-btn.secondary {
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%);
                font-size: 13px;
                padding: 10px 20px;
                opacity: 0.85;
            }
            
            .floating-nav-btn:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
            }
            
            .floating-nav-btn.secondary:hover {
                opacity: 1;
            }
            
            /* Popup Overlay */
            .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                z-index: 2000;
                display: none;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(5px);
            }
            
            .popup-overlay.show {
                display: flex;
            }
            
            /* Popup Container */
            .popup-container {
                background: rgba(15, 15, 15, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 20px;
                padding: 2.5rem;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                position: relative;
                backdrop-filter: blur(20px);
                font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif;
            }
            
            /* Close Button */
            .popup-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: transparent;
                border: none;
                color: #aaa;
                font-size: 28px;
                cursor: pointer;
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            
            .popup-close:hover {
                color: #fff;
                transform: rotate(90deg);
            }
            
            /* Popup Title */
            .popup-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: #fff;
                margin-bottom: 1.5rem;
                letter-spacing: 0.02em;
            }
            
            /* Wallet Address Item */
            .wallet-item {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1.2rem;
                margin-bottom: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .wallet-item:hover {
                background: rgba(255, 255, 255, 0.08);
                border-color: rgba(102, 126, 234, 0.5);
                transform: translateX(-3px);
            }
            
            .wallet-label {
                font-size: 0.75rem;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 0.5rem;
            }
            
            .wallet-address {
                font-size: 0.85rem;
                color: #fff;
                font-family: 'Courier New', monospace;
                word-break: break-all;
                line-height: 1.5;
            }
            
            /* AI Navigator Buttons */
            .ai-nav-buttons {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .ai-nav-option {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 1.2rem 1.5rem;
                border-radius: 12px;
                font-size: 0.9rem;
                font-weight: 500;
                letter-spacing: 0.05em;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: block;
                text-align: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif;
            }
            
            .ai-nav-option:hover {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.5);
                transform: translateY(-2px);
            }
            
            /* Success message */
            .copy-success {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(20, 20, 20, 0.95);
                color: #fff;
                padding: 1.5rem 2.5rem;
                border-radius: 12px;
                font-size: 1rem;
                letter-spacing: 0.2em;
                z-index: 3000;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
            }
            
            .copy-success.show {
                opacity: 1;
            }
            
            @media (max-width: 768px) {
                #floatingButtonContainer {
                    top: 10px;
                    right: 5px;
                    gap: 8px;
                }
                
                .floating-nav-btn {
                    padding: 12px 20px !important;
                    font-size: 14px !important;
                    border-radius: 40px !important;
                }
                
                .floating-nav-btn.secondary {
                    font-size: 13px !important;
                    padding: 10px 18px !important;
                }
                
                .floating-nav-btn .btn-emoji {
                    font-size: 16px !important;
                }
                
                .floating-nav-btn.secondary .btn-emoji {
                    font-size: 14px !important;
                }
                
                .popup-container {
                    padding: 2rem 1.2rem;
                    width: 98%;
                    border-radius: 16px;
                }
                
                .popup-title {
                    font-size: 1.3rem;
                    padding-right: 2rem;
                }
                
                .wallet-item {
                    padding: 1rem;
                }
                
                .wallet-address {
                    font-size: 0.75rem;
                }
            }
        </style>
        
        <button class="floating-nav-btn" id="donateBtn">
            <span class="btn-emoji">💝</span>
            <span>Support ±Theory</span>
        </button>
        
        <button class="floating-nav-btn secondary" id="aiNavBtn">
            <span class="btn-emoji">🤖</span>
            <span>AI Navigator</span>
        </button>
        
        <!-- Donate Popup -->
        <div class="popup-overlay" id="donatePopup">
            <div class="popup-container">
                <button class="popup-close" onclick="document.getElementById('donatePopup').classList.remove('show')">×</button>
                <div class="popup-title">Support ±Theory</div>
                <div class="popup-content">
                    <p style="color: #aaa; margin-bottom: 1.5rem; line-height: 1.6;">If this work resonates with you, your support helps fund further research and development.</p>
                    <div class="wallet-item" data-address="NsRi4c6V4dTj6BDe6V8HGe63gpwr6LvLChEYXEicee1">
                        <div class="wallet-label">Solana</div>
                        <div class="wallet-address">NsRi4c6V4dTj6BDe6V8HGe63gpwr6LvLChEYXEicee1</div>
                    </div>
                    <div class="wallet-item" data-address="0xdcab1CEA91b8c8072E4Fc4a6325686571885D14D">
                        <div class="wallet-label">Ethereum</div>
                        <div class="wallet-address">0xdcab1CEA91b8c8072E4Fc4a6325686571885D14D</div>
                    </div>
                    <div class="wallet-item" data-address="bc1qmqluws9p6yuk87ffaqx9hyhtwpcj9a2fu6ae04">
                        <div class="wallet-label">Bitcoin</div>
                        <div class="wallet-address">bc1qmqluws9p6yuk87ffaqx9hyhtwpcj9a2fu6ae04</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- AI Navigator Popup -->
        <div class="popup-overlay" id="aiNavPopup">
            <div class="popup-container">
                <button class="popup-close" onclick="document.getElementById('aiNavPopup').classList.remove('show')">×</button>
                <div class="popup-title">AI Navigator</div>
                <div class="ai-nav-buttons">
                    <a href="https://chatgpt.com/g/g-69616a989c888191bea66415401ab261-theory-the-ultimate-generative-model" target="_blank" class="ai-nav-option">Custom GPT (ChatGPT)</a>
                    <button class="ai-nav-option" id="systemPromptBtn">System Prompt (Other Models)</button>
                </div>
            </div>
        </div>
        
        <!-- Copy Success Message -->
        <div class="copy-success" id="copySuccess">COPIED</div>
    `;
    
    // Append to body when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        document.body.appendChild(buttonContainer);
        
        // Button click handlers
        document.getElementById('donateBtn').addEventListener('click', () => {
            document.getElementById('donatePopup').classList.add('show');
        });
        
        document.getElementById('aiNavBtn').addEventListener('click', () => {
            document.getElementById('aiNavPopup').classList.add('show');
        });
        
        // Close popups when clicking overlay
        document.querySelectorAll('.popup-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('show');
                }
            });
        });
        
        // Close popups with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.popup-overlay').forEach(overlay => {
                    overlay.classList.remove('show');
                });
            }
        });
        
        // Wallet address copy functionality
        document.querySelectorAll('.wallet-item').forEach(item => {
            item.addEventListener('click', async () => {
                const address = item.dataset.address;
                await copyToClipboard(address);
            });
        });
        
        // System prompt button - needs to access promptText from prompt.js
        const systemPromptBtn = document.getElementById('systemPromptBtn');
        if (systemPromptBtn) {
            systemPromptBtn.addEventListener('click', async () => {
                if (typeof promptText !== 'undefined') {
                    await copyToClipboard(promptText);
                } else {
                    alert('System prompt not available. Please ensure prompt.js is loaded.');
                }
            });
        }
        
        // Scroll behavior
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const container = document.getElementById('floatingButtonContainer');
            if (!container) return;
            
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                container.style.opacity = '0.95';
            } else {
                container.style.opacity = '1';
            }
            lastScrollTop = scrollTop;
        }, false);
    }
    
    // Copy to clipboard function
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showCopySuccess();
        } catch (err) {
            console.error('Failed to copy:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showCopySuccess();
            } catch (err) {
                alert('Failed to copy to clipboard');
            }
            document.body.removeChild(textArea);
        }
    }
    
    // Show copy success message
    function showCopySuccess() {
        const successMsg = document.getElementById('copySuccess');
        successMsg.classList.add('show');
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 2000);
    }
})();
