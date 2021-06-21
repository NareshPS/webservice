const {Subject} = require('rxjs')

const start = app => {
  expressUnit(
    app,
    {
      route: '/datasets/:name/:start/:end',
      method: 'get'
    }
  )
  .subscribe(({req, res}) => {
    console.info(req.url)
    res.json({message: 'no dataset available'})
  })
}

const expressUnit = (app, {route, method}) => {
  const s = new Subject()

  app[method](route, (req, res) => {
    s.next({req, res})
  })

  return s
}


module.exports = {start}
