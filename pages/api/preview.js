export default function handler( req, res ) {
  if( req.query.disable ) {
    res.clearPreviewData()
    res.end( 'Preview disabled' )
    return
  }

  // res.setPreviewData( { hello: "World" }, { maxAge: 600 } )

  if( req.query.slug )
    res.redirect( req.query.slug )
  else
    res.end( 'Preview enabled' )
}
