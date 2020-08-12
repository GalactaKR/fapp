// posts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'posts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    title: {type: String},
    image: {type: String},
    text: {type: String, required: true},
    user: {type: String, required: true},
    location: {type: String},
    tags:{type: [String]},
    publishDate:{type: Date},
    views: {type: Number, required: true, default: 0},
    isPublished: {type: Boolean, required: true},
    isPinned: {type:Boolean, required: true, defalut: false}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
