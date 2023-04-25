let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app");

chai.should()

chai.use(chaiHttp);

describe('Get Home Page API', () => {

    describe("GET request", () => {

        it("This should get all the categories that exist", (done)=> {

            chai.request(server).get("/").end((err, response) => {

                response.should.have.status(200);
                done();
            })
        })
    })
})
let success = 500;

describe('Feed Page API', () => {

    // describe("POST request", () => {

    //     it("This is a post request for the category that the user wants to view", (done)=> {

    //         chai.request(server).post("/feed").send({category: "Books"}).end((err, response) => {

    //             response.should.have.status(success);
    //             done();
    //         })
    //     })
    // })

    describe("GET request", () => {

        it("Returns all the posts based on the category selected by user:", (done)=> {

            chai.request(server).get("/feed").end((err, response) => {

                response.should.have.status(200);
                done();
            })
        })
    })
})

