const searchInput = document.querySelector('.search-input')
let allProductNames = []
let productItems = []
const filterBtns = document.querySelectorAll('.filter-items button')
const productsSection = document.querySelector('.products-section')

//tworzenie elementów DOM dla produktów

document.addEventListener('DOMContentLoaded', () => {
	function showAllProducts(products) {
		products.forEach(product => {
			const productContainer = document.createElement('div')
			productContainer.classList.add('product-item')

			const productImage = document.createElement('img')
			productImage.src = product.image

			const productDescription = document.createElement('div')
			productDescription.classList.add('product-description')

			const productName = document.createElement('h2')
			productName.textContent = product.name
			productName.classList.add('product-name')

			const productPrice = document.createElement('p')
			productPrice.textContent = `Cena: ${product.price} zł`

			const productCategory = document.createElement('p')
			productCategory.textContent = `${product.category}`
			productCategory.classList.add('product-category')

			productContainer.appendChild(productImage)
			productContainer.appendChild(productDescription)
			productDescription.appendChild(productName)
			productDescription.appendChild(productPrice)
			productDescription.appendChild(productCategory)

			productsSection.appendChild(productContainer)
		})
		updateSelectors()
	}

	function updateSelectors() {
		allProductNames = document.querySelectorAll('.product-name')
		productItems = document.querySelectorAll('.product-item')
	}

	showAllProducts(plants)
})

//wyszukiwarka

const search = e => {
	const searchValue = e.target.value.toLowerCase()
	allProductNames.forEach(function (el, index) {
		if (searchValue === '') {
			productItems[index].style.display = ''
		} else if (el.textContent.toLowerCase().indexOf(searchValue) === -1) {
			productItems[index].style.display = 'none'
		}
	})
}
searchInput.addEventListener('keyup', search)

//filters

const filter = () => {
	filterBtns.forEach(button => {
		button.addEventListener('click', function () {
			const category = button.id
			filterBtns.forEach(btn => btn.classList.remove('active'))
			button.classList.add('active')
			productItems.forEach(item => {
				const categoryInfo = item.querySelector('.product-category').textContent.toLowerCase()
				if (category === 'all' || categoryInfo === category) {
					item.style.display = 'block'
				} else {
					item.style.display = 'none'
				}
			})
		})
	})
}

document.addEventListener('click', filter)
