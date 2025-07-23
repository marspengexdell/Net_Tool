import express from 'express';
import {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
  submitToForm,
} from '../controllers/forms.controller.js';

const router = express.Router();

router.route('/')
  .get(getAllForms)
  .post(createForm);

router.route('/:id')
  .get(getFormById)
  .put(updateForm)
  .delete(deleteForm);

router.route('/:id/submit')
  .post(submitToForm);

export default router;
