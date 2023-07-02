import { svgPhone, svgFb, svgVk, svgEmail, svgOther, svgCircle6, svgCircle5, svgCircle4, svgCircle3, svgCircle2, svgCircle1 } from "./svg.js";

export const createContactLink = (type, value, element, svg, item, dataLength, index) => {
  element = document.createElement('a');
  element.classList.add('contacts__link');
  let elementSpan = document.createElement('span');
  elementSpan.classList.add('contact-tooltip', 'site-tooltip');
  let elementPlus;

  element.innerHTML = svg;

  if (index <= 3 || index === undefined) {
    if (type === 'Email') {
      element.href = `mailto:${value.trim()}`
    } else if (type === 'Телефон') {
      element.href = `tel:${value.trim()}`
    } else {
      element.href = value.trim();
    }
    elementSpan.textContent = element.href;
    item.append(element);
    element.append(elementSpan);
  }
  if (index === 4) {
    elementPlus = document.createElement('span');
    elementPlus.id = 'plus__btn';
    if (dataLength === 5) {
      elementPlus.innerHTML = svgCircle1;
    }
    if (dataLength === 6) {
      elementPlus.innerHTML = svgCircle2;
    }
    if (dataLength === 7) {
      elementPlus.innerHTML = svgCircle3;
    }
    if (dataLength === 8) {
      elementPlus.innerHTML = svgCircle4;
    }
    if (dataLength === 9) {
      elementPlus.innerHTML = svgCircle5;
    }
    if (dataLength === 10) {
      elementPlus.innerHTML = svgCircle6;
    }

    if (elementPlus !== undefined) {
      item.append(elementPlus);
    }
  }
}

export const createContactItemByType = (type, value, item, dataLength, index) => {
  switch (type) {
    case 'Телефон':
      let phone;
      createContactLink(type, value, phone, svgPhone, item, dataLength, index);
      break;
    case 'Facebook':
      let fb;
      createContactLink(type, value, fb, svgFb, item, dataLength, index);
      break;
    case 'VK':
      let vk;
      createContactLink(type, value, vk, svgVk, item, dataLength, index);
      break;
    case 'Email':
      let email;
      createContactLink(type, value, email, svgEmail, item, dataLength, index);
      break;
    case 'Другое':
      let other;
      createContactLink(type, value, other, svgOther, item, dataLength, index);
      break;

    default:
      break;
  }
}

export const formatDate = data => {
  const newDate = new Date(data);

  const correctDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  const resultDate = newDate.toLocaleString('ru', correctDate);

  return resultDate;
}

export const formatTime = data => {
  const newDate = new Date(data);

  const correctDate = {
    hour: 'numeric',
    minute: 'numeric',
  }

  const resultTime = newDate.toLocaleString('ru', correctDate);

  return resultTime;
}
