// Pobieranie zmiennych

const $productsSection = document.querySelector('.products-section')
const $searchInput = document.querySelector('.search-input')
const $filterBtns = document.querySelectorAll('.filter-items button')
let $allProductNames = []
let $productItem = []

// Tworzenie elementów DOM dla wszystkich produktów

function updateData() {
	$allProductNames = document.querySelectorAll('.product-name')
	$productItem = document.querySelectorAll('.product-item')
}

function showAllProducts(plants) {
	plants.forEach(plant => {
		const $productItemContainer = document.createElement('div')
		$productItemContainer.classList.add('product-item')

		const $productImage = document.createElement('img')
		$productImage.src = plant.image

		const $productDescription = document.createElement('div')
		$productDescription.classList.add('product-description')

		const $productName = document.createElement('h2')
		$productName.textContent = plant.name
		$productName.classList.add('product-name')

		const $productPrice = document.createElement('p')
		$productPrice.textContent = `Cena: ${plant.price} zł`

		const $productCategory = document.createElement('p')
		$productCategory.textContent = `${plant.category}`
		$productCategory.classList.add('product-category')

		const $productId = document.createElement('p')
		$productId.textContent = `${plant.id}`
		$productId.classList.add('product-id')

		$productItemContainer.addEventListener('click', () => {
			localStorage.setItem('selectedPlantId', plant.id)
			window.location.href = 'productPage.html'
		})

		$productItemContainer.appendChild($productImage)
		$productItemContainer.appendChild($productDescription)
		$productDescription.appendChild($productName)
		$productDescription.appendChild($productPrice)
		$productDescription.appendChild($productCategory)
		$productDescription.appendChild($productId)

		$productsSection.appendChild($productItemContainer)
	})
	updateData()
}

showAllProducts(plants)

// Search-bar

const search = e => {
	const searchValue = e.target.value.toLowerCase()
	$allProductNames.forEach(function (product, index) {
		if (searchValue === '') {
			$productItem[index].style.display = 'block'
		} else if (product.textContent.toLowerCase().indexOf(searchValue) === -1) {
			$productItem[index].style.display = 'none'
		}
	})
}
$searchInput.addEventListener('keyup', search)

// Filters

const filter = () => {
	$filterBtns.forEach(button => {
		button.addEventListener('click', function () {
			const selectedCategory = button.id
			$filterBtns.forEach(btn => btn.classList.remove('active'))
			button.classList.add('active')
			$productItem.forEach(item => {
				const category = item.querySelector('.product-category').textContent
				if (selectedCategory === 'all' || category === selectedCategory) {
					item.style.display = 'block'
				} else {
					item.style.display = 'none'
				}
			})
		})
	})
}

$filterBtns.forEach(button => {
	button.addEventListener('click', filter)
})
