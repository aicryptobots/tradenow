<script>
        // ==================== AUDIO ALERTS ====================
        let audioAlertsEnabled = true;
        
        function playAlert80() {
            if (!audioAlertsEnabled) return;
            
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioCtx.currentTime;
            
            const osc1 = audioCtx.createOscillator();
            const gain1 = audioCtx.createGain();
            osc1.type = 'sine';
            osc1.frequency.value = 880;
            gain1.gain.setValueAtTime(0.3, now);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc1.connect(gain1);
            gain1.connect(audioCtx.destination);
            osc1.start(now);
            osc1.stop(now + 0.5);
            
            setTimeout(() => {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.type = 'sine';
                osc2.frequency.value = 880;
                gain2.gain.setValueAtTime(0.3, now + 0.1);
                gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.start(now + 0.1);
                osc2.stop(now + 0.6);
            }, 100);
            
            showNotification('🔊 80%+ Confidence Alert!', 'warning');
        }
        
        function playAlert90() {
            if (!audioAlertsEnabled) return;
            
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioCtx.currentTime;
            
            for (let i = 0; i < 3; i++) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 1046.5 + (i * 100);
                gain.gain.setValueAtTime(0.4, now + (i * 0.15));
                gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.15) + 0.3);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + (i * 0.15));
                osc.stop(now + (i * 0.15) + 0.3);
            }
            
            showNotification('🔊🔊 90%+ Confidence Alert! Strong Signal!', 'success');
        }
        
        function testAlert(level) {
            if (level === 80) playAlert80();
            else if (level === 90) playAlert90();
        }
        
        function toggleAlerts() {
            audioAlertsEnabled = !audioAlertsEnabled;
            const toggle = document.getElementById('alertToggle');
            toggle.classList.toggle('active', audioAlertsEnabled);
            showNotification(audioAlertsEnabled ? '🔔 Audio Alerts Enabled' : '🔕 Audio Alerts Disabled', 'info');
        }
        
        // ==================== AI SIGNAL GENERATOR ====================
        function generateAISignal() {
            const signals = ['BUY', 'SELL', 'NEUTRAL'];
            const rsiStates = ['Oversold', 'Bullish', 'Neutral', 'Bearish', 'Overbought'];
            const macdStates = ['Buy', 'Sell', 'Neutral'];
            
            const signal = signals[Math.floor(Math.random() * signals.length)];
            const confidence = Math.floor(Math.random() * 30) + 70;
            const patterns = Math.floor(Math.random() * 8) + 2;
            const bullishPatterns = Math.floor(Math.random() * patterns);
            const bearishPatterns = patterns - bullishPatterns;
            
            const rsi = rsiStates[Math.floor(Math.random() * rsiStates.length)];
            const macd = macdStates[Math.floor(Math.random() * macdStates.length)];
            
            const aiSignal = document.getElementById('aiSignal');
            aiSignal.textContent = signal;
            aiSignal.className = `value ${signal.toLowerCase()}`;
            
            document.getElementById('aiConfidence').textContent = confidence + '%';
            document.getElementById('aiPatterns').textContent = patterns;
            
            document.getElementById('rsiSignal').textContent = `RSI: ${rsi}`;
            document.getElementById('macdSignal').textContent = `MACD: ${macd}`;
            document.getElementById('patternsSignal').textContent = `Patterns: ${bullishPatterns}B/${bearishPatterns}S`;
            
            const previewSignal = document.getElementById('previewSignal');
            previewSignal.textContent = signal;
            previewSignal.className = `preview-signal ${signal.toLowerCase()}`;
            document.getElementById('previewConfidence').textContent = confidence + '% Confidence';
            
            if (confidence >= 90) {
                playAlert90();
            } else if (confidence >= 80) {
                playAlert80();
            }
        }
        
        // ==================== MARKET DATA SIMULATION ====================
        function updateMarketData() {
            const basePrice = 68234;
            const change = (Math.random() * 4 - 2).toFixed(2);
            const newPrice = basePrice + (basePrice * change / 100);
            const high = basePrice + Math.random() * 1000;
            const low = basePrice - Math.random() * 1000;
            const volume = (Math.random() * 5 + 10).toFixed(1);
            
            document.getElementById('previewPrice').textContent = '$' + newPrice.toFixed(0);
            document.getElementById('previewChange').textContent = (change > 0 ? '+' : '') + change + '%';
            document.getElementById('previewChange').className = change >= 0 ? 'preview-change positive' : 'preview-change negative';
            
            document.getElementById('high24h').textContent = '$' + high.toFixed(0);
            document.getElementById('low24h').textContent = '$' + low.toFixed(0);
            document.getElementById('volume24h').textContent = '$' + volume + 'B';
            document.getElementById('lastUpdate').textContent = DateTime.now().toFormat('HH:mm:ss');
        }
        
        // ==================== FAQ TOGGLE ====================
        function toggleFaq(element) {
            element.classList.toggle('active');
        }
        
        // ==================== NOTIFICATION ====================
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }
        
        // ==================== TIMEFRAME HANDLER ====================
        document.querySelectorAll('.timeframe-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                showNotification(`Switched to ${this.textContent} timeframe`, 'info');
                generateAISignal();
            });
        });
        
        // ==================== INITIALIZE ====================
        window.onload = function() {
            generateAISignal();
            updateMarketData();
            setInterval(generateAISignal, 10000);
            setInterval(updateMarketData, 5000);
        };
    </script>
