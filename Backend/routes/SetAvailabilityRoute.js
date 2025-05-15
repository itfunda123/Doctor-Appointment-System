// POST/UPDATE availability
router.post('/availability/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  const updates = req.body;
  try {
    const updated = await Availability.findOneAndUpdate(
      { doctorId },
      { doctorId, schedule: updates },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save availability' });
  }
});

// GET availability
router.get('/availability/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  try {
    const availability = await Availability.findOne({ doctorId });
    res.json(availability?.schedule || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});
