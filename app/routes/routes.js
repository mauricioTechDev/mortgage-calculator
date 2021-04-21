
module.exports = function(app, passport, db){
  app.get('/', (request, response) => {
    try{
      response.render('index.ejs');
    } catch (error){
      console.error(error);
    }
  })

  app.get('/loginPage', (request, response) => {
    try{
      response.render('login.ejs');
    } catch (error){
      console.error(error);
    }
  })

  app.get('/signupPage', (request, response) => {
    try{
      response.render('signup.ejs');
    } catch (error){
      console.error(error);
    }
  })

  app.get('/profile', isLoggedIn,  (request, response) => {
      const userId = request.user._id;
      db.collection('homeInfo').find({userId: new mongo.ObjectId(userId)}).toArray()
          .then(data => {
              // rendering data from data base to ejs
              response.render('profile.ejs', { info: data })
          })
          .catch(error => console.error(error))
  })

  app.put('/markAsAGoodDeal', (request, response) => {
    const documentId = request.body.id
      db.collection('homeInfo').updateOne({ _id: new mongo.ObjectId(documentId) }, {
          $set: {
              goodDeal: 'YES'
          }
      }, {
          sort: { _id: -1 },
          upsert: false
      })
          .then(result => {
              response.json('Marked as a goodDeal');
          })
          .catch(error => console.error(error));
  })

  app.put('/markAsABadDeal', (request, response) => {
    const documentId = request.body.id
      db.collection('homeInfo').updateOne({ _id: new mongo.ObjectId(documentId) }, {
          $set: {
              goodDeal: 'NO'
          }
      }, {
          sort: { _id: -1 },
          upsert: false
      })
      .then(result => {
              response.json('Marked as a goodDeal');
      })
      .catch(error => console.error(error));
  })

  // listening to delete rapper
  app.delete('/deleteMortgageCalculation', (request, response) => {
      const documentId = request.body.id
      db.collection('homeInfo').deleteOne({ _id: new mongo.ObjectId(documentId) })
          .then(result => {
              console.log('Home Calculation Deleted')
              response.json('Home Calculation Deleted')
          })
          .catch(error => console.error(error))
      response.redirect('/')
  })

  // CALCULATOR EQUATION
  app.post('/postMortgageCalculation', (request, response) => {
    const userId = request.user._id;
    const p = +request.body.loanAmount; //principle / initial amount borrowed
    const i = +request.body.interestRate / 100 / 12; //monthly interest rate
    const n = +request.body.years * 12; //number of payments months
    console.log({p, i, n})
    //monthly mortgage payment
    const m = Math.round(p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
      db.collection('homeInfo').insertOne({
        ...request.body,
        total: m,
        goodDeal: 'null',
        userId: userId
      })
          .then(result => {
              console.log('Morgate Calculated')
              response.redirect('/profile')
          })
          .catch(error => console.error(error))
  })
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
