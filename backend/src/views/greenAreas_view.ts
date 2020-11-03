import GreenArea from '../models/GreenArea';
import imagesView from './images_view';

export default {
  render(greenArea: GreenArea) {
    return {
      id: greenArea.id,
      name: greenArea.name,
      latitude: greenArea.latitude,
      longitude: greenArea.longitude,
      species: greenArea.species,
      description: greenArea.description,
      images: imagesView.renderMany(greenArea.images),
    };
  },
  renderMany(greenAreas: GreenArea[]) {
    return greenAreas.map((greenArea) => this.render(greenArea));
  },
};
