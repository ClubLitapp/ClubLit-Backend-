import Comment from "../models/commentsmodel";



app.get('/comments/:clubId', async (req, res) => {
    try {
      const comments = await Comment.find({ clubId: req.params.clubId })
                                    .sort({ createdAt: -1 }) // Sort by the newest first
                                    .limit(5); // Retrieve only the 5 most recent comments
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/comments/:clubId', async (req, res) => {
    // Assuming the user ID is retrieved from session or token
    const userId = req.user._id; // Ensure user is authenticated and ID is available
    const { content } = req.body;
  
    if (!content) {
      return res.status(400).json({ message: "Comment content can't be empty." });
    }
  
    try {
      const newComment = new Comment({
        userId: userId,
        clubId: req.params.clubId,
        content: content
      });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  