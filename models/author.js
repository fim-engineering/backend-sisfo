
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING,
    front_degree: DataTypes.STRING,
    back_degree: DataTypes.STRING,
    place_of_birth: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    no_ktp: DataTypes.INTEGER,
    address: DataTypes.STRING,
    occupation: DataTypes.TEXT,
    curriculum_vitae_link: DataTypes.STRING,
    email: DataTypes.STRING,
    email2: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone2: DataTypes.STRING,
    fax: DataTypes.STRING,
    photo: DataTypes.STRING,
    institution: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    bank_branch: DataTypes.STRING,
    no_rek: DataTypes.STRING,
    an_no_rek: DataTypes.STRING,
    npwp: DataTypes.STRING,
    aw_name: DataTypes.STRING,
    aw_date_of_birth: DataTypes.DATE,
    aw_place_of_birth: DataTypes.STRING,
    aw_address: DataTypes.STRING,
    aw_phone: DataTypes.STRING,
    aw_ktp: DataTypes.INTEGER,
    aw_email: DataTypes.STRING,
    aw_bank: DataTypes.STRING,
    aw_bank_branch: DataTypes.STRING,
    aw_no_rek: DataTypes.STRING,
    aw_an_no_rek: DataTypes.STRING,
    aw_npwp: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    identifier_name: DataTypes.STRING
  }, {});
  Author.associate = function(models) {
    models.Author.belongsToMany(models.Product,{through:models.ProductAuthors,foreignKey:'AuthorId'})
    // associations can be defined here
    // Author.belongsToMany(models.Product, {      
    //   trough: 'ProductAuthors'
    // });
  };
  
  
  return Author;
};
