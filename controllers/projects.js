/**
 * GET /
 * Projects list.
 */
exports.getProjects = (req, res) => {
  res.render('projects/projectlist', {
    title: 'Work'
  });
};
