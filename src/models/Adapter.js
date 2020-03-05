const idUtil = require('../util/id');
/*
    Model class utility 
    Hides all model based functionality api 
    Provides a general api to interact with all Model classes
 */
// eslint-disable-next-line require-jsdoc
class ModelAdapter {
  /**
   * @param {require('mongoose').Document} model - model to wrap
   */
  constructor(model) {
    this._model = model;
  }

  /**
   * Creates, stores and returns a new document in the database
   * @param {object} doc - object of data to create
   */
  async create(doc) {
    // Add Id
    const id = await idUtil.getId();
    doc.id = id;
    doc._id = id;

    return this._model.create(doc);
  }

  /**
   * Updates and returns the updated document
   * @param {{}} filter - conditions of document
   * @param {{}} doc - properties to update
   */
  async update(filter, doc) {
    return this._model.findOneAndUpdate(filter, doc, {new: true});
  }

  /**
   * Fetches and returns a document
   * @param {{}} doc - properties to match document against
   */
  async find(doc) {
    // Check if the doc only contains id
    return this._model.findOne(doc).exec();
  }

  /**
   * Fetches and paginate documents from the database
   * @param {{}} doc - properties to match to fetch the document
   * @param {{page: number, limit: number}} filter - paginate object
   */
  async getRange(doc = {}, filter = {page: 0, limit: 100}) {
    return this._model
      .find(doc)
      .skip(filter.page * filter.limit)
      .limit(filter.limit)
      .exec();
  }
}

export default ModelAdapter;
