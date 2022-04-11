import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";

export const filterField = async (field, direction) => {

  const clients = await getClients();

  function byField(field, direction) {
    if (direction === 'up') {
      return (a, b) => a[field] < b[field] ? 1 : -1;
    }
    else {
      return (a, b) => a[field] > b[field] ? 1 : -1;
    }
  }

  clients.sort(byField(field, direction));

  let table = document.querySelector('.clients__tbody');
  table.innerHTML = '';

  for (const client of clients) {
    table.append(createClientItem(client));
  }

  const fieldSurname = document.getElementById('display-info__item--name');

  if (field === 'surname' && direction === 'up') {
    fieldSurname.classList.remove('sort-up');
    fieldSurname.classList.add('sort-down');
  }
  if (field === 'surname' && direction === 'down') {
    fieldSurname.classList.remove('sort-down');
    fieldSurname.classList.add('sort-up');
  }


  if (field === 'createdAt') {
    const fieldCreatedAt = document.getElementById('display-info__item--create');
  if (direction === 'up') {
    fieldCreatedAt.classList.remove('sort-up');
    fieldCreatedAt.classList.add('sort-down');
  }
  if (direction === 'down') {
    fieldCreatedAt.classList.remove('sort-down');
    fieldCreatedAt.classList.add('sort-up');
  }
}

  if (field === 'updatedAt') {
  const fieldEditeddAt = document.getElementById('display-info__item--change');

  if (direction === 'up') {
    fieldEditeddAt.classList.remove('sort-up');
    fieldEditeddAt.classList.add('sort-down');
  }
  if (direction === 'down') {
    fieldEditeddAt.classList.remove('sort-down');
    fieldEditeddAt.classList.add('sort-up');
  }
}

  const fieldId = document.getElementById('display-info__item--id');
  if (field === 'id' && direction === 'up') {
    if (fieldId.classList.contains('sort-up')) {
      fieldId.classList.remove('sort-up');
      fieldId.classList.add('sort-down');
    }
  }
  if (field === 'id' && direction === 'down') {
    fieldId.classList.remove('sort-down');
    fieldId.classList.add('sort-up');
  }
}

