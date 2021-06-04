
/*----------------total number of maps----------------*/
const mapNumber=1;  //1 map available


/*---------------create map--------------------*/
function createMap(){
    return Math.floor(Math.random()*(mapNumber)+1);
}


/*-----------exports---------------------*/
module.exports={createMap};