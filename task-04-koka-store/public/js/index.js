const categoriesList = document.querySelector('.categories__list');
const containerCards = document.querySelector('.card-container');

let categoriesJson = {};

fetchData(`${baseUrl}/categories`, (response) => {
  let categoriesHTML = `<li class="categories__item active" onclick="loadCategory()">All Products</li>`;

  response.forEach((cat, i) => {
    categoriesHTML += `
        <li class="categories__item" data-category='${cat.name}'>
          ${cat.name}
        </li>`;
  });

  categoriesList.innerHTML = categoriesHTML;

  const categoryItems = document.querySelectorAll('.categories__item');

  categoryItems.forEach((item) => {
    item.addEventListener('click', function () {
      categoryItems.forEach((el) => el.classList.remove('active'));

      this.classList.add('active');

      const category = this.dataset.category;
      loadCategory(category);
    });
  });
});

function loadCategory(category = null) {
  const url = category ? `${baseUrl}/category/${category}` : baseUrl;

  fetchData(url, (response) => {
    const products = response.products;
    let prodsHTML = '';

    products.forEach((p) => {
      prodsHTML += `
          <div class="card">
            <div class="card__header">
              <div class="card__picture">
                <div class="card__picture-overlay">&nbsp;</div>
                <img src="${p.thumbnail}" class="card__picture-img" />
              </div>
              <h3 class="heading-tertirary">
                <span>${p.title}</span>
              </h3>
            </div>

            <div class="card__details">
              <h4 class="card__sub-heading">${p.brand}</h4>
              <p class="card__text">
                ${p.description}
              </p>
            </div>

            <div class="card__footer">
              <p>
                <span class="card__footer-value">$${p.price}</span>
                <span class="card__footer-text">per item</span>
              </p>
              <p class="card__ratings">
                <span class="card__footer-value">${p.rating}</span>
                <span class="card__footer-text">rating</span>
              </p>
              <a href="/details.html?id=${p.id}" class="btn btn--green btn--smal gap">Details</a>
            </div>
          </div>`;
    });

    if (prodsHTML === '')
      prodsHTML =
        '<h2 class="no-products" style="color: red; text-align:center; margin-top: 50px;">No products yet</h2>';

    containerCards.innerHTML = prodsHTML;
  });
}

loadCategory();

const toggleBtn = document.querySelector('.categories-toggle');
const categories = document.querySelector('.categories');
const overlay = document.querySelector('.overlay');

toggleBtn.addEventListener('click', () => {
  categories.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  categories.classList.remove('active');
  overlay.classList.remove('active');
});
