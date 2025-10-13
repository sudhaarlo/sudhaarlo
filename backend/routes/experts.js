import express from 'express';
const router = express.Router();

// placeholder expert routes
router.get('/', (req, res) => {
  res.json({ ok: true, experts: [] });
});

router.get('/:id/history', (req, res) => {
  res.json({ ok: true, expertId: req.params.id, jobs: [] });
});

export default router;