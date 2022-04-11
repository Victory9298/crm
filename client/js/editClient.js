import { createClientsForm } from "./createModalForm.js";

export const editClientModal = (data) => {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  const createForm = createClientsForm();

  editModal.classList.add('modal-edit', 'site-modal', 'modal-active');
  editModalContent.classList.add('edit-modal__content', 'site-modal__content', 'modal-active', 'modal__content');

  createForm.modalTitle.textContent = 'Изменить данные';
  createForm.cancelBtn.textContent = 'Удалить клиента';

  if (Object.prototype.hasOwnProperty.call(data, 'id')) {
    createForm.modalId.textContent = `ID: ${data.id.substr(0, 8)}`;
  }

  editModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.modalId, createForm.form);
  editModal.append(editModalContent);

  const editBtn = createForm.saveBtn;

  return {
    editModal,
    editModalContent,
    editBtn,
    createForm
  }
}
