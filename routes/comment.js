const { Router } = require("express");
const Comment = require("../models/comment");
const router = Router();

router.post("/:blogId", async (req, res) => {
  
  if (!req.body.content) {
    return res.status(400).send("Comment content is required");
  }

  const createdComment = await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  console.log("Comment created:", createdComment);
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;