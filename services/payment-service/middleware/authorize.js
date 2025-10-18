import jwt from "jsonwebtoken";

// Middleware to check if a user is logged in via JWT token
export const authenticate = async (req, res, next) => {
    // 1. Get token from the 'Authorization' header (format: "Bearer TOKEN")
    const token = req.headers.authorization?.replace("Bearer ", "");

    // 2. If no token, deny access
    if (!token) {
        return res.status(401).json({ message: "Authorization denied. No token provided." });
    }

    try {
        // 3. Verify the token using the secret key (MUST match auth-service's secret)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach decoded user info (id, email, role) to the request object
        // This makes req.user.id, req.user.email, req.user.role available in controllers
        req.user = decoded;
        next(); // Token is valid, proceed to the next function (controller)
    } catch (err) {
        // 5. If token is invalid or expired, deny access
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Invalid token." });
    }
};

// Middleware to check if the authenticated user is an admin
export const isAdmin = (req, res, next) => {
    // This middleware MUST run *after* the 'authenticate' middleware
    if (req.user && req.user.role === 'admin') {
        next(); // User has admin role, proceed
    } else {
        // User is not an admin or user info is missing
        res.status(403).json({ message: "Forbidden: Admin access required." });
    }
};