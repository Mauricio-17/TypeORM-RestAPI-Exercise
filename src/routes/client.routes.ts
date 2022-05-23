import {Router} from 'express';
import {createClient,
getClient,
getClients,
updateClient,
deleteClient}
from "../controllers/ClientController";

const router = Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;