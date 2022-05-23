import { Request, Response } from "express";
import { Car } from "../entities/Car";
import { Client } from "../entities/Client";
import { validate } from "class-validator";

export const createCar = async (req: Request, res: Response) => {
  try {
    const { code, brand, color, price, registration, codeClient } = req.body;
    const car = new Car();
    car.code = code;
    car.brand = brand;
    car.color = color;
    car.price = price;
    car.registration = registration;

    const errors = await validate(car);
    if (errors.length > 0 || typeof codeClient !== "number") {
      throw new Error(`Some fields have an error`);
    }

    const client = await Client.findOneBy({ code: codeClient });

    if (!client) {
      throw new Error(`There's no client for ${codeClient}`);
    }
    car.client = client;

    await car.save();
    return res.json(car);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    if (!cars) {
      return res.status(404);
    }
    return res.status(200).json(cars);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await Car.findOneBy({ code: id });
    if (!car) return res.status(404).json({ message: "Car not found" });

    return res.status(200).json(car);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const car = await Car.findOneBy({ code: id });
    if (!car) return res.status(404).json({ message: "Not Car found" });

    await Car.update({ code: id }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Car.delete({ code: id });

    if (result.affected === 0)
      return res.status(404).json({ message: "Car not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
