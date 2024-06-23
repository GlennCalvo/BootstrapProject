let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let checkoutBtn = document.querySelector('.checkout');
let discountRadios = document.querySelectorAll('input[name="discount"]');
let cashReceivedInput = document.getElementById('cashReceived');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Round Neck Shirt',
        image: '1.jpg',
        price: 1200
    },
    {
        id: 2,
        name: 'VNeck Shirt',
        image: '2.jpg',
        price: 1200
    },
    {
        id: 3,
        name: 'Tank Top',
        image: '3.jpg',
        price: 1000
    },
    {
        id: 4,
        name: 'Black Long Sleeve',
        image: '4.jpg',
        price: 1400
    },
    {
        id: 5,
        name: 'Varsity Jacket',
        image: '5.jpg',
        price: 3200
    },
    {
        id: 6,
        name: 'Casual Wool Jacket',
        image: '6.PNG',
        price: 3000
    },
    {
        id: 7,
        name: 'Leather Jacket',
        image: '7.PNG',
        price: 5000
    },
    {
        id: 8,
        name: 'Round Neck Varsity Jacket',
        image: '8.PNG',
        price: 4000
    },
    {
        id: 9,
        name: 'University Cargo Pants',
        image: '9.PNG',
        price: 2200
    },
    {
        id: 10,
        name: 'Denim Pants',
        image: '10.jpg',
        price: 1200
    },
    {
        id: 11,
        name: 'Trouser',
        image: '11.jpg',
        price: 1200
    },
    {
        id: 12,
        name: 'Burberry Hero',
        image: '12.png',
        price: 6000
    },
    {
        id: 13,
        name: 'Bvlgari Aqua',
        image: '13.jpg',
        price: 5500
    },
    
    {
        id: 14,
        name: 'Drakkar Noir',
        image: '14.jpg',
        price: 5800
    },
    {
        id: 15,
        name: 'Verscae Eros',
        image: '15.jpg',
        price: 6500
    },
    {
        id: 16,
        name: 'Silver Janus NEcklace',
        image: '16.png',
        price: 6800
    },
    {
        id: 17,
        name: 'Casio Deluxe V1',
        image: '17.png',
        price: 10000
    },
    {
        id: 18,
        name: 'Emerald Ring (Pair)',
        image: '18.png',
        price: 1500
    },
    {
        id: 19,
        name: 'Casio Valhenstein',
        image: '19.png',
        price: 10000
    },
    {
        id: 20,
        name: 'Striped Round Neck Shirt',
        image: '20.jpg',
        price: 1200
    },
];
let listCards  = [];
let discount = 0;

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();

function addToCard(key){
    if(listCards[key] == null){
     
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        if(value != null){
            totalPrice += value.price ;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.price}</div>
                <div>${( value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    let discountedPrice = totalPrice * (1 - discount);
    total.innerText = discountedPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function applyDiscount(discountPercentage){
    discount = discountPercentage;
    reloadCard();
}

function enableDiscount(){
    discountRadios.forEach(radio => {
        radio.disabled = false;
        radio.addEventListener('click', function() {
            applyDiscount(parseFloat(this.value));
        });
    });
}

function confirmCheckout() {
    if (Object.keys(listCards).length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }
    let confirmation = confirm("Are you sure you want to proceed to checkout?");
    if (confirmation) {
        let cashReceived = parseFloat(cashReceivedInput.value);
        if (isNaN(cashReceived) || cashReceived <= 0) {
            alert("Please enter a valid amount of cash received.");
            return;
        }

        let totalAmount = 0;
        listCards.forEach((value) => {
            if (value != null) {
                totalAmount += value.price * value.quantity;
            }
        });
        let discountedPrice = totalAmount * (1 - discount);

        if (cashReceived < discountedPrice) {
            alert("Insufficient cash received.");
            return;
        }

        let change = cashReceived - discountedPrice;
        alert(`Thank you for your purchase! Your change is ${change.toLocaleString()}.`);
        
        listCards = [];
        reloadCard();
    }
}

checkoutBtn.addEventListener('click', confirmCheckout);
enableDiscount();

