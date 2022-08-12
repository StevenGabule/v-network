const Conversation = require('../models/Conversation.model')
const Message = require('../models/Message.model')

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit  = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }
}

const messageCtrl = {
  createMessage: async (req, res) => {
    try {
      const { recipient, text, media } = req.body;
      if (!recipient || !(text.trim() && media.length === 0)) return;

      const newConversation = await Conversation.findOneAndUpdate({
        $or: [
          { recipients: [req.user._id, recipient] },
          { recipients: [recipient, req.user._id] },
        ]
      }, {
        recipients: [req.user._id, recipient],
        text, media
      }, { new: true, upsert: true })

      const newMessage = new Message({
        conversation: newConversation._id,
        sender: req.user._id,
        recipient,
        text,
        media
      })

      await newMessage.save();
      res.status(201).json({msg: 'Create Success!'});
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getConversations: async(req, res) => {
    try {
      const features = new APIfeatures(Conversation.find({
        recipients: req.user._id
      }), req.query).paginating()
      const conversations = await features.query.sort('updatedAt').populate('recipients', 'avatar username fullname')
      res.json({
        conversations,
        result: conversations.length
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getMessages: async(req, res) => {
    try {
      const features = new APIfeatures(Message.find({
        $or: [
          {sender: req.user._id, recipient: req.params.id},
          {sender: req.params.id, recipient: req.user._id}
        ]
      }), req.query).paginating();
      const messages = await features.query.sort('-createdAt')
      res.json({
        messages,
        result: messages.length
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  deleteMessages: async(req, res) => {
	try {
	  await Message.findOneAndDelete({_id: req.params.id, sender: req.user._id})
	  res.json({msg: 'Delete Succcess!'});
	} catch(err) {
	  return res.status(500).json({msg: err.message});  
	}
  },
  deleteConversation: async(req, res) => {
	try {
		const newConver = await Conversation.findOneAndDelete({
			$or: [
				{recipients: [req.user._id, req.params.id]},
				{recipients: [req.params.id, req.user._id]},
			]
		});
	  await Message.deleteMany({conversation: newConver._id})
	  res.json({msg: 'Delete Succcess!'});
	} catch(err) {
	  return res.status(500).json({msg: err.message});  
	}
  }
}

module.exports = messageCtrl;






