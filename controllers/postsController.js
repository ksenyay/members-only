const post_create = (req, res) => {
  console.log("Incoming post content:", req.body);

  // Return success status
  res.sendStatus(200);
};

module.exports = { post_create };
