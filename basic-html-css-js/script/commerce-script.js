document.addEventListener('DOMContentLoaded', function () {
  // mainImage is the highlighted image in a product description page
  // smallerImages comprise of the images below of similar products that are clickable
  const mainImage = document.getElementById('primary-image');
  const smallerImages = document.getElementsByClassName('small-image');
  for (const image of smallerImages) {
    // add an event listener and when the image is clicked, let it be the image in the primary-image section
    image.addEventListener('click', () => {
      mainImage.src = image.querySelector('img').src;
    });
  }
});
