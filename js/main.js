document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.needs-validation');
  const galleryTriggers = document.querySelectorAll('.gallery-trigger');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalTitle = document.getElementById('galleryModalLabel');
  const galleryModalImage = document.getElementById('galleryModalImage');
  const galleryModalDescription = document.getElementById('galleryModalDescription');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      form.classList.add('was-validated');

      if (!form.checkValidity()) {
        return;
      }

      const status = form.querySelector('.form-status');
      const successMessage = form.dataset.successMessage || 'Formulario enviado correctamente.';

      if (status) {
        status.innerHTML = `<div class="alert alert-success">${successMessage}</div>`;
      }

      form.reset();
      form.classList.remove('was-validated');
    });
  });

  galleryTriggers.forEach((card) => {
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      card.click();
    });
  });

  if (galleryModal && galleryModalTitle && galleryModalImage && galleryModalDescription) {
    galleryModal.addEventListener('show.bs.modal', (event) => {
      const trigger = event.relatedTarget;
      const source = trigger ? trigger.closest('.gallery-trigger') : null;

      if (!source) {
        return;
      }

      galleryModalTitle.textContent = source.dataset.title || 'Caso clínico';
      galleryModalDescription.textContent = source.dataset.description || '';
      galleryModalImage.src = source.dataset.image || '';
      galleryModalImage.alt = source.dataset.alt || source.dataset.title || 'Imagen ampliada de la galería';
    });
  }
});
