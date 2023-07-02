import { addClientModal } from "./addClient.js";
import { svgAddUser } from "./svg.js";
import { filterField } from "./filter.js";

export const createClientsSection = () => {
  const section = document.createElement('section');
  const h1 = document.createElement('h1');
  const container = document.createElement('div');
  const main = document.createElement('main');
  const sortingDisplay = document.createElement('thead');
  const theadTr = document.createElement('tr');
  const sortingDisplayId = document.createElement('td');
  const sortingDisplayName = document.createElement('td');
  const sortingDisplayCreate = document.createElement('td');
  const sortingDisplayEdit = document.createElement('td');
  const sortingDisplayContacts = document.createElement('td');
  const sortingDisplayActions = document.createElement('td');
  const sortingDisplaySpan = document.createElement('span');
  const addUserBtn = document.createElement('button');
  const addUserBtnSvg = document.createElement('span');
  const tableWrapper = document.createElement('div');
  const clientsTable = document.createElement('table');
  const tbody = document.createElement('tbody');
  const createSpan = document.createElement('span');
  const editSpan = document.createElement('span');

  section.classList.add('clients');
  tableWrapper.classList.add('clients__wrapper');
  h1.classList.add('clients__heading');
  tbody.classList.add('clients__tbody');
  tbody.id = 'clients__tbody';
  sortingDisplay.classList.add('clients__display', 'display-info');
  sortingDisplayId.classList.add('display-info__item', 'display-info__item--id', 'sort-up');
  sortingDisplayId.id = 'display-info__item--id';
  sortingDisplayName.classList.add('display-info__item', 'display-info__item--name', 'sort-up');
  sortingDisplayName.id = 'display-info__item--name';
  sortingDisplayCreate.classList.add('display-info__item', 'display-info__item--create', 'sort-up');
  sortingDisplayCreate.id = 'display-info__item--create';
  sortingDisplayEdit.classList.add('display-info__item', 'display-info__item--change', 'sort-up');
  sortingDisplayEdit.id = 'display-info__item--change';
  sortingDisplayContacts.classList.add('display-info__item', 'display-info__item--contacts');
  sortingDisplayActions.classList.add('display-info__item', 'display-info__item--actions');
  sortingDisplaySpan.classList.add('display-info__sorting');
  addUserBtn.classList.add('clients__btn', 'btn-reset');
  addUserBtnSvg.classList.add('clients__svg');
  container.classList.add('container', 'clients__container');
  clientsTable.classList.add('clients__table');
  main.classList.add('main');
  createSpan.classList.add('create__span', 'sort-up');
  createSpan.id = 'create__span';
  editSpan.classList.add('change__span', 'sort-up');
  editSpan.id = 'change__span';

  h1.textContent = 'Клиенты';
  sortingDisplayId.textContent = 'id';
  sortingDisplayName.textContent = 'Фамилия Имя Отчество';
  sortingDisplaySpan.textContent = 'а-я';
  sortingDisplayCreate.textContent = 'Дата и время';
  sortingDisplayEdit.textContent = 'Последние ';
  sortingDisplayContacts.textContent = 'Контакты ';
  sortingDisplayActions.textContent = 'Действия ';
  addUserBtn.textContent = 'Добавить клиента';
  addUserBtnSvg.innerHTML = svgAddUser;

  addUserBtn.addEventListener('click', () => {
    document.body.append(addClientModal());
  });

  sortingDisplayId.addEventListener('click', (e) => {
    if (sortingDisplayId.classList.contains('sort-up')) {
      sortingDisplayId.classList.remove('sort-up');
      sortingDisplayId.classList.add('sort-down');
      filterField("id", "up");
    }
    else {
      sortingDisplayId.classList.remove('sort-down');
      sortingDisplayId.classList.add('sort-up');
      filterField("id", "down");
    }
  });

  createSpan.addEventListener('click', (e) => {
    if (createSpan.classList.contains('sort-up')) {
      createSpan.classList.remove('sort-up');
      createSpan.classList.add('sort-down');
      filterField("createdAt", "up");
    }
    else {
      createSpan.classList.remove('sort-down');
      createSpan.classList.add('sort-up');
      filterField("createdAt", "down");
    }
  });

  editSpan.addEventListener('click', (e) => {
    if (editSpan.classList.contains('sort-up')) {
      editSpan.classList.remove('sort-up');
      editSpan.classList.add('sort-down');
      filterField("updatedAt", "up");
    }
    else {
      editSpan.classList.remove('sort-down');
      editSpan.classList.add('sort-up');
      filterField("updatedAt", "down");
    }
  });

  sortingDisplayName.addEventListener('click', (e) => {
    if (sortingDisplayName.classList.contains('sort-up')) {
      sortingDisplayName.classList.remove('sort-up');
      sortingDisplayName.classList.add('sort-down');
      filterField("surname", "up");

    }
    else {
      sortingDisplayName.classList.remove('sort-down');
      sortingDisplayName.classList.add('sort-up');
      filterField("surname", "down");
    }
  });

  main.append(section);
  section.append(container);
  sortingDisplayName.appendChild(sortingDisplaySpan);
  sortingDisplayCreate.append(createSpan);
  sortingDisplayEdit.append(editSpan);
  theadTr.append(
    sortingDisplayId,
    sortingDisplayName,
    sortingDisplayCreate,
    sortingDisplayEdit,
    sortingDisplayContacts,
    sortingDisplayActions
  );
  sortingDisplay.append(theadTr);
  tableWrapper.append(clientsTable);
  clientsTable.append(sortingDisplay, tbody);
  addUserBtn.append(addUserBtnSvg);
  container.append(h1, tableWrapper, addUserBtn);

  return {
    main,
    clientsTable,
    tbody
  }
}
