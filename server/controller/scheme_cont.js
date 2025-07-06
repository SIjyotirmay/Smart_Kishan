const Scheme = require("../db/schemedb");

module.exports = {
  async addScheme(req, res) {
    try {
      const { title, description } = req.body;
      const scheme = new Scheme({ title, description });
      await scheme.save();
      res.json({ msg: "Scheme added" });
    } catch (err) {
      res.status(500).json({ msg: "Error adding scheme" });
    }
  },

  async getSchemes(req, res) {
    try {
      const schemes = await Scheme.find().sort({ createdAt: -1 });
      res.json(schemes);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching schemes" });
    }
  },
};
