let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

const Song = require('../models').Song;

const { expect } = chai

chai.use(chaiHttp)

describe('Song' , () =>{

    describe('Song Array',() =>{
        it('should return an array of all the worship',(done)=>{
            chai.request(server).get('/song')
            .then(songsArray => {

                expect(songsArray).to.be.a('array');  

            })
            done();
        } )
    })

    describe('Create song', () => {
        it('it should POST a song', (done) => {

            let song = Song.create({ title:"hjkvhvj"})
            song.then(song => {
                chai.request(server)
                .get('/book/single?songID=' + song.id)
                .send(song)
                .end((err, res) => {
                      expect(song).to.be.a('object');
                      expect(song).to.have.property('title');
                      expect(song).to.have.property('id');
                      expect(song).to.have.property('createdAt');
                      expect(song).to.have.property('updatedAt');             
                });
            });

            done();

        });
    });

})

