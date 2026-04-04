import { Router } from "express";


import { authMiddleware as authenticateToken, authorize as requireRole } from '../middleware/auth.js';
import customerAuthRoutes from './customerAuth.routes.js';
import adminAuthRoutes from './adminAuth.routes.js';

const router = Router();

router.use('/auth/customer', customerAuthRoutes);
router.use('/auth/admin', adminAuthRoutes);


// FCM Token Update (auth ke baad)
router.post('/update-fcm-token', authenticateToken, async (req, res) => {
  try {
    const { fcmToken } = req.body;

    if (!fcmToken) {
      return res.status(400).json({
        success: false,
        message: 'FCM token required'
      });
    }

    // await User.findByIdAndUpdate(req.user._id, { fcmToken });

    // console.log('✅ FCM token updated for user:', req.user._id);

    res.json({
      success: true,
      message: 'FCM token updated successfully'
    });

  } catch (error) {
    console.error('❌ FCM token update error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


router.get('/', (req, res) => {
  res.send('Hello World');
});
router.get('/test', (req, res) => {
  res.send({
    message: "Platform detection working!",
    platform: "kaj-now",
  });
});




export default router;