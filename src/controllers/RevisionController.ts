import { Request, Response } from "express";
import {Car} from "../entities/Car";
import { Revision } from "../entities/Revision";
import { validate } from "class-validator";

export const createRevision = async (req: Request, res: Response) => {
  try {
    const { filterChange, oilChange, carCode} = req.body;
    const revision = new Revision();
    revision.filterChange = filterChange;
    revision.oilChange = oilChange;

    const errors = await validate(revision);
    if (errors.length > 0 || typeof carCode !== "string") {
      throw new Error(`Some fields have an error`);
    }

    const car = await Car.findOneBy({ code: carCode });

    if (!car) {
      throw new Error(`There's no car for this code`);
    }
    revision.car = car;

    await revision.save();
    return res.status(200).json(revision);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const getRevisions = async (req: Request, res: Response) => {
  try {
    const revisions = await Revision.find();
    if (!revisions) {
      return res.status(404);
    }
    return res.status(200).json(revisions);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getRevision = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const revision = await Revision.findOneBy({ code: parseInt(id) });
    if (!revision) return res.status(404).json({ message: "Car not found" });

    return res.status(200).json(revision);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateRevision = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const revision = await Revision.findOneBy({ code: parseInt(id) });
    if (!revision) return res.status(404).json({ message: "Revision not found" });

    await Revision.update({ code: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteRevision = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Revision.delete({ code: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Car not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
