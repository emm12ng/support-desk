const express = require('express')

const router = express.Router()
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket
} = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id')
router.get(protect, getTicket)
router.delete(protect, deleteTicket)
router.put(protect, updateTicket)

// re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

module.exports = router