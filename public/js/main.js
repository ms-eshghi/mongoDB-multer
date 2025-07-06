   const form = document.getElementById('offerForm');
    const container = document.getElementById('offersContainer');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", form.title.value);
      formData.append("price", form.price.value);
      formData.append("description", form.description.value);
      formData.append("image", form.image.files[0]);

      await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      form.reset();
      loadOffers();
    });

    async function loadOffers() {
      const res = await fetch('http://localhost:3000/offers');
      const offers = await res.json();
      container.innerHTML = '';

      offers.forEach(offer => {
        const div = document.createElement('div');
        div.className = 'col s12 m6 l4 offerDiv';

        div.innerHTML = `
          <div class="card hoverable">
            <div class="card-image">
              ${offer.imagePath ? `<img src="${offer.imagePath}" class="responsive-img">` : ''}
              <span class="card-title">${offer.title}</span>
            </div>
            <div class="card-content">
              <p>${offer.description}</p>
              <p><strong>${offer.price} €</strong></p>
            </div>
          </div>
        `;

        container.appendChild(div);
      });
    }

    document.addEventListener('DOMContentLoaded', loadOffers);