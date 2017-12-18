var http = require('http');
var mysql = require('mysql') ; // for database 
var url = require('url')
var ursa = require('ursa'); // for public private key encryption 


/*var con= mysql.createConnection({
        host: 'localhost' ,
        user : 'root',
        password : 'root',
        database : 'blood_block'
});


*/

const SHA256 = require('crypto-js/sha256') ;

/*
var NodeRSA = require('node-rsa') ;
var key = new NodeRSA({b: 512});
 
var text = 'Hello RSA!';
var encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
var decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);
*/
var set_starting_code=00000;
set_starting_code+=11;
var key = ursa.generatePrivateKey(1024, set_starting_code);




class Block{

            


			constructor(index , timestamp, location  , hospital ,  previousHash=''){
					this.index = index ;
					this.timestamp= timestamp ;

					this.location= location ;
				   // this.publicKey = this.calculatePublicKey() ;

                    //this.privateKey = this.calculatePrivateKey() ;
                    this.hospital = hospital ;

					this.previousHash=previousHash;
					this.hash= this.calculateHash() ;
					this.nonce =0 ;

                    

                    
			}

        


			calculateHash(){
				return SHA256(this.index + this.previousHash + this.timestamp+ JSON.stringify(this.location + this.hospital + this.publicKey  ) + this.nonce).toString();
			}

            calculatePublicKey(){
                var pubkeypem = key.toPublicPem();
                var publicKey = pubkeypem.toString('ascii') ; 
                return publicKey ;


            }

            calculatePrivateKey(){
                var privkeypem = key.toPrivatePem();
                var privateKey = privkeypem.toString('ascii') ;
                return privateKey ;

            }

			mineBlock(difficulty){
				while(this.hash.substring(0 , difficulty) !== Array(difficulty + 1).join("0")){
					this.nonce++;
					this.hash = this.calculateHash() ;

				}
			 console.log("Block Mined/Added !");	
			}
}

class Blockchain{
			constructor(){
				this.chain=[this.createGenesisBlock()] ;
				this.difficulty = 3;

			}

            getChainLength()
            {
                return this.chain.length ;
            }

			createGenesisBlock(){
				return new Block(0 , "01/01/2017" , "-", "-" , "-" , "-" ) ;

			}

			getLatestBlock(){
				return this.chain[this.chain.length -1] ;
			}

            getCode()
            {
                set_starting_code += 11;
                return set_starting_code  ;
            }

            getSearchBlock()
            {

            }

			addBlock(newBlock){
				newBlock.previousHash= this.getLatestBlock().hash ;
				//newBlock.hash = newBlock.calculateHash() ;
				newBlock.mineBlock(this.difficulty) ;
				this.chain.push(newBlock) ;

			}

			isChainValid(){
				for(let i=1 ; i< this.chain.length ; i++){
					const currentBlock = this.chain[i] ;
					const previousBlock = this.chain[i-1] ;
					if(currentBlock.has !== currentBlock.calculateHash()){
						return false ;
					}
					if(currentBlock.previousHash!== previousBlock.hash){
						return false ;
					}

				}
				return true ;
			}
}

let myBlockChain = new Blockchain() ;

counter = 1;
http.createServer(function (req, res) {
    
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var requrl = url.parse(req.url,true).query;
    console.log(requrl);
    var title = requrl.name;
    var location = requrl.location;
    var hospital = requrl.hospital;


      /*  var sql = "INSERT INTO block(id , timestamp,location,prev_location,donor,recipient, blood_group, prev_hash , hash) VALUES ('1', '10/10/2017', 'LAJPAT NAGAR', 'OKHLA', 'Mr. Akshay Sharma', 'Ms. Sanjini Gupta', 'B+' ,'000829183012863','0003724612926')" ;
        con.query(sql, function(err, result){
            if(err) throw err;
            console.log('Success') ;
        }) ;

        res.end("MINING BLOCKS... \n") ; 

        console.log(JSON.stringify(myBlockChain, null,3)) ; */

        //var unique_code = myBlockChain.getCode() ;

        myBlockChain.addBlock(new Block(counter++, "20/11/2017" , "Delhi" , hospital ) ) ;

        console.log("Its working ") ;
        
        console.log(JSON.stringify(myBlockChain, null,1)) ;


        res.write("Hey , I am working !!") ;
        res.end() ;

}).listen(8085, '127.0.0.1');


/*http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var requrl = url.parse(req.url,true).query;
    console.log(requrl);
    var donor = requrl.donor_name;
    var blood_group = requrl.blood_group;
    var cur_location = requrl.location;
    var str = "Donor =" + donor + " Blood Group =" + blood_group + " location =" + cur_location;
   
    var time = new Date().toISOString().replace(/T/,' ').replace(/\..+/,'') ;
    
    
    myBlockChain.addBlock(new Block(myBlockChain.chain[myBlockChain.chain.length -1].index+1, time, cur_location, '', donor, '', blood_group )) ;
    
    var myBlock = new Block(myBlockChain.chain[myBlockChain.chain.length -1].index+1 , time , cur_location,'',donor,'',blood_group,'');
    
    
    
    var sql = "INSERT INTO block(id , timestamp , location , prev_location , donor, recipient, blood_group, prev_hash , hash) VALUES ("+(myBlockChain.chain[myBlockChain.chain.length -1].index);
    sql = sql + ",'" +time+"','";
    sql = sql + cur_location + "','";
    sql = sql + "','"+ donor;
    sql = sql + "','','";
    sql = sql + blood_group + "','','";
    sql = sql + myBlock.calculateHash() + "')" ;
      res.write(sql) ;
        con.query(sql, function(err, result){
            if(err) throw err;
            console.log('Success') ;
        }) ;
    
    console.log("\n") ;
    console.log("Block Mined : ") ;
    console.log(JSON.stringify(myBlockChain, null, myBlockChain.chain[myBlockChain.chain.length])) ;
    console.log("\n") ;
    res.write(str);
    res.end();
    
}).listen(8084,'127.0.0.1')  ;*/

/*http.createServer(function(req, res){
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var requrl = url.parse(req.url,true).query;
    
    console.log(requrl);
    
    var donor = requrl.donor_name;
    var blood_group = requrl.blood_group;
    var cur_location = requrl.location;
    var str = "Donor =" + donor + " Blood Group =" + blood_group + " location =" + cur_location;
   
    var time = new Date().toISOString().replace(/T/,' ').replace(/\..+/,'') ;
    
    
    myBlockChain.addBlock(new Block(myBlockChain.chain[myBlockChain.chain.length -1].index+1, time, cur_location, '', donor, '', blood_group )) ;
    
    var myBlock = new Block(myBlockChain.chain[myBlockChain.chain.length -1].index+1 , time , cur_location,'',donor,'',blood_group,'');
    
    
    
    var sql = "INSERT INTO block(id , timestamp , location , prev_location , donor, recipient, blood_group, prev_hash , hash) VALUES ("+(myBlockChain.chain[myBlockChain.chain.length -1].index);
    sql = sql + ",'" +time+"','";
    sql = sql + cur_location + "','";
    sql = sql + "','"+ donor;
    sql = sql + "','','";
    sql = sql + blood_group + "','','";
    sql = sql + myBlock.calculateHash() + "')" ;
      res.write(sql) ;
        con.query(sql, function(err, result){
            if(err) throw err;
            console.log('Success') ;
        }) ;
    
    console.log("\n") ;
    console.log("Block Mined : ") ;
    console.log(JSON.stringify(myBlockChain, null, myBlockChain.chain[myBlockChain.chain.length])) ;
    console.log("\n") ;
    res.write(str);
    res.end();
    
}).listen(8085,'192.168.137.1')  ;*/

console.log('Server running at http://127.0.0.1:8085/');






































/*
//lets modift block 1 data

myBlockChain.chain[1].data={amount : 400} ;

// recalulate hash to make it a valid chain

myBlockChain.chain[1].hash = myBlockChain.chain[1].calculateHash() ; // still it will give false  becausr the ra;tionship with the previous  block is broken .
// this  mean that block chain are meant to add blocks to it but never delete a block or modify the block again . If we detech a block is change or something wrong has happened with the chain , it will have a mechanism to roll back the block chain to its previous state ,
// now again checking it >>
console.log("Is my chain valid ? " + myBlockChain.isChainValid()) ;

//console.log(JSON.stringify(myBlockChain, null,4)) ;

*/

//console.log(JSON.stringify(myBlockChain, null,3)) ;
