import {photographersTemplate} from "../templates/photographersTemplate.js";

export const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");
  const fragment = document.createDocumentFragment();

  photographers.forEach((photographer) => {
    const photographerModel = photographersTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    fragment.appendChild(userCardDOM);
  });

  photographersSection.appendChild(fragment);
};
