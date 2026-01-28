const BASE_URL = "http://localhost:2011";

async function fetchContent() {
    try {
        // Mengambil data dari endpoint server (kamu perlu menambahkan app.get('/api/data') di server.js)
        const response = await fetch(`${BASE_URL}/api/get-data`); 
        const data = await response.json();

        // 1. Update Running Text (Ulang 5 kali)
        const marquee = document.getElementById('marquee-container');
        marquee.innerHTML = (data.runningText + " &nbsp;&nbsp;&bull;&nbsp;&nbsp; ").repeat(5);

        // 2. Update Hero Banner
        document.getElementById('hero-title').innerText = data.hero.title;
        document.getElementById('hero-desc').innerText = data.hero.description;
        document.getElementById('hero-section').style.backgroundImage = `url('${data.hero.imageUrl}')`;

        // 3. Update Pengurus
        const container = document.getElementById('pengurus-container');
        container.innerHTML = data.pengurus.map(p => `
            <div class="card-pengurus">
                <img src="${p.foto}" alt="${p.nama}">
                <h3>${p.nama}</h3>
                <p style="color:green; font-weight:bold">${p.jabatan}</p>
                <p style="font-style:italic; font-size:0.9rem">"${p.bio}"</p>
            </div>
        `).join('');

        // 4. Jalankan Rotasi Jadwal Sholat
        startPrayerRotation(data.jadwalSholat);

    } catch (err) {
        console.error("Gagal koneksi ke server:", err);
    }
}

function startPrayerRotation(jadwal) {
    let i = 0;
    const el = document.getElementById('prayer-display');
    
    setInterval(() => {
        el.classList.add('fade-out'); // Efek pudar keluar
        
        setTimeout(() => {
            el.innerText = `${jadwal[i].nama} : ${jadwal[i].jam}`;
            el.classList.remove('fade-out'); // Munculkan kembali
            i = (i + 1) % jadwal.length;
        }, 500);
    }, 4000);
}

window.onload = fetchContent;
