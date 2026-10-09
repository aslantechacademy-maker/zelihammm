/**
 * ==========================================================
 * ÖMER & ZELİHA - ÖZEL SÜRPRİZ WEB SİTESİ
 * İnteraktif Mantık, Ses Motoru, Parçacıklar ve Galeri
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ======================================================
       0. FOTOĞRAF VERİLERİ (BAŞLIKLAR VE ANILAR)
       ====================================================== */
    const photosData = [
        {
            src: 'photos/04_wedding.jpg',
            title: "Hayatımın En Güzel 'Evet'i Olacak",
            desc: "Sabırsızlıkla bekliyorum o günü aşkım... Birlikte bir ömre 'Evet' diyeceğimiz o an benim bu hayattaki en büyük hayalim."
        },
        {
            src: 'photos/02_night_sea.jpg',
            title: "Denizin Huzuru, Gözlerinin Işığı",
            desc: "Karanlıkta bile dünyamı aydınlatan güzelliğin... Seninle denizi dinlemek bütün dünyaya bedel sevgilim."
        },
        {
            src: 'photos/06_birthday.jpg',
            title: "Tuttuğun Her Dilek Olmak...",
            desc: "İyi ki doğdun sevgilim, iyi ki hayatıma geldin. Birlikte üfleyeceğimiz daha nice mutlu yaşlarımız olsun hatunum."
        },
        {
            src: 'photos/08_vintage_retro.jpg',
            title: "Hangi Çağda Olsak Yine Biz",
            desc: "Zaman ve devirler değişse de, birbirimize olan bu aşkımız hiçbir zaman eskimeyecek aşkım."
        },
        {
            src: 'photos/03_lake_boat.jpg',
            title: "Zamanın Durduğu O Huzur",
            desc: "Doğanın ortasında, sadece seninle baş başa... Senin sesin bana en güzel melodi hatunum."
        },
        {
            src: 'photos/09_golden_hour.jpg',
            title: "Yüzüne Vuran O Sıcak Güneş",
            desc: "Gözlerindeki sıcaklık içimi ısıtmaya yeter aşkım. Dünyanın en güzel manzarası senin yüzün."
        },
        {
            src: 'photos/01_car_smile.jpg',
            title: "Sen Yanımdayken Her Yol Cennet",
            desc: "Radyodaki şarkılar, senin o eşsiz gülüşün... Seninle saatlerce kaybolmak bile güzel sevgilim."
        },
        {
            src: 'photos/10_black_white.jpg',
            title: "Renklere İhtiyaç Duymayan Sevdamız",
            desc: "Çünkü hayatıma kattığın tüm renkler kalbimde saklı aşkım."
        },
        {
            src: 'photos/07_summer_night.jpg',
            title: "En Güvenli Sığınağım",
            desc: "Dünyanın bütün gürültüsünden uzak, sadece senin yanında huzur buluyorum sevgilim."
        },
        {
            src: 'photos/05_road_trip.jpg',
            title: "Birlikte Güldüğümüz Her An",
            desc: "Gideceğimiz yer değil, seninle yan yana gitmekti beni her daim mutlu eden hatunum..."
        }
    ];

    /* ======================================================
       1. İLİŞKİ SAYACI (LIVE LOVE COUNTER)
       Tarih: 19 Temmuz (Yıl, Ay-1, Gün, Saat, Dakika)
       ====================================================== */
    const relationshipStartDate = new Date(2026, 6, 19, 0, 0, 0); // 19 Temmuz 2026

    function updateCounter() {
        const now = new Date();
        const diff = now - relationshipStartDate;

        if (diff < 0) return;

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const elDays = document.getElementById('count-days');
        const elHours = document.getElementById('count-hours');
        const elMins = document.getElementById('count-minutes');
        const elSecs = document.getElementById('count-seconds');

        if (elDays) elDays.textContent = days;
        if (elHours) elHours.textContent = String(hours).padStart(2, '0');
        if (elMins) elMins.textContent = String(minutes).padStart(2, '0');
        if (elSecs) elSecs.textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCounter, 1000);
    updateCounter();


    /* ======================================================
       2. SES MOTORU (ROMANTİK PİYANO VE MP3 DESTEĞİ)
       Klasörde music.mp3 varsa çalar; yoksa Web Audio API ile
       büyüleyici, dingin bir romantik piyano melodisi üretir!
       ====================================================== */
    const audioPlayer = document.getElementById('audio-player');
    const vinylDisc = document.getElementById('vinyl-disc');
    const musicStatus = document.getElementById('music-status');
    const iconPlaying = document.getElementById('music-icon-playing');
    const iconMuted = document.getElementById('music-icon-muted');
    const musicToggleBtn = document.getElementById('music-toggle');
    const musicPill = document.getElementById('music-pill');

    let isAudioPlaying = false;
    let audioCtx = null;
    let synthInterval = null;
    let isSynthRunning = false;

    // Web Audio Romantik Piyano Sentetik Akorları (Arpej)
    function startAmbientSynth() {
        if (isSynthRunning) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            audioCtx = new AudioContext();

            // Romantik akor arpejleri (Cmaj9, Am9, Fmaj7, Gsus4)
            const chords = [
                [261.63, 329.63, 392.00, 493.88], // Cmaj7
                [220.00, 261.63, 329.63, 392.00], // Am7
                [174.61, 261.63, 329.63, 349.23], // Fmaj7
                [196.00, 246.94, 293.66, 392.00]  // G6
            ];

            let chordIdx = 0;
            let noteIdx = 0;

            function playNote(freq) {
                if (!audioCtx || audioCtx.state === 'suspended') return;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

                // Sıcak yumuşak filtre
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800, audioCtx.currentTime);

                gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.09, audioCtx.currentTime + 0.15);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.8);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start();
                osc.stop(audioCtx.currentTime + 3.0);
            }

            synthInterval = setInterval(() => {
                if (!isAudioPlaying) return;
                const currentChord = chords[chordIdx];
                playNote(currentChord[noteIdx]);
                noteIdx++;
                if (noteIdx >= currentChord.length) {
                    noteIdx = 0;
                    chordIdx = (chordIdx + 1) % chords.length;
                }
            }, 650);

            isSynthRunning = true;
        } catch (e) {
            console.log("Ambient synth note error:", e);
        }
    }

    function playMusic() {
        isAudioPlaying = true;
        vinylDisc.classList.add('playing');
        iconPlaying.classList.remove('hidden');
        iconMuted.classList.add('hidden');
        musicStatus.textContent = 'Çalıyor...';

        // Öncelik music.mp3
        if (audioPlayer && audioPlayer.src && audioPlayer.canPlayType('audio/mpeg')) {
            audioPlayer.play().catch(() => {
                // MP3 yoksa veya engellendiyse ambiyans sentetik piyanoyu devreye sok
                startAmbientSynth();
                if (audioCtx && audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
            });
        } else {
            startAmbientSynth();
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        }
    }

    function pauseMusic() {
        isAudioPlaying = false;
        vinylDisc.classList.remove('playing');
        iconPlaying.classList.add('hidden');
        iconMuted.classList.remove('hidden');
        musicStatus.textContent = 'Duraklatıldı';

        if (audioPlayer) {
            audioPlayer.pause();
        }
        if (audioCtx && audioCtx.state === 'running') {
            audioCtx.suspend();
        }
    }

    function toggleMusic(e) {
        if (e) e.stopPropagation();
        if (isAudioPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    if (musicPill) musicPill.addEventListener('click', toggleMusic);
    if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleMusic);


    /* ======================================================
       3. GİRİŞ EKRANI (AÇILIŞ ZARFI VE MÜHÜR TIKLANMASI)
       ====================================================== */
    const introOverlay = document.getElementById('intro-overlay');
    const envelopeTrigger = document.getElementById('envelope-trigger');
    const openBtn = document.getElementById('open-btn');

    function unlockSurprise(e) {
        // Konfeti ve kalpler patlat
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        spawnHeartBurst(x, y, 40);

        // Müziği başlat (kullanıcı dokunmasıyla sorunsuz başlar)
        playMusic();

        // Zarfa açılma sınıfı ekle
        if (envelopeTrigger) {
            envelopeTrigger.style.transform = 'scale(1.15) rotate(3deg)';
        }

        setTimeout(() => {
            introOverlay.classList.add('unlocked');
        }, 600);
    }

    if (envelopeTrigger) envelopeTrigger.addEventListener('click', unlockSurprise);
    if (openBtn) openBtn.addEventListener('click', unlockSurprise);


    /* ======================================================
       4. PARÇACIK CANVAS (YILDIZLAR VE USULCA YÜZEN KALPLER)
       ====================================================== */
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 1;
            this.speedY = -(Math.random() * 0.4 + 0.15);
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.pulseSpeed = Math.random() * 0.02 + 0.008;
            this.isHeart = Math.random() > 0.75;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.005;

            if (this.y < -20) {
                this.y = height + 20;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0.1, Math.min(0.8, this.alpha));
            
            if (this.isHeart) {
                ctx.fillStyle = '#ff9aa2';
                ctx.font = `${this.size * 5}px serif`;
                ctx.fillText('❤', this.x, this.y);
            } else {
                ctx.fillStyle = '#fce4a6';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function renderParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            p.update();
            p.draw();
        }
        requestAnimationFrame(renderParticles);
    }
    renderParticles();


    /* ======================================================
       5. UÇAN KALP PATLAMASI (DOKUNULAN YERDEN KALPLER)
       ====================================================== */
    function spawnHeartBurst(x, y, count = 12) {
        const symbols = ['💖', '❤️', '💕', '✨', '🌸', '💘', '🥰'];
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            const tx = (Math.random() - 0.5) * 160;
            const rot = (Math.random() - 0.5) * 60;
            const size = Math.random() * 16 + 18;

            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${size}px`;
            heart.style.setProperty('--tx', `${tx}px`);
            heart.style.setProperty('--rot', `${rot}deg`);

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 2000);
        }
    }


    /* ======================================================
       6. TAM EKRAN LIGHTBOX (KUSURSUZ MOBİL GÖRÜNTÜLEME)
       ====================================================== */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentPhotoIndex = 0;

    function openLightbox(index) {
        currentPhotoIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const item = photosData[currentPhotoIndex];
        if (!item) return;

        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = item.src;
            lightboxTitle.textContent = item.title;
            lightboxDesc.textContent = item.desc;
            lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${photosData.length}`;
            lightboxImg.style.opacity = '1';
        }, 150);
    }

    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
        updateLightboxContent();
    }

    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
        updateLightboxContent();
    }

    // Kartlara tıklama
    document.querySelectorAll('.polaroid-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.getAttribute('data-idx') || '0', 10);
            openLightbox(idx);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextPhoto);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevPhoto);

    // Dışına tıklayınca kapatma
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Klavye tuşları
    window.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    });

    // Mobil Kaydırma (Swipe Touch Gesture)
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 45;
        if (touchEndX < touchStartX - threshold) {
            nextPhoto(); // Sola kaydırınca sonraki
        }
        if (touchEndX > touchStartX + threshold) {
            prevPhoto(); // Sağa kaydırınca önceki
        }
    }


    /* ======================================================
       7. SENİ NEDEN SEVİYORUM? KART TIKLAMA (DOKUNMA DESTEĞİ)
       ====================================================== */
    document.querySelectorAll('.reason-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            const rect = card.getBoundingClientRect();
            spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
        });
    });


    /* ======================================================
       8. İNTERAKTİF SEVGİ ÖLÇER / SÜRPRİZ BUTONU
       ====================================================== */
    const loveBurstBtn = document.getElementById('love-burst-btn');
    const loveClickCount = document.getElementById('love-click-count');
    const loveMessageBox = document.getElementById('love-message');

    let loveCount = 100;
    const loveMessages = [
        "Sonsuzluk bile sana olan sevgimi anlatmaya yetmez aşkım...",
        "Gülüşünle kalbimi her gün yeniden fethediyorsun hatunum!",
        "İyi ki benimlesin, iyi ki hayatımdasın bir tanem...",
        "Dünyanın en güzel gözlü kadınına tüm sevgim feda olsun!",
        "Ömer ❤️ Zeliha = Sonsuzluk x Sonsuzluk!",
        "Sen benim kabul olmuş en güzel duamsın sevgilim...",
        "Her nefesimde, her anımda daima sadece seninleyim hatunum!"
    ];

    if (loveBurstBtn) {
        loveBurstBtn.addEventListener('click', (e) => {
            loveCount += Math.floor(Math.random() * 50) + 50;
            if (loveCount > 1000) {
                loveClickCount.textContent = `∞ x ${loveCount}%`;
            } else {
                loveClickCount.textContent = `${loveCount}%`;
            }

            const rect = loveBurstBtn.getBoundingClientRect();
            const clickX = e.clientX || (rect.left + rect.width / 2);
            const clickY = e.clientY || (rect.top + rect.height / 2);
            spawnHeartBurst(clickX, clickY, 16);

            // Rastgele mesaj değişimi
            const randomMsg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            loveMessageBox.style.opacity = '0';
            setTimeout(() => {
                loveMessageBox.textContent = `"${randomMsg}"`;
                loveMessageBox.style.opacity = '1';
            }, 180);
        });
    }

});
