import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { validate } from "class-validator";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findOneBy({ code: parseInt(id) });

    if (!client) return res.status(404).json({ message: "Client not found" });

    return res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, location, city, cellphone, NIF } = req.body;

    const client = new Client();
    client.name = name;
    client.location = location;
    client.city = city;
    client.cellphone = cellphone;
    client.NIF = NIF;

    const errors = await validate(client);
    if (errors.length > 0) {
      throw new Error(`Some fields have an error`);
    }
    await client.save();

    return res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // prove whether a client exists or not
    const client = await Client.findOneBy({ code: parseInt(id) });
    if (!client) return res.status(404).json({ message: "Client not found" });

    await Client.update({ code: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await Client.delete({ code: parseInt(id) });
  
      if (result.affected === 0)
        return res.status(404).json({ message: "Client not found" });
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
