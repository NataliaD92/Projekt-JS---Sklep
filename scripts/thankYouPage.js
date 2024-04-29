// Przycisk powrotu

const $productPageBtn = document.getElementById('go-to-product-page')

$productPageBtn.addEventListener('click', () => {
	window.location.href = 'productPage.html'
})

// Pobieranie zmiennych

const $selectedPlantId = localStorage.getItem('selectedPlantId')
const $selectedPlant = plants.find(plant => plant.id === Number($selectedPlantId))
const $finalSummary = document.querySelector('.summary')
const totalPrice = localStorage.getItem('totalPrice')
const paymentMethod = localStorage.getItem('paymentMethod')

// Wyświetlenie informacji

function showSelectedPlant() {
	const $productContainer = document.createElement('div')

	const $thanks = document.createElement('h2')
	$thanks.classList.add('plant-name')
	$thanks.textContent = `Dziękujemy za zakup ${$selectedPlant.name}`

	const $productImage = document.createElement('img')
	$productImage.src = $selectedPlant.image

	const $paymentMethod = document.createElement('p')
	// $paymentMethod.textContent = `Wybrany sposób płatności to: ${paymentMethod}`
	$paymentMethod.innerHTML = `Wybrany sposób płatności to: <span class="payment-method">${paymentMethod}</span>`;

	const $productPrice = document.createElement('p')
	// $productPrice.textContent = `Cena za cały zakup to: ${totalPrice} zł`
	$productPrice.innerHTML = `Cena za cały zakup to: <span class="total-price">${totalPrice} zł</span>`;

	$productContainer.appendChild($thanks)
	$productContainer.appendChild($productImage)
	$productContainer.appendChild($paymentMethod)
	$productContainer.appendChild($productPrice)

	$finalSummary.appendChild($productContainer)
}

showSelectedPlant()
