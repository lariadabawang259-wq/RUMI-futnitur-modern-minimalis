// Fungsi untuk menambahkan produk ke keranjang belanja
function tambahKeranjang(namaProduk) {
  alert(namaProduk + " berhasil ditambahkan ke keranjang!");
}

// Efek bayangan pada header saat halaman di-scroll ke bawah
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.backgroundColor = 'rgba(249, 248, 246, 0.95)';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  } else {
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = 'none';
  }
});

// Fungsi Filter Katalog Produk
function filterProduk(kategori, btnElement) {
  // Ubah status tombol aktif
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  // Filter kartu produk
  const cards = document.querySelectorAll('.grid .card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (kategori === 'all' || cardCategory === kategori) {
      card.classList.remove('hide');
    } else {
      card.classList.add('hide');
    }
  });
}

// Fungsi Keranjang yang Sudah Ada
function tambahKeranjang(namaProduk) {
  alert(namaProduk + " berhasil ditambahkan ke keranjang!");
}

// Fungsi Penanganan Form Konsultasi
function kirimKonsultasi(event) {
  event.preventDefault(); // Mencegah reload halaman

  const nama = document.getElementById('nama').value;
  const tipeRuang = document.getElementById('tipe-ruang').value;

  // Notifikasi berhasil (dapat disesuaikan dengan integrasi WhatsApp atau Backend API)
  alert(`Terima kasih, ${nama}! Permintaan konsultasi untuk ${tipeRuang} telah diterima. Tim kami akan segera menghubungi Anda.`);

  // Reset formulir setelah dikirim
  event.target.reset();
}

let cart = [];

// Filtering Produk
function filterProduk(kategori, btn) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.grid .card');
  cards.forEach(card => {
    if (kategori === 'all' || card.getAttribute('data-category') === kategori) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Buka/Tutup Modal Keranjang
function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Tambah Produk ke Keranjang
function tambahKeranjang(namaProduk, harga, colorSelectId) {
  let warna = "Natural Teak";
  if (colorSelectId) {
    const colorElement = document.getElementById(colorSelectId);
    if (colorElement) warna = colorElement.value;
  }

  const existingItem = cart.find(item => item.nama === namaProduk && item.warna === warna);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      nama: namaProduk,
      harga: harga,
      warna: warna,
      qty: 1
    });
  }

  updateCartUI();
  alert(`${namaProduk} (${warna}) berhasil ditambahkan ke keranjang!`);
}

// Update Keranjang Visual
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const badgeCount = document.getElementById('badge-count');
  const totalPriceElem = document.getElementById('cart-total-price');

  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-msg">Keranjang Anda masih kosong.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.harga * item.qty;
      totalItems += item.qty;

      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <div>
            <h4>${item.nama}</h4>
            <small>Warna: ${item.warna}</small>
            <p>Rp ${item.harga.toLocaleString('id-ID')} x ${item.qty}</p>
          </div>
          <button onclick="hapusItem(${index})" class="btn-remove">Hapus</button>
        </div>
      `;
    });
  }

  cartCount.innerText = totalItems;
  badgeCount.innerText = totalItems;
  totalPriceElem.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Hapus Item
function hapusItem(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Checkout WhatsApp
function checkoutWA() {
  if (cart.length === 0) {
    alert("Keranjang Anda masih kosong!");
    return;
  }

  const noWA = "6281234567890";
  let pesan = "Halo RUMI, saya ingin memesan produk berikut:\n\n";
  let total = 0;

  cart.forEach((item, i) => {
    const subtotal = item.harga * item.qty;
    total += subtotal;
    pesan += `${i + 1}. ${item.nama} (${item.warna}) - Qty: ${item.qty} = Rp ${subtotal.toLocaleString('id-ID')}\n`;
  });

  pesan += `\n*Total Pembayaran: Rp ${total.toLocaleString('id-ID')}*`;
  pesan += "\n\nMohon informasi proses selanjutnya. Terima kasih!";

  window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`, '_blank');
}

// Form Konsultasi
function kirimKonsultasi(event) {
  event.preventDefault();
  const nama = document.getElementById('nama').value;
  alert(`Terima kasih ${nama}, pesan konsultasi Anda telah terkirim! Tim kami akan segera menghubungi Anda.`);
  event.target.reset();
}


