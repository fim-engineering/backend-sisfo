'use strict';

const model = require('../models');

const dataUpdate = {
  note: '<a href="`https://res.cloudinary.com/fim-indonesia/raw/upload/v1563242868/document/SURAT_PERNYATAAN_KOMITMEN_DIRI.docx`">Format Terlampir</a>'
}

const dataDown = {
  note: null
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return model.Question.update(dataUpdate, { where: { id: 4 }})
  },

  down: (queryInterface, Sequelize) => {
    return model.Question.update(dataDown, { where: { id: 4 }})
  }
};
