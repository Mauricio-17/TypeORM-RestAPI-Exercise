import {Router} from 'express';
import {createCar, 
getCar, 
getCars, 
updateCar,
deleteCar} 
from "../controllers/CarController";

const router = Router();

router.get('/', getCars);
router.get('/:id', getCar);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;