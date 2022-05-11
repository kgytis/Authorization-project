const logoutUser = async (req, res) => {
    return res.clearCookie('accessToken').status(200).send({ msg: "You have been logged out successfully." })
};

export default logoutUser