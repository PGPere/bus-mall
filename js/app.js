'use strict'

// Global variables:
const myContainer = document.querySelector('section');
const myButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
const results = document.querySelector('ul');

let allProducts = [];
let clicks = 0;
let noRepeats = [0,0,0]
let deDupe = []
const clicksAllowed = 20;

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.likes = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product('sweep','png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct() {
  let Product1 = selectRandomProduct();
  let Product2 = selectRandomProduct();
  let Product3 = selectRandomProduct();
  let noRepeats = [Product1,Product2,Product3]
  let deDupe = new Set(noRepeats);

  while (noRepeats.length != deDupe.size) {
      Product1 = selectRandomProduct();
      Product2 = selectRandomProduct();
      Product3 = selectRandomProduct(); 
      noRepeats = [Product1,Product2,Product3]
      deDupe = new Set(noRepeats);
  }

    image1.src = allProducts[Product1].src;
    image1.alt = allProducts[Product1].name;
    allProducts[Product1].views++;
    image2.src = allProducts[Product2].src;
    image2.alt = allProducts[Product2].name;
    allProducts[Product2].views++;   
    image3.src = allProducts[Product3].src;
    image3.alt = allProducts[Product3].name;
    allProducts[Product3].views++;
}


function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  // array method .includes()
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].likes++;
      break;
    }
  }
  renderProduct();
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    myButton.addEventListener('click', handleButtonClick);
    myButton.className = 'clicks-allowed';
  }
}

function handleButtonClick() {
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li')
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} view and was clicked ${allProducts[i].likes} times.`;
    results.appendChild(li);
  };
}

renderProduct();

myContainer.addEventListener('click', handleProductClick);