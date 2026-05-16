// Set up an autocomplete dropdown for the given input field
function initAutocomplete(inputId, listId, dataArray, onSelect, freeEntry) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  if (!input || !list) return;

  // Render the filtered suggestions into the dropdown list
  function renderSuggestions(matches) {
    list.innerHTML = '';
    if (matches.length === 0) {
      list.style.display = 'none';
      return;
    }
    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'autocomplete-list__item';
      if (incidentTypeIcons[item]) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'autocomplete-list__item-icon';
        iconSpan.innerHTML = incidentTypeIcons[item];
        div.appendChild(iconSpan);
      }
      const textSpan = document.createElement('span');
      textSpan.textContent = item;
      div.appendChild(textSpan);
      div.addEventListener('mousedown', (e) => {
        e.preventDefault();
        input.value = item;
        list.style.display = 'none';
        if (onSelect) onSelect(item);
      });
      list.appendChild(div);
    });
    list.style.display = 'block';
  }

  input.addEventListener('input', () => {
    const val = input.value.toLowerCase().trim();
    if (!val) {
      renderSuggestions(dataArray);
      if (onSelect) onSelect('all');
      return;
    }
    const matches = dataArray.filter(loc => loc.toLowerCase().includes(val));
    renderSuggestions(matches);
    if (freeEntry && onSelect) {
      onSelect(input.value.trim());
    }
  });

  input.addEventListener('focus', () => {
    const val = input.value.toLowerCase().trim();
    if (!val) {
      renderSuggestions(dataArray);
    } else {
      const matches = dataArray.filter(loc => loc.toLowerCase().includes(val));
      renderSuggestions(matches);
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      list.style.display = 'none';
    }, 150);
  });

  input.addEventListener('keydown', (e) => {
    const items = list.querySelectorAll('.autocomplete-list__item');
    if (items.length === 0) return;
    const highlighted = list.querySelector('.autocomplete-list__item--highlighted');
    let index = highlighted ? Array.from(items).indexOf(highlighted) : -1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (highlighted) highlighted.classList.remove('autocomplete-list__item--highlighted');
      index = (index + 1) % items.length;
      items[index].classList.add('autocomplete-list__item--highlighted');
      items[index].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (highlighted) highlighted.classList.remove('autocomplete-list__item--highlighted');
      index = index <= 0 ? items.length - 1 : index - 1;
      items[index].classList.add('autocomplete-list__item--highlighted');
      items[index].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlighted) {
        input.value = highlighted.textContent;
        list.style.display = 'none';
        if (onSelect) onSelect(highlighted.textContent);
      }
    } else if (e.key === 'Escape') {
      list.style.display = 'none';
    }
  });
}