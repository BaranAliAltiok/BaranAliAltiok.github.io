let cart = [];

// HTML'deki ürün bilgileri ile eşleşen güncel ürün listesi
const products = [
    { id: 1, name: "Wraith W75 V2 Klavye", price: 3999 },
    { id: 2, name: "Hyperx Cloud II Core Kulaklık", price: 3999 },
    { id: 3, name: "Logitech G G502 HERO Mouse", price: 1650 }
];

const cartElement = document.getElementById('cart');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCounterElement = document.getElementById('cart-counter');

// Sepet panelini göster/gizle
function toggleCart() {
    cartElement.classList.toggle('hidden');
}

// Sepet ve Sayaç Güncelleyen Ana Fonksiyon
function updateCart() {
    let total = 0;
    let totalItems = 0;

    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = item.quantity * product.price;

        total += itemTotal;
        totalItems += item.quantity;
        
        // Dinamik liste öğesi oluşturma
        const listItem = document.createElement('li');
        // TL formatını kullanıyoruz
        listItem.innerHTML = `
            <div>
                <strong>${product.name}</strong>
                <p>${itemTotal.toLocaleString('tr-TR')} TL</p> 
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsElement.appendChild(listItem);
    });

    // Toplam tutarı TL formatında göster
    cartTotalElement.textContent = total.toLocaleString('tr-TR');
    cartCounterElement.textContent = totalItems;
    
    // Sepet boşsa uyarı mesajı göster
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<li>Sepetinizde ürün bulunmamaktadır.</li>';
    }
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    // Sepet gizliyse aç
    if (cartElement.classList.contains('hidden')) {
        toggleCart();
    }

    updateCart();
}

// Adet artırma/azaltma fonksiyonu
function changeQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            // Adet 0 veya altına inerse ürünü sepetten çıkar
            cart.splice(itemIndex, 1);
        }
    }
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Sepetiniz boş. Lütfen önce ürün ekleyiniz.");
        return;
    }
    const total = document.getElementById('cart-total').textContent;
    alert(`Teşekkürler! Toplam ${total} TL'lik siparişiniz alınmıştır. Bu bir simülasyon girişimidir.`);
    cart = []; 
    updateCart();
    toggleCart(); // Ödeme sonrası sepeti kapat
}

document.addEventListener('DOMContentLoaded', updateCart);