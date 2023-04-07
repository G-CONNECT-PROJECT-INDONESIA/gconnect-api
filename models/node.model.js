const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  installedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Node = mongoose.model('Node', NodeSchema);

module.exports = Node;