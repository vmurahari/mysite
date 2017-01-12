/**
 * GET /
 * Home page.
 */
exports.getArticles = (req, res) => {
  res.render('write/write', {
    title: 'Digital Lawn'
  });
};
