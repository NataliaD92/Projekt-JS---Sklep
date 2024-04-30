// Przycisk powrotu

const $mainPageBtn = document.getElementById('go-to-mainPage')

$mainPageBtn.addEventListener('click', () => {
	window.location.href = 'index.html'
})

// Pobranie wybranego produktu z localStorage po id

const $selectedPlantId = localStorage.getItem('selectedPlantId')
const $selectedPlant = plants.find(plant => plant.id === Number($selectedPlantId))

// Pobieranie zmiennych

const $selectedPlantDescription = document.querySelector('.plant-about')
const $addedProducts = document.querySelector('.plant-additional-products')
const $summary = document.querySelector('.summary')

// Wyświetlenie po id odpowiedniej rośliny

function showSelectedPlant() {
	const $productContainer = document.createElement('div')
	$productContainer.classList.add('plant-container')

	const $productImage = document.createElement('img')
	$productImage.src = $selectedPlant.image

	const $productDescription = document.createElement('div')
	$productDescription.classList.add('plant-description')

	const $productName = document.createElement('h2')
	$productName.classList.add('plant-name')
	$productName.textContent = $selectedPlant.name

	const $productPrice = document.createElement('p')
	$productPrice.classList.add('price')
	$productPrice.textContent = `${$selectedPlant.price} zł`

	const $productDescriptionList = document.createElement('ul')
	$selectedPlant.description.forEach(description => {
		const $productDescriptionListItem = document.createElement('li')
		$productDescriptionListItem.innerHTML = `<i class="fa-regular fa-circle-check"></i>${description}`
		$productDescriptionList.appendChild($productDescriptionListItem)
	})

	$productContainer.appendChild($productImage)
	$productContainer.appendChild($productDescription)
	$productDescription.appendChild($productName)
	$productDescription.appendChild($productPrice)
	$productDescription.appendChild($productDescriptionList)

	$selectedPlantDescription.appendChild($productContainer)
}

showSelectedPlant()

// Checkboxy i podsumowanie ceny

let totalPrice = 0

function showAddedProducts() {
	const checkedProducts = $addedProducts.querySelectorAll('input[type="checkbox"]:checked')

	const showAddedProducts = $summary.querySelectorAll('.added-product')
	showAddedProducts.forEach(element => {
		element.remove()
	})

	let addedProductsPrice = 0

	checkedProducts.forEach(plant => {
		const label = document.querySelector(`label[for="${plant.id}"]`)
		const labelPrice = label.querySelector('.price')

		addedProductsPrice = addedProductsPrice + Number(labelPrice.textContent)
	})

	if (checkedProducts.length > 0) {
		totalPrice = addedProductsPrice + $selectedPlant.price
	} else {
		totalPrice = $selectedPlant.price
	}

	const showTotalPrice = document.createElement('p')
	showTotalPrice.classList.add('added-product')
	showTotalPrice.innerHTML = `Cena wszystkich kupowanych produktów: <span class="total-price">${totalPrice.toFixed(
		2
	)} zł</span>`

	console.log(totalPrice)

	$summary.appendChild(showTotalPrice)
	localStorage.setItem('totalPrice', totalPrice.toFixed(2))
}

showAddedProducts()

const checkboxes = $addedProducts.querySelectorAll('input[type="checkbox"]')

checkboxes.forEach(checkbox => {
	checkbox.addEventListener('click', showAddedProducts)
})

// Formularz i forma płatności

const $nameInput = document.getElementById('name')
const $addressInput = document.getElementById('address')
const $commentsInput = document.getElementById('comments')

function saveForm() {
	localStorage.setItem('name', $nameInput.value)
	localStorage.setItem('address', $addressInput.value)
	localStorage.setItem('comments', $commentsInput.value)
}

function loadForm() {
	$nameInput.value = localStorage.getItem('name')
	$addressInput.value = localStorage.getItem('address')
	$commentsInput.value = localStorage.getItem('comments')
}

document.addEventListener('DOMContentLoaded', loadForm)

$nameInput.addEventListener('input', saveForm)
$addressInput.addEventListener('input', saveForm)
$commentsInput.addEventListener('input', saveForm)

//Data odbioru

const deliveryDateSelect = document.getElementById('delivery-date')

const deliveryDate = new Date()
deliveryDate.setDate(deliveryDate.getDate() + 14)
const option = document.createElement('option')
option.value = formattedDate(deliveryDate)
option.textContent = formattedDate(deliveryDate)
deliveryDateSelect.appendChild(option)

function formattedDate(date) {
	const year = date.getFullYear()

	let month
	if (date.getMonth() + 1 < 10) {
		month = '0' + (date.getMonth() + 1)
	} else {
		month = date.getMonth() + 1
	}

	let day
	if (date.getDate() < 10) {
		day = '0' + date.getDate()
	} else {
		day = date.getDate()
	}
	return `${year}-${month}-${day}`
}

localStorage.setItem('deliveryDate', option.value)

// Forma płatności

const blikRadio = document.getElementById('blik')
const bankTransferRadio = document.getElementById('bank-transfer')

blikRadio.addEventListener('change', function () {
	if (blikRadio.checked) {
		localStorage.setItem('paymentMethod', 'BLIK')
	}
})

bankTransferRadio.addEventListener('change', function () {
	if (bankTransferRadio.checked) {
		localStorage.setItem('paymentMethod', 'Przelew bankowy')
	}
})

function loadPaymentMethod() {
	const paymentMethod = localStorage.getItem('paymentMethod')
	if (paymentMethod === 'BLIK') {
		blikRadio.checked = true
	} else if (paymentMethod === 'Przelew bankowy') {
		bankTransferRadio.checked = true
	}
}

document.addEventListener('DOMContentLoaded', loadPaymentMethod)

// Walidator

const submitBtn = document.getElementById('submit-button')
const validationInfo = document.querySelector('.validation-info')
submitBtn.addEventListener('click', () => {
	const nameInputSplit = $nameInput.value.split(' ')
	if (nameInputSplit.length !== 2) {
		const nameAlert = document.createElement('p')
		nameAlert.textContent = 'Wpisz poprawne imię i nazwisko'
		validationInfo.innerHTML = ''
		validationInfo.appendChild(nameAlert)
		return
	}

	if ($addressInput.value === '') {
		const addressAlert = document.createElement('p')
		addressAlert.textContent = 'Uzupełnij miejsce odbioru'
		validationInfo.innerHTML = ''
		validationInfo.appendChild(addressAlert)
		return
	}

	if (!blikRadio.checked && !bankTransferRadio.checked) {
		const paymentMethodAlert = document.createElement('p')
		paymentMethodAlert.textContent = 'Wybierz sposób płatności'
		validationInfo.innerHTML = ''
		validationInfo.appendChild(paymentMethodAlert)
		return
	}

	window.location.href = 'thankYouPage.html'
})
