var mongoose = require('mongoose');

const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_birth')
.get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema
.virtual('date_death')
.get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema
.virtual('date_birth_proper')
.get(function() {
  if (typeof this.date_of_birth === 'undefined'){
    return 
  }
  else {
    const newDate = this.date_of_birth.toISOString().split('T')[0];
    return newDate;
  }
  
})

AuthorSchema
.virtual('date_death_proper')
.get(function() {
  if (typeof this.date_of_death === 'undefined'){
    return 
  }
  else {
  const newDate = this.date_of_death.toISOString().split('T')[0];
  return newDate;
  }
})


//Export model
module.exports = mongoose.model('Author', AuthorSchema);