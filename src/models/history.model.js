// History-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'history';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: { type: String},
    gender: { type: String},
    birth: { type: Date},
    death: { type: Date},
    hometown: {type: Date},
    camp: { type: String},
    identity: { type: String},
    // parents: { type: [String]},
    father: { type: String},
    mother: { type: String},
    children: { type: [String]},
    involvedBattles: { type: Boolean},
    tags: { type: [String]},
    biography: { type: String }

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
