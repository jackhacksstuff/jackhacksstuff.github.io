document.addEventListener('DOMContentLoaded', function() {
    // Detect page type
    const isWriteup = document.querySelector('.wu-body') !== null;
    const isHomepage = document.querySelector('#hero') !== null;

    // Homepage rail navigation
    if (isHomepage) {
        const sections = ['hero', 'about', 'writeups', 'focus'];
        const railTicks = document.querySelectorAll('.rail-tick[data-section]');
        const railLabels = document.querySelectorAll('.rail-section-label[data-section]');

        function setActive(id) {
            railTicks.forEach(t => t.classList.toggle('active', t.dataset.section === id));
            railLabels.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { 
                if (e.isIntersecting) setActive(e.target.id); 
            });
        }, { threshold: 0.3 });

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
    }

    // Write-up rail navigation
    if (isWriteup) {
        const headings = document.querySelectorAll('.wu-body h2[id]');
        const ticks = document.querySelectorAll('.rail-tick[data-heading]');

        if (headings.length > 0 && ticks.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        ticks.forEach(t => t.classList.toggle('active', t.dataset.heading === id));
                    }
                });
            }, { rootMargin: '-30% 0px -60% 0px' });

            headings.forEach(h => observer.observe(h));

            // Click to scroll
            ticks.forEach(tick => {
                tick.addEventListener('click', () => {
                    const target = document.getElementById(tick.dataset.heading);
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        }
    }

    // Status dot pulse animation
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(() => {
            statusDot.style.opacity = statusDot.style.opacity === '0.3' ? '1' : '0.3';
        }, 1500);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Console easter egg (because why not)
    console.log('%c🔐 JackHacksStuff', 'font-size: 20px; font-weight: bold; color: #00ff41;');
    console.log('%cPenetration Testing Portfolio', 'font-size: 14px; color: #888;');
    console.log('%c👀 Looking for something? Check the source!', 'font-size: 12px; color: #666;');
});