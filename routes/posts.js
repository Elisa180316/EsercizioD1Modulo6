const express = require('express');
const router = express.Router();
const PostsModel = require('../models/posts');

// Get posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await PostsModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// Creare nuovo post
router.post('/posts/new', async (req, res) => {
  const newPost = new PostsModel({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    rate: req.body.rate
  });
  try {
    const post = await newPost.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// Aggiornare post
router.patch('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const postExist = await PostsModel.findById(id);

  if (!postExist) {
    return res.status(404).send({
      message: 'Post inesistente'
    });
  }

  try {
    const postId = id;
    const dataUpdated = req.body;
    const options = { new: true };
    const result = await PostsModel.findByIdAndUpdate(postId, dataUpdated, options);
    res.status(200).send({
      message: 'Post aggiornato con successo',
      payload: result
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// Cancellare post
router.delete('/posts/delete/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const post = await PostsModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send({
        message: 'Attenzione, nessun post con questo id'
      });
    }

    res.status(200).send({
      message: `Post con id ${id} cancellato correttamente dal database`
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

module.exports = router;

