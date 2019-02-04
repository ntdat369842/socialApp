let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

module.exports = {
    mongoose
}