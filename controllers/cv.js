/**
 * GET /
 * Projects list.
 */
exports.getCV = (req, res) => {
  res.render('cv/resume', {
    title: 'Work'
  });
};
