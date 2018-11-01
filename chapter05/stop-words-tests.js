var removeStopWords = require('./remove-stop-words')({bannedWords: ["kitten", "parrot"]});

var chai = require('chai');
const chaiHttp = require('chai-http');
var assert = chai.assert;
chai.use(chaiHttp);
chai.should();
var expect = chai.expect;



describe('When executing "removeStopWords"', function() {
    
    it('should remove words with less than 3 chars of length', function() {
        removeStopWords('my small list of words', function(err, response) {
            expect(response).to.equal("small list words");
            console.log(response);
        });
    });
    
    it('should remove extra white spaces', function() {
        removeStopWords('my small       list of words', function(err, response) {
            expect(response).to.equal("small list words");
            console.log(response);
        });
    });
    
    it('should remove banned words', function() {
        removeStopWords('My kitten is sleeping', function(err, response) {
            expect(response).to.equal("sleeping");
            console.log(response);
        });
    });
    
    it('should not fail with null as input', function() {
        removeStopWords(null, function(err, response) {
            expect(response).to.equal("small list words");
            console.log(response);
        });
    });
    
    it('should fail if the input is not a string', function() {
        try {
            removeStopWords(5, function(err, response) {});
            assert.fail();
        }
        catch(err) {
        }
    });

    it("should return 'ccccc'", (done) => {
       chai.request('http://localhost:4000')
        .get('/filter')
        .query({text: 'aa bb ccccc'}).end((req,res) => {
           expect(res.text).to.equal('ccccc');
           done();
        })
    });
});
