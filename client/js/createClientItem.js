import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { createContactItemByType, formatDate, formatTime } from "./utils.js";
import { createContactItem } from "./createContact.js";
import { editClientItem } from "./clientsApi.js";
import { deleteClientItem } from "./clientsApi.js";

export const createClientItem = (data) => {
  const clientTr = document.createElement('tr');
  const clientId = document.createElement('span');
  const clientFullName = document.createElement('td');
  const clientName = document.createElement('span');
  const clientSurname = document.createElement('span');
  const clientLastName = document.createElement('span');
  const clientBirthDate = document.createElement('td');
  const clientCreated = document.createElement('td');
  const createDate = document.createElement('span');
  const createdTime = document.createElement('span');
  const clientChanged = document.createElement('td');
  const changedDate = document.createElement('span');
  const changedTime = document.createElement('span');
  const clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  const clientEdit = document.createElement('button');
  const clientDelete = document.createElement('button');
  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data);

  clientTr.classList.add('clients__item');
  clientTr.id = data.id;
  clientId.classList.add('client__id');
  clientFullName.classList.add('clients__full-name');
  clientName.classList.add('clients__name');
  clientSurname.classList.add('clients__surname');
  clientLastName.classList.add('clients__lastname');
  clientBirthDate.classList.add('clients_birthDate')
  clientCreated.classList.add('clients__created');
  createDate.classList.add('created__date');
  createdTime.classList.add('created__time');
  clientChanged.classList.add('clients__changed');
  changedDate.classList.add('changed__date');
  changedTime.classList.add('changed__time');
  clientContacts.classList.add('clients__contacts');
  clientActions.classList.add('clients__actions');
  clientDelete.classList.add('clients__delete', 'btn-reset');
  clientEdit.classList.add('clients__edit', 'btn-reset');

  const main = document.getElementsByClassName('main');
  let dataLength;
  if (main[0].scrollWidth <= 1024) {
    dataLength = data.contacts.length;
  }

  clientContacts.addEventListener('click', () => {
    const plusBtn = document.getElementById('plus__btn');
    if (plusBtn !== null) {
      clientContacts.innerHTML = '';
      for (const contact of data.contacts) {
        createContactItemByType(contact.type, contact.value, clientContacts, undefined, undefined);
      }
    }
  });

  if (data.contacts !== undefined) {
    for (const contact of data.contacts) {
      let index;
      index = data.contacts.findIndex(el => el.value === contact.value);
      createContactItemByType(contact.type, contact.value, clientContacts, dataLength, index);
    }
  }

  const deleteById = () => {
    import('./clientsApi.js').then(({ deleteClientItem }) => {
      deleteClient.deleteModalDelete.addEventListener('click', () => {
        let deletedElement = document.getElementById(data.id);
        if (deletedElement !== null) {
          deleteClientItem(data.id);
          deletedElement.remove();
          deleteClient.deleteModal.remove();
        }
      });
    });
  }

  const editById = () => {

    const form = editClient.createForm;

    form.inputName.value = data.name;
    form.inputSurname.value = data.surname;

    if (data.lastName !== undefined) {
      form.inputLastName.value = data.lastName;
    }

    form.inputBirthDate.value = data.clientBirthDate;

    let contactsBlock = form.contactsBlock;

    const contactsItems = document.getElementsByClassName('contact');
    const addContactBtn = document.getElementsByClassName('modal__btn-contact');
    const modal = editClient.editModal;

    for (let contactElement of data.contacts) {

      if (contactsItems.length < 9) {
        const contactItem = createContactItem();
        contactItem.contactName.textContent = contactElement.type;
        contactItem.contactInput.value = contactElement.value;
        contactsBlock.prepend(contactItem.contact);
        contactsBlock.style.backgroundColor = 'var(--color-athens-gray)';
      } else {
        const contactItem = createContactItem();
        contactItem.contactName.textContent = contactElement.type;
        contactItem.contactInput.value = contactElement.value;
        contactsBlock.prepend(contactItem.contact);
        addContactBtn.classList.remove('modal__btn-contact--active');
      }

      if (contactsItems.length >= 5) {
        contactsBlock.style.top = '70%';
      } else {
        contactsBlock.style.top = '50%';
      }
    }

    form.modalClose.addEventListener('click', () => {
      modal.remove();
    });

    form.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const contactTypes = document.querySelectorAll('.contact__name');
      const contactValues = document.querySelectorAll('.contact__input');
      let contacts = [];
      let clientObj = {};

      for (let i = 0; i < contactTypes.length; i++) {
        if (contactValues[i].value !== '') {
          contacts.push({
            type: contactTypes[i].innerHTML,
            value: contactValues[i].value
          });
        }
      }

      clientObj.name = form.inputName.value;
      clientObj.surname = form.inputSurname.value;
      clientObj.lastName = form.inputLastName.value;
      clientObj.contacts = contacts;
      clientObj.id = data.id;
      clientObj.createdAt = data.createdAt;
      clientObj.updatedAt = data.updatedAt;
      clientObj.clientBirthDate = data.clientBirthDate;

      data.name = form.inputName.value;
      data.surname = form.inputSurname.value;
      data.lastName = form.inputLastName.value;
      data.clientBirthDate = form.inputBirthDate.value;
      data.contacts = contacts;

      await editClientItem(data.id, clientObj).then(() => {

        let deletedElement = document.getElementById(data.id);
        if (deletedElement !== null) {
          deletedElement.remove();
        }
        const table = document.querySelector('.clients__tbody');
        table.append(createClientItem(clientObj));

        modal.remove();
      });
    });

    form.cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      deleteById();
      document.body.append(deleteClient.deleteModal);
      modal.remove();
    });

    document.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.remove();
      }
    });
  };

  clientEdit.addEventListener('click', () => {
    clientEdit.style = "background-image: url('../img/load.svg')";
    editById();
    document.body.append(editClient.editModal);
  });

  clientDelete.addEventListener('click', (e) => {
    e.preventDefault();
    clientDelete.style = "background-image: url('../img/loadDel.svg')";
    deleteById();
    document.body.append(deleteClient.deleteModal);
    modal.remove();
  });

  if (Object.prototype.hasOwnProperty.call(data, 'id')) {
    clientId.textContent = data.id.substr(0, 8);
  }
  clientName.textContent = data.name;
  clientSurname.textContent = data.surname;
  clientLastName.textContent = data.lastName;
  clientEdit.textContent = 'Изменить';
  clientDelete.textContent = 'Удалить';
  createDate.textContent = formatDate(data.createdAt);
  createdTime.textContent = formatTime(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  changedTime.textContent = formatTime(data.updatedAt);
  clientBirthDate.textContent = formatTime(data.clientBirthDate);

  clientFullName.append(clientName, clientSurname, clientLastName);
  clientCreated.append(createDate, createdTime);
  clientChanged.append(changedDate, changedTime);
  clientActions.append(clientEdit, clientDelete);
  clientTr.append(
    clientId,
    clientFullName,
    clientCreated,
    clientChanged,
    clientContacts,
    clientActions
  );

  return clientTr;
}
