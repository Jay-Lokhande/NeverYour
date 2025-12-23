// ============================================
// NEVER YOUR - Product Page
// Dynamic product loading
// ============================================

// Product data
const products = {
    'essential-1': {
        category: 'ESSENTIALS',
        title: 'The Foundation',
        subtitle: 'Black Essential Tee',
        price: '3333',
        meaning: 'This is not clothing. This is a statement of ownership. When you wear this, you claim the philosophy. You own the silence. You become the foundation.',
        material: 'Premium black cotton. Minimal construction. Maximum presence.',
        why: 'Because ownership requires a vessel. Because philosophy needs form. Because you need to claim what is yours.',
        ownership: 'When you own this, you don\'t just own an object. You own an idea. You own a principle. You own a piece of the movement.',
        cta: 'Own This',
        visual: 'NY'
    },
    'essential-2': {
        category: 'ESSENTIALS',
        title: 'The Silence',
        subtitle: 'Black Minimal Hoodie',
        price: '5555',
        meaning: 'Warmth without words. Presence without noise. This is the embodiment of silent power.',
        material: 'Premium black cotton blend. Minimal design. Maximum comfort.',
        why: 'Because sometimes the most powerful statement is the one you don\'t make. Because silence speaks louder.',
        ownership: 'Own the silence. Own the presence. Own the power that comes from not needing to announce itself.',
        cta: 'Own This',
        visual: '—'
    },
    'vault-1': {
        category: 'THE VAULT',
        title: 'The Manifesto',
        subtitle: 'Digital Collection',
        price: '5555',
        meaning: 'Ten principles. One ownership. This is not a document. This is a declaration.',
        material: 'Digital format. PDF, EPUB, and audio versions included. Lifetime access.',
        why: 'Because ideas need to be owned, not borrowed. Because principles need to be claimed, not read.',
        ownership: 'When you own this, you own the principles. You own the philosophy. You own the foundation of Never Your.',
        cta: 'Claim Access',
        visual: 'M'
    },
    'vault-2': {
        category: 'THE VAULT',
        title: 'The Monologue',
        subtitle: 'Audio Collection',
        price: '3333',
        meaning: 'Thoughts spoken. Ownership claimed. This is not entertainment. This is philosophy in motion.',
        material: 'High-quality audio files. Multiple formats. Downloadable. Yours forever.',
        why: 'Because some ideas need to be heard, not read. Because ownership requires understanding.',
        ownership: 'Own the thoughts. Own the words. Own the philosophy as it was meant to be experienced.',
        cta: 'Claim Access',
        visual: '◉'
    },
    'artifact-1': {
        category: 'ARTIFACTS',
        title: 'The First',
        subtitle: 'Numbered Artifact',
        price: '11111',
        meaning: 'One hundred exist. One is yours. This is not a product. This is a piece of history.',
        material: 'Limited edition. Numbered. Certificate of authenticity included.',
        why: 'Because rarity creates value. Because ownership of the first is ownership of the origin.',
        ownership: 'When you own this, you own a piece of the beginning. You own a fragment of the origin. You own history.',
        cta: 'Enter the Vault',
        visual: '∞',
        number: '001/100'
    }
};

// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'essential-1';
}

// Load product data
function loadProduct() {
    const productId = getProductId();
    const product = products[productId];
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Update page elements
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productSubtitle').textContent = product.subtitle;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productMeaning').textContent = product.meaning;
    document.getElementById('productMaterial').textContent = product.material;
    document.getElementById('productWhy').textContent = product.why;
    document.getElementById('productOwnership').textContent = product.ownership;
    document.getElementById('productCTA').querySelector('.button-text').textContent = product.cta;
    
    // Update material title based on category
    const materialTitle = document.getElementById('materialTitle');
    if (product.category === 'THE VAULT') {
        materialTitle.textContent = 'Format';
    } else {
        materialTitle.textContent = 'Material';
    }
    
    // Update product image
    const productImage = document.getElementById('productImage');
    productImage.innerHTML = `
        <div class="product-image-content">
            <span class="product-category">${product.category}</span>
            ${product.number ? `<span class="product-number">${product.number}</span>` : ''}
            <div class="product-visual">${product.visual}</div>
        </div>
    `;
    
    // Fade in animation
    setTimeout(() => {
        document.querySelector('.product-page').style.opacity = '1';
    }, 100);
}

// Initialize on page load
window.addEventListener('load', () => {
    loadProduct();
});

// CTA Button interaction
const productCTA = document.getElementById('productCTA');
if (productCTA) {
    productCTA.addEventListener('click', () => {
        // Add your purchase/checkout logic here
        console.log('Purchase initiated');
        // Example: window.location.href = '/checkout?id=' + getProductId();
    });
}


