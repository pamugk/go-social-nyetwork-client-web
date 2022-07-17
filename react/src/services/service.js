function postData(url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function createUser(userData) {
    return postData('/api/user', userData);
}

export function searchUsers(query, page, limit) {
  var params = new URLSearchParams();
  if (query && query !== '') {
    params.append('loginPart', query);
  }
  if (page && page !== 0) {
    params.append('page', page);
  }
  if (limit && limit !== 0) {
    params.append('limit', limit);
  }
  return fetch('/api/user' + (params.keys().length === 0 ? '' : '?' + params));
}

export function getUser(id) {
  return fetch('/api/user/' + id);
}
