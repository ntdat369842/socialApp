let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://a1248:aa1248@ds113375.mlab.com:13375/mongo-data', { useNewUrlParser: true });

module.exports = {
    mongoose
}