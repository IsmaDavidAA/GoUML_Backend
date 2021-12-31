let MongoClient = require("mongodb").MongoClient;

let {connectionString, dbName} = require("./dbConfig");

async function testConection(){
    try{
        let connection = await MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnitfiedTopology: true
        });
        let db = connection.db(dbName);
        let numCollections = (await db.collections()).length;
        return numCollections>0;
    } catch (ex){
        return false;
    } 
}

module.exports.testConection = testConection;