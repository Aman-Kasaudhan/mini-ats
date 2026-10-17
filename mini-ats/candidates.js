const router = require("express").Router();
const Candidate = require("./Candidate");

const FIELDS = ["name", "email", "phone", "role", "source", "stage", "notes"];
const pick = (b) => Object.fromEntries(FIELDS.filter((k) => b[k] !== undefined).map((k) => [k, b[k]]));

// List + search + filter: GET /api/candidates?q=text&stage=Interview&role=Designer
router.get("/", async (req, res, next) => {
  try {
    const { q, stage, role } = req.query;
    const filter = {};
    if (stage) filter.stage = stage;
    if (role) filter.role = role;
    if (q) {
      const rx = new RegExp(String(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = ["name", "email", "role", "source", "notes"].map((k) => ({ [k]: rx }));
    }
    res.json(await Candidate.find(filter).sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const c = await Candidate.findById(req.params.id);
    if (!c) return res.status(404).json({ error: "Candidate not found" });
    res.json(c);
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const data = pick(req.body);
    const c = await Candidate.create({ ...data, history: [{ stage: data.stage || "Applied" }] });
    res.status(201).json(c);
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const c = await Candidate.findById(req.params.id);
    if (!c) return res.status(404).json({ error: "Candidate not found" });
    const data = pick(req.body);
    if (data.stage && data.stage !== c.stage) c.history.push({ stage: data.stage });
    c.set(data);
    await c.save();
    res.json(c);
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const c = await Candidate.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ error: "Candidate not found" });
    res.status(204).end();
  } catch (e) { next(e); }
});

module.exports = router;
