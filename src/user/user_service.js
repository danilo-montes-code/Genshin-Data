const addGoogleUser = (User) => ({ id, firstName, lastName, profilePhoto }) => {
    const user = new User({
        id, firstName, lastName, profilePhoto, source: "google"
    })
    return user.save();
}
  
const getUsers = (User) => () => {
    return User.find({});
}

const getUserById = (User) => async ({ id }) => {
    return await User.findOne({ id });
}

module.exports = (User) => {
    return {
        addGoogleUser  : addGoogleUser(User),
        getUsers       : getUsers(User),
        getUserById    : getUserById(User)
    }
}