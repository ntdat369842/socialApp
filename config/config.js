let env = process.env.NODE_ENV || 'development';
// console.log('env *****', env);

if (env == 'development') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/socialApp';
} else if (env == 'test') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/socialAppTest';
}

// console.log(process.env.MONGOLAB_URI);