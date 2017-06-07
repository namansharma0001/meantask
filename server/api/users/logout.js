module.exports = (req, res) => {
    req.logout()
    var response = {
        status: 'Success',
        message: 'Logged out'
    }
    res.json(response)
}