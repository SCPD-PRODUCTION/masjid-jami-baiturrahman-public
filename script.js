async function loadData() {
    try {
        const res = await fetch('data.json?t=' + Date.now());
        const data = await res.json();

        // Update Hero
        document.getElementById('p-title').innerText = data.hero.title;
        document.getElementById('p-year').innerText = data.hero.year;
        document.getElementById('p-img').src = data.hero.image;

        // Update WhatsApp Link
        const waBtn = document.getElementById('wa-float');
        if (data.contact && data.contact.whatsapp) {
            // Format link: https://wa.me/6285810652185
            waBtn.href = `https://wa.me/62${data.contact.whatsapp}`;
        }

        // Update Programs
        const list = document.getElementById('program-list');
        list.innerHTML = '';
        data.programs.forEach(item => {
            list.innerHTML += `
                <div class="program-card">
                    <div class="icon">${item.icon}</div>
                    <p>${item.title}</p>
                </div>
            `;
        });
    } catch (e) { console.log("Gagal memuat data..."); }
}

loadData();
setInterval(loadData, 30000);