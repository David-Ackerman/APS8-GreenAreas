import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import greenAreaView from '../views/greenAreas_view';
import GreenArea from '../models/GreenArea';
import * as Yup from 'yup';

export default {
  async index(request: Request, response: Response) {
    const greenAreasRepository = getRepository(GreenArea);
    const greenAreas = await greenAreasRepository.find({
      relations: ['images'],
    });

    return response.json(greenAreaView.renderMany(greenAreas));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const greenAreasRepository = getRepository(GreenArea);
    const greenArea = await greenAreasRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(greenAreaView.render(greenArea));
  },

  async create(request: Request, response: Response) {
    const { name, latitude, longitude, species, description } = request.body;

    const greenAreasRepository = getRepository(GreenArea);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      species,
      description,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      species: Yup.string().max(300),
      description: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const greenArea = greenAreasRepository.create(data);

    await greenAreasRepository.save(greenArea);

    return response.status(201).json(greenAreaView.render(greenArea));
  },
};
