function showSection(sectionId) {
    const sections = document.querySelectorAll('.categories');
    sections.forEach( section => {
        if(section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    })
}

// Function to fetch images from API
// Function to fetch product details from the API
async function fetchProductDetails() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();

        // Iterate over categories
        data.categories.forEach(category => {
            const categoryName = category.category_name;
            const categoryProducts = category.category_products;
            const categoryList = document.getElementById(`${categoryName.toLowerCase()}List`);

            // Iterate over products in each category
            categoryProducts.forEach(product => {
                const productId = product.id;
                const productTitle = product.title;
                const productPrice = product.price;
                const productComparePrice = product.compare_at_price;
                const productVendor = product.vendor;
                const productBadgeText = product.badge_text;
                const productImage = product.image;
                const productSecondImage = product.second_image;

                // Create list item element
                const listItem = document.createElement('li');

                // Create image element
                const img = document.createElement('img');
                img.src = productImage;
                img.alt = productTitle;

                // Create badge span element
                const badge = document.createElement('span');
                badge.classList.add('badge');
                badge.className = 'badge';
                badge.textContent = productBadgeText;

                // Create heading element
                const heading = document.createElement('h2');
                heading.textContent = productTitle;

                // Create paragraph element for vendor
                const vendorParagraph = document.createElement('p');
                vendorParagraph.classList.add('vendor');
                vendorParagraph.textContent = `. ${productVendor}`;

                // Create paragraph element for price
                const priceParagraph = document.createElement('p');
                priceParagraph.textContent = `Rs ${productPrice}`;
                if (productComparePrice) {
                    const del = document.createElement('del');
                    del.textContent = `Rs ${productComparePrice}`;
                    priceParagraph.appendChild(del);
                    const discount = document.createElement('span');
                    discount.textContent = `${Math.round(((productComparePrice - productPrice) / productComparePrice) * 100)}% Off`;
                    priceParagraph.appendChild(discount);
                }

                // Create button element
                const button = document.createElement('button');
                button.textContent = 'Add To Cart';

                // Append elements to the list item
                listItem.appendChild(img);
                listItem.appendChild(badge);
                listItem.appendChild(heading);
                listItem.appendChild(vendorParagraph);
                listItem.appendChild(priceParagraph);
                listItem.appendChild(button);

                // Append list item to the category list
                categoryList.appendChild(listItem);
            });
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

// Call the function to fetch and display product details when the page loads
fetchProductDetails();
