// app.js

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-submit');
    const voiceBtn = document.getElementById('voice-btn');
    const searchInput = document.getElementById('search-input');
    const loader = document.getElementById('loader');
    const resultsDashboard = document.getElementById('results-dashboard');
    const checkoutFooter = document.getElementById('checkout-footer');
    const bookBtn = document.getElementById('book-total-btn');
    const modal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const listeningIndicator = document.getElementById('listening-indicator');

    // Simulate AI Generation
    const simulateDataGeneration = () => {
        if (!searchInput.value.trim()) {
            searchInput.value = "Book me a week in Paris with flights and hotel";
        }

        // Hide results if showing
        resultsDashboard.classList.add('hidden');
        checkoutFooter.classList.add('hidden');
        
        // Show loader
        loader.classList.remove('hidden');
        
        // Scroll slightly down
        window.scrollTo({
            top: 150,
            behavior: 'smooth'
        });

        // Simulate API/AI delay (2.5 seconds)
        setTimeout(() => {
            loader.classList.add('hidden');
            resultsDashboard.classList.remove('hidden');
            
            // Show checkout footer nicely a bit later
            setTimeout(() => {
                checkoutFooter.classList.remove('hidden');
            }, 500);

            // Scroll to results
            resultsDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        }, 2500);
    };

    // Event Listeners
    searchBtn.addEventListener('click', simulateDataGeneration);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            simulateDataGeneration();
        }
    });

    // Web Speech API for Voice Mock
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = function() {
            voiceBtn.classList.add('recording');
            listeningIndicator.classList.remove('hidden');
            searchInput.placeholder = "Listening...";
        };

        recognition.onspeechend = function() {
            recognition.stop();
            voiceBtn.classList.remove('recording');
            listeningIndicator.classList.add('hidden');
            searchInput.placeholder = "Processing voice...";
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            // Auto trigger search after voice ends
            simulateDataGeneration();
        };

        voiceBtn.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        // Fallback if browser doesn't support
        voiceBtn.addEventListener('click', () => {
            alert("Voice Search is not supported in this browser. Please type your query.");
        });
    }

    // Modal Interaction
    bookBtn.addEventListener('click', () => {
        // Simulate processing payment
        bookBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
        bookBtn.disabled = true;

        setTimeout(() => {
            bookBtn.innerHTML = '1-Click Book Total <i class="fa-solid fa-bolt"></i>';
            bookBtn.disabled = false;
            modal.classList.remove('hidden');
        }, 1500);
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Tab Filtering Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.dashboard-grid .glass-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            // Add active to the clicked tab
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    if (card.classList.contains(filter) || (filter === 'element-weather' && card.classList.contains('element-forex'))) {
                        card.style.display = 'flex';
                        setTimeout(() => { card.style.opacity = '1'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                }
            });
        });
    });

    // Option Selection Logic
    const selectBtns = document.querySelectorAll('.select-option-btn');
    const totalPriceEl = document.querySelector('.total-price');

    const updateTotal = () => {
        let total = 0;
        document.querySelectorAll('.option-card.selected').forEach(card => {
            total += parseInt(card.getAttribute('data-price') || 0);
        });
        totalPriceEl.textContent = `$${total.toLocaleString()}`;
    };

    selectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.option-card');
            const type = card.getAttribute('data-type');

            // Reset all cards of same type
            document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(c => {
                c.classList.remove('selected');
                const badge = c.querySelector('.selected-badge');
                if(badge) badge.classList.add('hidden');
                const slctBtn = c.querySelector('.select-option-btn');
                if(slctBtn) slctBtn.classList.remove('hidden');
            });

            // Set this card as selected
            card.classList.add('selected');
            const badge = card.querySelector('.selected-badge');
            if(badge) badge.classList.remove('hidden');
            e.target.classList.add('hidden');

            updateTotal();
        });
    });

    // Initial total calculation
    updateTotal();

    // Helpdesk Logic
    const helpdeskFab = document.getElementById('helpdesk-fab');
    const helpdeskWidget = document.getElementById('helpdesk-widget');
    const closeHelpdeskBtn = document.getElementById('close-helpdesk');
    const helpdeskInput = document.getElementById('helpdesk-input');
    const helpdeskSend = document.getElementById('helpdesk-send');
    const chatBody = document.getElementById('chat-body');

    helpdeskFab.addEventListener('click', () => {
        helpdeskWidget.classList.remove('hidden');
        helpdeskFab.style.transform = 'scale(0)';
        setTimeout(() => helpdeskFab.classList.add('hidden'), 300);
    });

    closeHelpdeskBtn.addEventListener('click', () => {
        helpdeskWidget.classList.add('hidden');
        helpdeskFab.classList.remove('hidden');
        setTimeout(() => helpdeskFab.style.transform = 'scale(1)', 50);
    });

    const sendChatMessage = () => {
        const text = helpdeskInput.value.trim();
        if (!text) return;

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(userMsg);
        helpdeskInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Mock bot reply
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            botMsg.innerHTML = `<p>I can certainly help with that! Let me fetch the latest information on your request.</p>`;
            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    };

    if (helpdeskSend && helpdeskInput) {
        helpdeskSend.addEventListener('click', sendChatMessage);
        helpdeskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    // Dynamic Forex Rates
    const baseCurrencySelect = document.getElementById('base-currency');
    const targetCurrencySelect = document.getElementById('target-currency');
    const rateDisplay = document.getElementById('forex-rate-display');
    const cardBaseCurr = document.getElementById('card-base-curr');
    const cardTargetCurr = document.getElementById('card-target-curr');
    const cardTargetAmt = document.getElementById('card-target-amt');

    const getExchangeRate = (base, target) => {
        const key = `${base}-${target}`;
        const rates = {
            'USD-EUR': 0.94, 'USD-JPY': 150.2, 'USD-INR': 83.1, 'USD-AED': 3.67, 'USD-CHF': 0.91, 'USD-GBP': 0.79, 'USD-AUD': 1.54, 'USD-CAD': 1.36,
            'GBP-EUR': 1.18, 'GBP-JPY': 187.5, 'GBP-INR': 103.8, 'GBP-AED': 4.59, 'GBP-CHF': 1.14, 'GBP-USD': 1.25, 'GBP-AUD': 1.93, 'GBP-CAD': 1.72,
            'CAD-EUR': 0.68, 'CAD-JPY': 108.4, 'CAD-INR': 60.3, 'CAD-AED': 2.68, 'CAD-CHF': 0.65, 'CAD-USD': 0.72, 'CAD-GBP': 0.58, 'CAD-AUD': 1.13,
            'AUD-EUR': 0.61, 'AUD-JPY': 97.9, 'AUD-INR': 54.1, 'AUD-AED': 2.41, 'AUD-CHF': 0.58, 'AUD-USD': 0.65, 'AUD-GBP': 0.52, 'AUD-CAD': 0.88,
        };
        if (base === target) return 1.0;
        return rates[key] || parseFloat((Math.random() * (100 - 0.5) + 0.5).toFixed(2)); 
    };

    const updateForex = () => {
        if (!baseCurrencySelect || !targetCurrencySelect) return;
        const base = baseCurrencySelect.value;
        const target = targetCurrencySelect.value;
        const rate = getExchangeRate(base, target);
        
        // Update header
        if (rateDisplay) rateDisplay.textContent = rate;
        
        // Update card
        if (cardBaseCurr && cardTargetCurr && cardTargetAmt) {
            cardBaseCurr.textContent = base;
            cardTargetCurr.textContent = target;
            const cardAmt = (1000 * rate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            cardTargetAmt.textContent = cardAmt;
        }
    };

    if (baseCurrencySelect && targetCurrencySelect) {
        baseCurrencySelect.addEventListener('change', updateForex);
        targetCurrencySelect.addEventListener('change', updateForex);
        // Set initial
        updateForex();
    }

    // Document Scanner Animation
    const scanBtn = document.getElementById('scan-passport-btn');
    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            const frame = document.querySelector('.scanner-frame');
            const icon = document.querySelector('.passport-icon');
            
            scanBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Scanning...';
            scanBtn.disabled = true;
            frame.classList.add('scanning');
            
            setTimeout(() => {
                scanBtn.innerHTML = '<i class="fa-solid fa-check"></i> Scanned Successfully';
                scanBtn.classList.add('btn-primary');
                scanBtn.classList.remove('btn-outline');
                frame.classList.remove('scanning');
                icon.style.color = '#4CAF50';
                
                const newBadge = document.createElement('span');
                newBadge.className = 'badge badge-primary';
                newBadge.style.cssText = 'position: absolute; top: -10px; right: -10px; font-size: 0.6rem; background: #4CAF50;';
                newBadge.textContent = 'VERIFIED';
                frame.appendChild(newBadge);
                
            }, 2500);
        });
    }
});
