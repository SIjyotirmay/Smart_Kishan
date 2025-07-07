const Scheme = require("../db/schemedb");

module.exports = {
  async addScheme(req, res) {
    try {
      const { title, description, applyLink } = req.body;
      let imageFileName = "";

      if (req.files && req.files.image) {
        const image = req.files.image;
        imageFileName = Date.now() + "_" + image.name;

        // Save image in uploads folder
        await image.mv("uploads/" + imageFileName);
      }

      const scheme = new Scheme({
        title,
        description,
        applyLink,
        image: imageFileName,
      });

      await scheme.save();
      res.json({ msg: "Scheme added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error adding scheme", error: err.message });
    }
  },

  async getSchemes(req, res) {
    try {
      const schemes = await Scheme.find().sort({ createdAt: -1 });
      res.json(schemes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error fetching schemes" });
    }
  },
  async delscheme(req, res) {
    try {
      await Scheme.findByIdAndDelete(req.body.id);
      res.json({ msg: "Scheme deleted" });
    } catch (err) {
      res.status(500).json({ msg: "Error deleting scheme" });
    }
  },

  /* ───── Fetch Single Scheme (for edit page) ───── */
  async editscheme(req, res) {
    try {
      const data = await Scheme.findById(req.body.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching scheme" });
    }
  },

  /* ───── Update Scheme ───── */
  async updscheme(req, res) {
    try {
      const { id } = req.body;
      let updateObj = {
        title: req.body.title,
        description: req.body.description,
        applyLink: req.body.applyLink,
      };

      /* If a new image is uploaded, save it and update field */
      if (req.files && req.files.image) {
        const img = req.files.image;
        const imgName = Date.now() + "_" + img.name;
        await img.mv("./uploads/" + imgName);
        updateObj.image = imgName;
      }

      await Scheme.findByIdAndUpdate(id, updateObj);
      res.json({ msg: "Scheme updated" });
    } catch (err) {
      res.status(500).json({ msg: "Error updating scheme", error: err.message });
    }
  },
}; 