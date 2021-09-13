export function fetchPhotos(searchName) {
  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No result with name ${searchName}`));
  });
}
