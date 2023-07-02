export const getClients = async () => {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'GET'
  });

  const result = await response.json();
  return result;
}

export const getClientsBySearch = async (text) => {
  const response = await fetch(`http://localhost:3000/api/clients?search=${text}`, {
    method: 'GET'
  });

  const result = await response.json();
  return result;
}


export const createClient = async (client) => {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify(client)
  });

  return await response.json();
}

export const editClientItem = async (id, data) => {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  const result = await response.json();
}

export const deleteClientItem = async (id) => {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });
}
