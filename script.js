/**
 * Archita Saxena Studio Portfolio Scripts
 * Interactive Fiber Optics Canvas, Direct Transmission Dispatcher & Audio Visuals
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. FIBER OPTICS SIMULATION (Matching the Pinterest glowing amber/gold neural core)
  const canvas = document.getElementById('fiberCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight || 320;

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 320;
    });

    // Generate fiber strands curving outward
    const strandsCount = 38;
    const strands = [];

    for (let i = 0; i < strandsCount; i++) {
      const angle = (Math.PI / 2) + ((Math.random() - 0.5) * 0.95);
      const length = 120 + Math.random() * 110;
      const curve = (Math.random() - 0.5) * 80;
      const speed = 0.008 + Math.random() * 0.012;
      const tipRadius = 2.5 + Math.random() * 4.5;
      const brightness = 0.5 + Math.random() * 0.5;

      strands.push({
        angle,
        length,
        curve,
        speed,
        phase: Math.random() * Math.PI * 2,
        tipRadius,
        brightness
      });
    }

    // Floating particles/embers around the fibers
    const particles = Array.from({ length: 24 }, () => ({
      x: (Math.random() - 0.5) * 260,
      y: (Math.random() - 0.5) * 160 + 40,
      radius: 1 + Math.random() * 2.5,
      alpha: Math.random(),
      speedY: -0.2 - Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 0.3
    }));

    let animTime = 0;

    function renderFibers() {
      animTime += 0.02;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = 50; // top root origin

      // Draw central base bundle
      const baseGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY + 30, 90);
      baseGrad.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
      baseGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = baseGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY + 20, 90, 0, Math.PI * 2);
      ctx.fill();

      // Render each fiber strand
      strands.forEach((s) => {
        const dynamicPhase = Math.sin(animTime * s.speed * 80 + s.phase);
        const curCurve = s.curve + dynamicPhase * 12;

        const endX = centerX + Math.cos(s.angle) * s.length + curCurve * 0.6;
        const endY = centerY + Math.sin(s.angle) * s.length;

        const cpX = centerX + (Math.cos(s.angle) * s.length * 0.4) + curCurve;
        const cpY = centerY + (Math.sin(s.angle) * s.length * 0.5);

        // Strand line
        ctx.beginPath();
        ctx.moveTo(centerX + (s.angle - Math.PI / 2) * 20, centerY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.strokeStyle = `rgba(180, 140, 60, ${0.15 * s.brightness})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Core glow layer
        ctx.beginPath();
        ctx.moveTo(centerX + (s.angle - Math.PI / 2) * 20, centerY + 30);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.45 * s.brightness})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Fiber luminous tip (bulb / fiber optic emission)
        const tipGlow = ctx.createRadialGradient(endX, endY, 0, endX, endY, s.tipRadius * 3.5);
        tipGlow.addColorStop(0, `rgba(255, 255, 230, ${0.95 * s.brightness})`);
        tipGlow.addColorStop(0.35, `rgba(245, 158, 11, ${0.85 * s.brightness})`);
        tipGlow.addColorStop(0.7, `rgba(217, 119, 6, ${0.35 * s.brightness})`);
        tipGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = tipGlow;
        ctx.beginPath();
        ctx.arc(endX, endY, s.tipRadius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Hot center point
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(endX, endY, s.tipRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating golden embers
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.drift;
        p.alpha += (Math.random() - 0.5) * 0.05;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > 0.9) p.alpha = 0.9;

        if (p.y < -40) {
          p.y = height - 100 + Math.random() * 50;
          p.x = (Math.random() - 0.5) * 200;
        }

        const px = centerX + p.x;
        const py = centerY + p.y;

        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(renderFibers);
    }

    renderFibers();
  }

  // 2. DIRECT TRANSMISSION / TEXT ME FORM DISPATCHER
  const directForm = document.getElementById('directTextForm');
  const statusMsg = document.getElementById('formStatusMsg');
  const submitBtn = document.getElementById('submitBtn');

  if (directForm) {
    directForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('messageSubject').value.trim();
      const message = document.getElementById('messageBody').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      // Format mailto link to immediately deliver to Archita's email
      const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
      const encodedBody = encodeURIComponent(
        `Hi Archita,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}\nSent via Archita.ai Portfolio`
      );

      const mailtoLink = `mailto:architaa145@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      // User feedback
      showStatus('✓ Preparing message... Launching your default email client!', 'success');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        window.location.href = mailtoLink;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        directForm.reset();
        showStatus('✓ Message window opened! Send it away or email directly to architaa145@gmail.com.', 'success');
      }, 700);
    });
  }

  function showStatus(text, type) {
    if (!statusMsg) return;
    statusMsg.innerText = text;
    statusMsg.className = `status-msg ${type}`;
    setTimeout(() => {
      if (type === 'error') {
        statusMsg.innerText = '';
        statusMsg.className = 'status-msg';
      }
    }, 5000);
  }

  // 3. INTERACTIVE MUSIC ITEMS (Toggle sound wave animation)
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => {
    item.addEventListener('click', () => {
      const soundWave = item.querySelector('.sound-wave');
      if (soundWave) {
        const isRunning = soundWave.style.opacity !== '0.2';
        soundWave.style.opacity = isRunning ? '0.2' : '1';
      }
    });
  });

  // 4. SHARE PROFILE BUTTON
  const shareBtn = document.getElementById('shareProfileBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Archita Saxena — Applied AI & Full-Stack Engineer',
        text: 'Check out the portfolio of Archita Saxena (Autometa, PaperLens, RAG Systems & 350+ LeetCode problems).',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          copyCurrentURL();
        }
      } else {
        copyCurrentURL();
      }
    });
  }

  function copyCurrentURL() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Portfolio link copied to clipboard!');
    }).catch(() => {
      alert('URL: ' + window.location.href);
    });
  }

  // 5. ACTIVE NAVIGATION OBSERVER
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.h-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 250;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

});
