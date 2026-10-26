let quantity = 0;
let pricePerUnit = 35.00;
let highestZIndex = 100;

function openModal(modalId, event) {
    const modal = document.getElementById(modalId);
    highestZIndex++;
    modal.style.zIndex = highestZIndex;
    modal.style.display = "block";

    if (event) {
        modal.style.top = (window.scrollY + 100) + "px";
        modal.style.left = (Math.random() * 200 + 250) + "px";
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function dragElement(elmnt, e) {
    e = e || window.event;
    e.preventDefault();

    highestZIndex++;
    let targetModal = elmnt.closest('.modal');
    targetModal.style.zIndex = highestZIndex;

    let pos3 = e.clientX;
    let pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        let pos1 = pos3 - e.clientX;
        let pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        targetModal.style.top = (targetModal.offsetTop - pos2) + "px";
        targetModal.style.left = (targetModal.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function changeQuantity(change) {
    quantity += change;
    if (quantity < 0) quantity = 0;

    let totalPrice = (quantity * pricePerUnit).toFixed(2);

    document.getElementById('product-quantity').innerText = quantity;
    document.getElementById('cart-total-units').innerText = quantity;
    document.getElementById('cart-count').innerText = quantity;
    document.getElementById('cart-total-price').innerText = totalPrice;
}

function checkoutWhatsApp() {
    if (quantity === 0) {
        alert("Por favor agrega al menos una porción de Ke-fresianos.");
        return;
    }
    let totalPrice = (quantity * pricePerUnit).toFixed(2);
    let message = `¡Hola! Me gustaría hacer un pedido de ${quantity} presentación(es) de Ke-fresianos. Total a pagar: $${totalPrice} MXN.`;
    let url = `https://wa.me/525550000000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}