let env = process.env.NODE_ENV || 'development';
// console.log('env *****', env);

if (env == 'development') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/socialApp';
} else if (env == 'test') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/socialAppTest';
} else {
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = 'mongodb://sazerac1:sazerac1248@ds113375.mlab.com:13375/mongo-data';
}

// console.log(process.env.MONGOLAB_URI);