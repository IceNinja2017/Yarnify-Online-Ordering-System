export const me = async (req, res) => {
    res.status(200).json({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            address: req.user.address,
            role: req.user.role,
            isVerified: req.user.isVerified,
            orderHistory: req.user.orderHistory
        })
};

export const validateToken = (req, res) => {
    res.status(200).json({ valid: true, role: req.user.role });
};