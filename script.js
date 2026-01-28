const API_BASE = "http://localhost:2011";

async function init() {
    try {
        const res = await fetch(`${API_BASE}/api/get-data`);
        const data = await res.json();

        // 1. Fix Running Text (Ulang 5x)
        const marquee = document.getElementById('marquee-content');
        const text = `SELAMAT DATANG DI MASJID JAMI BAITURRAHMAN &nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp; `;
        marquee.innerHTML = text.repeat(5);

        // 2. Hero Update
        document.getElementById('hero-title').innerText = data.hero.title;
        document.getElementById('hero-desc').innerText = data.hero.description;
        document.getElementById('hero-bg').style.backgroundImage = `url('${data.hero.imageUrl}')`;

        // 3. Pengurus Update
        const list = document.getElementById('pengurus-list');
        list.innerHTML = data.pengurus.map(p => `
            <div class="card-user">
                <img src="${p.foto}" alt="foto">
                <h3>${p.nama}</h3>
                <p style="color: #228b22; font-weight: bold; margin: 5px 0;">${p.jabatan}</p>
                <div style="color: #ffd700; margin-bottom: 15px;">★★★★★</div>
                <p style="font-size: 0.9rem; color: #666; font-style: italic;">"${p.bio}"</p>
            </div>
        `).join('');

        // 4. Prayer Rotation
        startRotation(data.jadwalSholat);

    } catch (e) {
        console.error("Gagal ambil data server:", e);
    }
}

function startRotation(jadwal) {
    let idx = 0;
    const el = document.getElementById('prayer-display');
    
    function change() {
        el.classList.add('fade-out');
        setTimeout(() => {
            el.innerText = `${jadwal[idx].nama} : ${jadwal[idx].jam}`;
            el.classList.remove('fade-out');
            idx = (idx + 1) % jadwal.length;
        }, 600);
    }
    
    setInterval(change, 4000);
    change();
}

init();
