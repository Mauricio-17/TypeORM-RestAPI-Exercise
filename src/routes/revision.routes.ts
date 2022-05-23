import {Router} from "express";
import {getRevision,
getRevisions,
createRevision,
updateRevision,
deleteRevision} 
from "../controllers/RevisionController";

const router = Router();

router.get('/', getRevisions);
router.get('/:id', getRevision);
router.post('/', createRevision);
router.put('/:id', updateRevision);
router.delete('/:id', deleteRevision);

export default router;
