import { createClient } from "./clientsApi.js";
import { createClientsForm } from "./createModalForm.js";
import { createClientItem } from "./createClientItem.js";

export const addClientModal = () => {
  const createForm = createClientsForm();
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');

  modal.classList.add('modal', 'site-modal', 'modal-active');
  modalContent.classList.add('modal__content', 'site-modal__content', 'modal-active');
  createForm.form.classList.add('add-client');

  modal.append(modalContent);
  modalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);

  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (contactValues[i].value !== "") {
        contacts.push({
          type: contactTypes[i].innerHTML,
          value: contactValues[i].value
        });
      }
    }

    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastName.value;
    clientObj.clientBirthDate = createForm.inputBirthDate.value;
    clientObj.contacts = contacts;

    document.getElementById('modal__btn-save').style = "background-image: url('../img/loadSave.svg'); background-repeat: 'no-repeat'";

    await createClient(clientObj).then((resultObj) => {
      document.querySelector('.clients__tbody').append(createClientItem(resultObj));
    });
    modal.remove();

  });


  createForm.modalClose.addEventListener('click', () => {
    modal.remove();
  });

  createForm.cancelBtn.addEventListener('click', (e) => {
    modal.remove();
  });

  document.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.remove();
    }
  });

  return modal;

}
